<template>
  <div>
    <h5>Setting up your database</h5>

    <ol class="text-left ml-3 pl-3">
      <li>
        Create a new Firebase project at
        <a href="https://console.firebase.google.com"
          >console.firebase.google.com</a
        >
      </li>
      <li>Copy the API keys to the text box below and hit "Apply"</li>
    </ol>

    <video
      class="video"
      src="https://s3.amazonaws.com/hotdognothotdog/createFirebaseProject.webm"
      controls
    ></video>
    <b-form-group
      id="group-firebase"
      description="Copy/paste your firebase API keys from the firebase console here."
      label="Firebase Keys:"
      label-for="input-firebase"
      valid-feedback="Thank you!"
      :invalid-feedback="invalidFeedback"
      :state="fkeysValid"
    >
      <b-form-textarea
        id="input-firebase"
        placeholder="Copy/paste your firebase API keys from the firebase console in here"
        rows="5"
        :state="fkeysValid"
        v-model="fkeys"
      />
    </b-form-group>

    <b-button
      class="mt-2 mb-2"
      variant="secondary"
      @click="parseFirebaseKeys"
      :disabled="!fkeysValid"
      >Apply</b-button
    >
  </div>
</template>
<script>
/**
 * This is a component for the part of configuration where the researcher inputs
 * their firebase keys.
 */
import _ from "lodash";

export default {
  data() {
    return {
      /**
       * the variable to store the user input firebase keys
       */
      fkeys: "",
      requiredKeys: [
        "apiKey",
        "authDomain",
        "databaseURL",
        "projectId",
        "storageBucket",
        "messagingSenderId",
      ],
    };
  },
  computed: {
    /**
     * Convert curly quotes in firebase keys to straight quotes
     */
    fkeysScrubbed() {
      return (
        this.fkeys
          .replace(/[\u2018\u2019]/g, "'")
          .replace(/[\u201C\u201D]/g, '"') || ""
      );
    },
    /**
     * Return true if the firebase keys string has all of the required keys
     */
    fkeysValid() {
      return this.requiredKeys.every(key => {
        return this.fkeys.includes(key + ": ");
      });
    },
    invalidFeedback() {
      if (this.fkeys) {
        return (
          "You are missing one of the following keys: " +
          this.requiredKeys.join(", ")
        );
      }
      return "Please enter your firebase API keys.";
    },
  },
  methods: {
    /**
     * parse the firebase keys as they are copied/pasted from the firebase console.
     */
    parseFirebaseKeys() {
      const newFirebaseKeys = {};
      _.map(this.requiredKeys, k => {
        newFirebaseKeys[k] = this.fkeysScrubbed
          .split(`${k}: "`)[1]
          .split('"')[0];
      });
      this.$emit("newFirebaseKeys", newFirebaseKeys);
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
