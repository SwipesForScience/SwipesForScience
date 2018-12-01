<template>
  <div>
    <h5 class="mt3 pt-3">Widget</h5>
    <b-form-select id="navbarVariant" v-model="config.widgetType" :options="widgetOptions" class="mb-3" />
    <h5 class="mt3 pt-3">Widget Properties</h5>
    <div v-for="(val, key) in widgetSchema" class="mt-2">
      <label :for="key">{{key}}</label>
      <div v-if="val.type() === ''">
        <b-form-input v-model="config.widgetProperties[key]"
                  type="text"
                  :id="key"
                  :placeholder="val.default"
                  >
        </b-form-input>
      </div>
      <div v-else-if="Array.isArray(val.type())">
        <b-alert show :variant="danger">Not implemented yet!</b-alert>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import ImageSplat from '../Widgets/ImageSplat';
import ImageSwipe from '../Widgets/ImageSwipe';
import ImageSoundSwipe from '../Widgets/ImageSoundSwipe';
import PubMedNLP from '../Widgets/PubMedNLP';
import ImageSwipeChoices from '../Widgets/ImageSwipeChoices';
import TemplateWidget from '../Widgets/TemplateWidget';
import TextTagger from '../Widgets/TextTagger';

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
      widgetOptions: ['ImageSwipe',
        'ImageSoundSwipe',
        'ImageSwipeChoices',
        'ImageSplat',
        'PubMedNLP',
        'TemplateWidget',
        'TextTagger'],
    };
  },
  computed: {
    /**
    * get the config widget's schema.
    */
    widgetSchema() {
      const schema = this.getWidgetSchema(this.config.widgetType);
      // console.log(schema);
      return schema;
    },
  },
  methods: {
    getWidgetSchema(widgetType) {
      let Constructor;
      switch (widgetType) {
        case 'ImageSwipe':
          Constructor = Vue.extend(ImageSwipe);
          break;
        case 'ImageSoundSwipe':
          Constructor = Vue.extend(ImageSoundSwipe);
          break;
        case 'ImageSwipeChoices':
          Constructor = Vue.extend(ImageSwipeChoices);
          break;
        case 'PubMedNLP':
          Constructor = Vue.extend(PubMedNLP);
          break;
        case 'ImageSplat':
          Constructor = Vue.extend(ImageSplat);
          break;
        case 'TextTagger':
          Constructor = Vue.extend(TextTagger);
          break;
        default:
          Constructor = Vue.extend(TemplateWidget);
          break;
      }
      const vm = new Constructor({
        propsData: {
          widgetPointer: '',
          widgetProperties: {},
          userSettings: {},
        },
      });
      return vm.getPropertiesSchema();
    },
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
