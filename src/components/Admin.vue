<template>
  <div id="admin">
    <h1> Admin </h1>

    <b-container>

      <p class="lead" v-if="status=='complete'">You have {{sampleCounts.length}} items currently</p>

      <p v-if="status=='complete'">Click the button below to sync your firebase database with your manifest.</p>

      <div>
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
/**
 * Admin panel
 */
import axios from 'axios';
import _ from 'lodash';
//eslint-disable-next-line
import LoadManifestWorker from 'worker-loader!../workers/LoadManifestWorker';

export default {
  name: 'admin',
  data() {
    return {
      /**
       *
       */
      status: 'loading...',
      /**
       *
       */
      progress: 0,
      /**
       *
       */
      manifestEntries: [],
      /**
       *
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
   *
   */
  mounted() {
    this.addFirebaseListener();
  },
  methods: {
    /**
     *
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
     *
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
        worker.postMessage([manifestEntries, firebaseEntries]);
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
