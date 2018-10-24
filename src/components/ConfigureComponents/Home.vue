<template>
  <div>
    <h5 class="mt3 pt-3">Home</h5>
    <label for="title">Title</label>
    <b-form-input v-model="config.home.title"
              type="text"
              id="title"
              placeholder="your title here">
    </b-form-input>

    <label for="tagline" class="mt-2">Tagline</label>
    <b-form-input v-model="config.home.tagline"
              type="text"
              id="tagline"
              placeholder="your tagline here">
    </b-form-input>

    <label for="backgroundUrl" class="mt-2">Background URL</label>
    <b-form-input v-model="config.home.backgroundUrl"
              type="text"
              id="backgroundUrl"
              placeholder="url to a picture">
    </b-form-input>
  </div>
</template>
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
  };
</script>
