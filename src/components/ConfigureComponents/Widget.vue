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
  export default {
    props: ['config'],
    data() {
      return {
        widgetOptions: ['ImageSwipe', 'ImageSoundSwipe', 'ImageSplat', 'PubMedNLP', 'TemplateWidget'],
      };
    },
  };
</script>
<style></style>
