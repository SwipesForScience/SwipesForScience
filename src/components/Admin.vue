<template>
  <div id="admin">
    <h1> Admin </h1>

    <b-container>

      <p class="lead" v-if="status=='complete'">You have {{sampleCounts.length}} items currently</p>
      <p v-if="manifestType === 'json'">
        <b>Data Source:</b>
        <a :href="config.manifestUrl">{{config.manifestUrl}}</a>
      </p>

      <p v-else-if="manifestType === 'pubmed'">
        <b>Pubmed Query:</b>
        {{config.manifestQuery}}
      </p>

      <p v-else-if="manifestType === 'github'">
        <b>Github User:</b>
        {{config.manifestGitHub.user}}
        <br>
        <b>Github Repo:</b>
        {{config.manifestGitHub.repo}}
        <br>
        <b>Github Path:</b>
        {{config.manifestGitHub.path}}
        <br>
      </p>

      <p v-else-if="manifestType === 'S3'">
        <b>S3 bucket:</b>
        {{config.manifestS3.bucket}}
        <br>
        <b>prefix:</b>
        {{config.manifestS3.prefix}}
        <br>
        <b>delimiter:</b>
        {{config.manifestS3.delimiter}}
        <br>
      </p>


      <b-button variant="warning" @click="previewManifest">
        <span> Preview </span>
      </b-button>
      <div v-if="manifestEntries.length" class="mt-3 pt-3">
        <small v-if="manifestType === 'json'">
          Here are a few items in your manifest file. There are {{manifestEntries.length}} items in total
        </small>
        <small v-else-if="manifestType === 'pubmed'">
          Here are a few pubmed IDs from your search. There are {{pubmedQueryStore.count}} items in total.
        </small>
        <small v-if="manifestType === 'github'">
          Here are a few items in your manifest file. There are {{manifestEntries.length}} items in total
        </small>
        <small v-if="manifestType === 'S3'">
          Here are a few items in your manifest file. There are {{manifestEntries.length}} items in total
        </small>
        <textarea class="mt-3 mb-3 ml-3 mr-3 w-100"
         :value="manifestEntries.slice(0,100) + '...'"
         disabled rows="5">
        </textarea>
      </div>

      <p class="mt-3 pt-3"
       v-if="status=='complete'">Click the button below to sync your firebase database with your manifest.</p>

      <div class="mb-3 pb-3">
        <b-button v-if="status=='complete'" @click="refreshSamples">
          <span> Refresh Sample List </span>
        </b-button>
        <div v-else>
          <p>{{status}} {{progress}} / {{manifestEntries.length}}</p>
          <b-progress :value="progress" :max="manifestEntries.length" variant="info" striped class="mb-2"></b-progress>
        </div>
      </div>


    </b-container>

  </div>

</template>

<style>

</style>

<script>
import axios from 'axios';
import _ from 'lodash';
// eslint-disable-next-line
import LoadManifestWorker from 'worker-loader!../workers/LoadManifestWorker';

/** Admin panel for the /admin route.
 * The admin panel syncs data from `config.manifestUrl`. Only people
 * that are authorized can see this page. Authorization comes from
 * /user/<username>/admin and from /settings/admins/<username>. Both need to be
 * true to see this page.
 */
export default {
  name: 'admin',
  data() {
    return {
      /**
       * The loading status
       */
      status: 'loading...',
      /**
       * Progress bar for the entries being synced to firebase
       */
      progress: 0,
      /**
       * The list of items to put into /sampleCounts
       */
      manifestEntries: [],
      /**
       * the /sampleCounts document from Firebase.
       */
      sampleCounts: [],
      /**
      * A place to hold variables for pubmed query manifests.
      */
      pubmedQueryStore: {},
      /**
      * a place to hold a continuation token for s3.
      */
      continuation: null,
    };
  },
  props: {
    /**
     * the various levels, the points need to reach the levels,
     * and the badges (colored and greyed out) to display
     */
    levels: {
      type: Object,
      required: true,
    },
    /**
     * The config object that is loaded from src/config.js.
     * It defines how the app is configured, including
     * any content that needs to be displayed (app title, images, etc)
     * and also the type of widget and where to update pointers to data
     */
    config: {
      type: Object,
      required: true,
    },
    /**
     * the intialized firebase database
     */
    db: {
      type: Object,
      required: true,
    },
  },
  /**
   * When the app is mounted, add a listener to Firebase to keep track of sampleCounts.
   */
  mounted() {
    this.addFirebaseListener();
  },
  computed: {
    /**
     * The manifest type can be either 'json' (default) or 'pubmed'
     */
    manifestType() {
      let manifestType = null;
      if (!this.config.manifestType) {
        manifestType = 'json';
      } else {
        manifestType = this.config.manifestType;
      }
      return manifestType;
    },
  },
  methods: {
    /**
     * This method keeps track of sampleCounts, but only loads it once.
     */
    addFirebaseListener() {
      this.db.ref('sampleCounts').once('value', (snap) => {
        /* eslint-disable */
        this.sampleCounts = _.map(snap.val(), (val, key) => {
          return { '.key': key, '.value': val };
        });
        /* eslint-enable */
        this.status = 'complete';
      });
    },
    /**
    * XML parser for pubmed query returns.
    */
    xmlParser(input) {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(input, 'text/xml');
      return xmlDoc;
    },
    /**
    * if the manifest type is pubmed, then we need to query pubmed's API
    * to store our search on the server, and preview the first 100 pmids.
    */
    getPubmedQueryPreview() {
      const baseUrl = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi';
      const url = `${baseUrl}?db=pubmed&term=${encodeURI(this.config.manifestQuery)}&usehistory=y&retmax=100`;
      return axios.get(url).then((resp) => {
        const xml = this.xmlParser(resp.data);
        const webEnv = xml.getElementsByTagName('WebEnv')[0];
        const count = xml.getElementsByTagName('Count')[0];
        const ids = xml.getElementsByTagName('IdList')[0].children;
        this.pubmedQueryStore.webEnv = webEnv.innerHTML;
        this.pubmedQueryStore.count = count.innerHTML;
        this.manifestEntries = _.map(ids, i => i.innerHTML);
      });
    },
    /**
    * after the pubmed query preview, we need to get the full list of IDs
    * and save them to the database.
    */
    getPubmedQueryFull() {
      const baseUrl = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi';
      if (!this.pubmedQueryStore.webEnv) {
        this.getPubmedQueryPreview().then(() => {
          this.getPubmedQueryFull();
        });
      } else {
        const url = `${baseUrl}?db=pubmed&term=${encodeURI(this.config.manifestQuery)}&usehistory=y&retmax=${this.pubmedQueryStore.count}&WebEnv=${this.pubmedQueryStore.webEnv}`;
        axios.get(url).then((resp) => {
          const xml = this.xmlParser(resp.data);
          const ids = xml.getElementsByTagName('IdList')[0].children;
          this.manifestEntries = _.map(ids, i => i.innerHTML);
          // console.log(this.manifestEntries);
          this.syncEntries();
        });
      }
    },
    /**
    * get a list of files from a github pointer
    * TODO: make sure the filenames are firebase compatible, and if they aren't convert them.
    */
    getGithubManifest() {
      let url = `https://api.github.com/repos/${this.config.manifestGitHub.user}/`;
      url += `${this.config.manifestGitHub.repo}/contents/${this.config.manifestGitHub.path}`;
      return axios.get(url).then((resp) => {
        this.manifestEntries = _.map(resp.data, v => v.name.split('.')[0]);
      });
    },
    /**
    *
    */
    parseS3(data) {
      const xml = this.xmlParser(data);
      const keys = xml.getElementsByTagName('Key');
      const continuation = xml.getElementsByTagName('NextContinuationToken');
      const isTruncated = xml.getElementsByTagName('IsTruncated')[0].innerHTML;
      if (isTruncated === 'true') {
        this.continuation = encodeURIComponent(continuation[0].innerHTML);
      } else {
        this.continuation = null;
      }
      const allKeys = _.map(keys, k => k.innerHTML);
      const keysFiltered = _.filter(allKeys, k => k.replace(`${this.config.manifestS3.prefix}/`, ''));
      const keysFixed = _.map(keysFiltered, k => k.replace(`${this.config.manifestS3.prefix}/`, '').split('.')[0]);
      return keysFixed;
    },
    /**
    * if there is a continuation token..
    */
    S3Continuation(token) {
      let url = `https://s3-us-west-2.amazonaws.com/${this.config.manifestS3.bucket}/?list-type=2&`;
      url += `prefix=${this.config.manifestS3.prefix}/&max-keys=${this.config.manifestS3.max_keys}`;
      url += `&delimiter=${this.config.manifestS3.delimiter}`;
      url += `&continuation-token=${token}`;
      if (!token) {
        return 0;
      }
      return axios.get(url).then((resp) => {
        const keysFixed2 = this.parseS3(resp.data);
        this.manifestEntries = _.uniq(this.manifestEntries.concat(keysFixed2));
        if (this.continuation) {
          this.S3Continuation(this.continuation);
        }
      });
    },
    /**
    * get a list of files that are in a bucket of an S3
    * with a prefix and a delimiter (usually, a .)
    * TODO: make the keys firebase safe!!
    */
    getS3Manifest() {
      let url = `https://s3-us-west-2.amazonaws.com/${this.config.manifestS3.bucket}/?list-type=2&`;
      url += `prefix=${this.config.manifestS3.prefix}/&max-keys=${this.config.manifestS3.max_keys}`;
      url += `&delimiter=${this.config.manifestS3.delimiter}`;
      // console.log(url);
      return axios.get(url).then((resp) => {
        const keysFixed = this.parseS3(resp.data);
        this.manifestEntries = _.uniq(this.manifestEntries.concat(keysFixed));
        if (this.continuation) {
          this.S3Continuation(this.continuation);
        }
      });
    },
    /**
     * A method that fetches the manifest so the user can see what's in it.
     * TODO: add a .catch event and display an error if something goes wrong
     * with this request.
     */
    previewManifest() {
      if (this.manifestType === 'json') {
        axios.get(this.config.manifestUrl).then((resp) => {
          this.manifestEntries = resp.data;
        });
      } else if (this.manifestType === 'pubmed') {
        this.getPubmedQueryPreview();
      } else if (this.manifestType === 'github') {
        this.getGithubManifest();
      } else if (this.manifestType === 'S3') {
        this.getS3Manifest();
      }
    },
    /**
     * this method runs in a worker, to check each item in /sampleCounts and each
     * item in manifestUrl. If the item is in manifestUrl but not in /sampleCounts,
     * it is added. If its not in manifestUrl but is in sampleCounts, its removed.
     */
    refreshSamples() {
      this.status = 'refreshing';
      if (this.manifestType === 'json') {
        // grab all the data from the json file defined in the config
        axios.get(this.config.manifestUrl).then((resp) => {
          // resp.data has a list of firebase-friendly strings
          const manifestEntries = resp.data;
          this.manifestEntries = manifestEntries;
          this.syncEntries();
        });
      } else if (this.manifestType === 'pubmed') {
        this.getPubmedQueryFull();
      } else if (this.manifestType === 'github') {
        this.getGithubManifest().then(() => {
          this.syncEntries();
        });
      } else if (this.manifestType === 'S3') {
        // this.getS3Manifest().then(() => {
        if (this.manifestEntries.length) {
          this.syncEntries();
        } else {
          // eslint-disable-next-line
          alert('please press the preview button first,' +
          ' and wait to get the final count');
          this.status = 'complete';
        }
        // });
      }
    },
    /**
    * sync manifest entries and firebase entries
    */
    syncEntries() {
      const firebaseEntries = _.map(this.sampleCounts, v => v['.key']);

      // first, for anything in manifest entries that isn't in firebase db
      // add them.
      const element = this;
      const worker = new LoadManifestWorker();

      // eslint-disable-next-line
      worker.postMessage([this.manifestEntries, firebaseEntries, element.config.firebaseKeys]);
      worker.onmessage = function onmessage(e) {
        element.status = 'complete';
        if (e.data === 'done') {
          element.addFirebaseListener();
        } else {
          element.progress += 1;
        }
      };

      // next check all of the items in firebase db
      // and remove any that aren't in manifestEntries
      _.map(firebaseEntries, (key) => {
        // check to see if the key is in the manifest.
        if (this.manifestEntries.indexOf(key) < 0) {
          // since the key isn't there, remove it from firebase.
          this.db.ref('sampleCounts').child(key).remove();
        }
      });
    },
  },
};
</script>
