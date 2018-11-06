<template>
  <div>
    <h5>Setting up your database</h5>

    <ol class="text-left ml-3 pl-3">
      <li>
        Create a new Firebase project
        at <a href="https://console.firebase.google.com">console.firebase.google.com</a>
      </li>
      <li>
        Copy the API keys to the text box below and hit "Apply"
      </li>
    </ol>

    <video class="video" src="https://s3.amazonaws.com/hotdognothotdog/createFirebaseProject.webm" controls></video>
    <label for="firebase">Firebase Keys:</label>
    <b-textarea placeholder="Copy/paste your firebase API keys from the firebase console in here" :rows="5" v-model="fkeys"/>

    <b-button class="mt-2 mb-2" variant="secondary" @click="parseFirebaseKeys" :disabled="!fkeys">Apply</b-button>
  </div>
</template>
<script>
/**
 * This is a component for the part of configuration where the researcher inputs
 * their firebase keys.
 */
  import _ from 'lodash';

  export default {
    data() {
      return {
        /**
         * the variable to store the user input firebase keys
         */
        fkeys: null,
      };
    },
    methods: {
      /**
       * parse the firebase keys as they are copied/pasted from the firebase console.
       */
      parseFirebaseKeys() {
        const keys = ['apiKey', 'authDomain', 'databaseURL', 'projectId', 'storageBucket', 'messagingSenderId'];
        const newFirebaseKeys = {};
        _.map(keys, (k) => {
          newFirebaseKeys[k] = this.fkeys.split(`${k}: "`)[1].split('"')[0];
        });
        this.$emit('newFirebaseKeys', newFirebaseKeys);
        return newFirebaseKeys;
      },
    },
  };
</script>
<style scoped>
  .video {
      max-width: -webkit-fill-available;
  }
</style>
