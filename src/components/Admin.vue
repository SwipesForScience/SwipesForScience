<template>
  <div id="admin">
    <h1> Admin </h1>

    <b-container>

      <p class="lead" v-if="status=='complete'">You have {{sampleCounts.length}} items currently</p>

      <p v-if="status=='complete'">Click the button below to sync your firebase database with your manifest.</p>

      <p>
        <b-button @click="refreshSamples">
          <span v-if="status=='complete'">Refresh Sample List</span>
          <span v-else>{{status}}</span>
        </b-button>
      </p>


    </b-container>

  </div>

</template>

<style>

</style>

<script>
import axios from 'axios';
import _ from 'lodash';
import config from '../config';
import { db } from '../firebaseConfig';
//eslint-disable-next-line
import LoadManifestWorker from 'worker-loader!../workers/loadManifestWorker';

export default {
  name: 'admin',
  data() {
    return {
      status: 'loading...',
      sampleCounts: [],
    };
  },
  // firebase() {
  //   return {
  //     sampleCounts: {
  //       source: db.ref('sampleCounts'),
  //       readyCallback() {
  //         this.status = 'complete';
  //       },
  //     },
  //   };
  // },
  props: ['levels'],
  mounted() {
    this.addFirebaseListener();
  },
  methods: {
    addFirebaseListener() {
      db.ref('sampleCounts').once('value', (snap) => {
        /* eslint-disable */
        this.sampleCounts = _.map(snap.val(), (val, key) => {
          return { '.key': key, '.value': val };
        });
        /* eslint-enable */
        this.status = 'complete';
      });
    },
    refreshSamples() {
      this.status = 'refreshing';
      // grab all the data from the json file defined in the config
      axios.get(config.manifestUrl).then((resp) => {
        // resp.data has a list of firebase-friendly strings
        const manifestEntries = resp.data;
        const firebaseEntries = _.map(this.sampleCounts, v => v['.key']);
        // first check all of the items in firebase db
        // and remove any that aren't in manifestEntries
        _.map(firebaseEntries, (key) => {
          // check to see if the key is in the manifest.
          if (manifestEntries.indexOf(key) < 0) {
            // since the key isn't there, remove it from firebase.
            db.ref('sampleCounts').child(key).remove();
          }
        });
        // then, for anything in manifest entries that isn't in firebase db
        // add them.
        const element = this;
        const worker = new LoadManifestWorker();
        worker.postMessage([manifestEntries, firebaseEntries]);
        worker.onmessage = () => {
          element.status = 'complete';
          element.addFirebaseListener();
        };
      });
    },
  },
};
</script>
