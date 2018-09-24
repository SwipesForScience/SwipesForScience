<template>
  <div id="about">
    <h1> Admin </h1>

    <b-container>

      <p class="lead">You have {{sampleCounts.length}} items currently</p>

      <p>Click the button below to sync your firebase database with your manifest.</p>

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

export default {
  name: 'about',
  data() {
    return {
      status: 'complete',
    };
  },
  firebase: {
    sampleCounts: db.ref('sampleCounts'),
  },
  props: ['levels'],
  methods: {
    refreshSamples() {
      this.status = 'refreshing';
      // grab all the data from the json file defined in the config
      axios.get(config.manifestUrl).then((resp) => {
        // resp.data has a list of firebase-friendly strings
        const manifestEntries = resp.data;

        // first check all of the items in firebase db
        // and remove any that aren't in manifestEntries
        _.map(this.sampleCounts, (s) => {
          const key = s['.key'];
          // check to see if the key is in the manifest.
          if (manifestEntries.indexOf(key) < 0) {
            // since the key isn't there, remove it from firebase.
            db.ref('sampleCounts').child(key).remove();
          }
        });
        // then, for anything in manifest entries that isn't in firebase db
        // add them.
        _.map(manifestEntries, (key) => {
          db.ref('sampleCounts').child(key).set(0);
        });

        this.status = 'complete';
      });
    },
  },
};
</script>
