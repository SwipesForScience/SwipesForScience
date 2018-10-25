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
 * TODO: fill this in.
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
  mounted() {
    this.$router.replace('/admin');
  },
};
</script>
