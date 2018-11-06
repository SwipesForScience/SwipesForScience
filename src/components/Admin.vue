<template>
  <div id="admin">
    <h1> Admin </h1>

    <b-container>

      <p class="lead" v-if="status=='complete'">You have {{sampleCounts.length}} items currently</p>
      <p> <b>Data Source:</b> <a :href="config.manifestUrl">{{config.manifestUrl}}</a></p>
      <b-button variant="warning" @click="previewManifest">
        <span> Preview </span>
      </b-button>
      <div v-if="manifestEntries.length" class="mt-3 pt-3">
        <small>Here are a few items in your manifest file. There are {{manifestEntries.length}} items in total</small>
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
     * A method that fetches the manifest so the user can see what's in it.
     * TODO: add a .catch event and display an error if something goes wrong
     * with this request.
     */
    previewManifest() {
      axios.get(this.config.manifestUrl).then((resp) => {
        this.manifestEntries = resp.data;
      });
    },
    /**
     * this method runs in a worker, to check each item in /sampleCounts and each
     * item in manifestUrl. If the item is in manifestUrl but not in /sampleCounts,
     * it is added. If its not in manifestUrl but is in sampleCounts, its removed.
     */
    refreshSamples() {
      this.status = 'refreshing';
      // grab all the data from the json file defined in the config
      axios.get(this.config.manifestUrl).then((resp) => {
        // resp.data has a list of firebase-friendly strings
        const manifestEntries = resp.data;
        this.manifestEntries = manifestEntries;
        const firebaseEntries = _.map(this.sampleCounts, v => v['.key']);
        // first check all of the items in firebase db
        // and remove any that aren't in manifestEntries
        _.map(firebaseEntries, (key) => {
          // check to see if the key is in the manifest.
          if (manifestEntries.indexOf(key) < 0) {
            // since the key isn't there, remove it from firebase.
            this.db.ref('sampleCounts').child(key).remove();
          }
        });
        // then, for anything in manifest entries that isn't in firebase db
        // add them.

        const element = this;
        const worker = new LoadManifestWorker();
        // eslint-disable-next-line
        worker.postMessage([manifestEntries, firebaseEntries, element.config.firebaseKeys]);
        worker.onmessage = function onmessage(e) {
          element.status = 'complete';
          if (e.data === 'done') {
            element.addFirebaseListener();
          } else {
            element.progress += 1;
          }
        };
      });
    },
  },
};
</script>
