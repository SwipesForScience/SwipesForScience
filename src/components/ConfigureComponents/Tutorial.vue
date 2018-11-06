<template>
  <div>
    <h5 class="mt3 pt-3">Tutorial</h5>

    <div class="form-check">
      <input class="form-check-input" type="checkbox" v-model="config.needsTutorial" id="defaultCheck1">
      <label class="form-check-label" for="defaultCheck1">
        Needs a tutorial?
      </label>
    </div>

  </div>
</template>
<script>
/**
 * **WORK IN PROGRESS** this isn't complete yet. But it will be a UI
 * for a researcher to set up their tutorial.
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
  };
</script>
<style></style>
