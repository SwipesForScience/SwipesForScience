<template>
  <div>
    <h5>Database</h5>
    <label for="firebase">Firebase Keys:</label>
    <b-form-textarea :rows="5" v-model="fkeys"/>

    <b-btn class="mt-2 mb-2" variant="secondary" @click="parseFirebaseKeys">Apply</b-btn>
  </div>
</template>
<script>
  import _ from 'lodash';

  export default {
    data() {
      return {
        fkeys: null,
      };
    },
    methods: {
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
<style></style>