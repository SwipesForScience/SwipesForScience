<template>
  <div>
    <h5>App</h5>
    <label for="manifestUrl">manifestUrl</label>
    <b-form-input v-model="config.manifestUrl"
              type="text"
              id="manifestUrl"
              >
    </b-form-input>
  </div>
</template>

<style></style>

<script>
/**
 * This a component for configuring the parts of the config file that relate to
 * App.vue.
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

    };
  },
  methods: {

  },
  /**
  * if there is a router defined, then route to the /admin page.
  */
  mounted() {
    if (this.$router) {
      this.$router.replace('/admin');
    }
  },
};
</script>
