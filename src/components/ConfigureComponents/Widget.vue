<template>
  <div>
    <h5 class="mt3 pt-3">Widget</h5>
    <b-form-select id="navbarVariant" v-model="config.widgetType" :options="widgetOptions" class="mb-3" />
    <h5 class="mt3 pt-3">Widget Properties</h5>
    <div v-for="(val, key) in config.widgetProperties" class="mt-2">
      <label :for="key">{{key}}</label>
      <b-form-input v-model="config.widgetProperties[key]"
                type="text"
                :id="key"
                >
      </b-form-input>
    </div>
  </div>
</template>
<script>
/**
 * This is the UI to set up a widget during configuration.
 */
  export default {
    props: {
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
    },
    data() {
      return {
        /**
         * The options that are allowed for widgetType.
         */
        widgetOptions: ['ImageSwipe', 'ImageSoundSwipe', 'ImageSplat', 'PubMedNLP', 'TemplateWidget'],
      };
    },
    /**
    * if the router is defined, then navigate to the /play route.
    */
    mounted() {
      if (this.$router) {
        this.$router.replace('/play');
      }
    },
  };
</script>
<style></style>
