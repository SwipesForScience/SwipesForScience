<template>
  <div class='configuration'>
    <div :style="styleContent">
      <h3> Swipes for Science
        <button type="button" class="close" aria-label="Close" @click="close" id="closeConfigButton">
          <span aria-hidden="true">&times;</span>
        </button>
      </h3>

      <p class="lead">Configuration</p>
      <p>
        Here you can configure your own SwipesForScience App
      </p>

      <FirebaseKeys v-on:newFirebaseKeys="setNewFirebaseKeys"/>

      <App :config="config" />

      <Home :config="config" />

      <Tutorial :config="config" />

      <Widget :config="config" />

    </div>
    <div id="expander" :style="styleResize" @mousedown="startResize">

    </div>
  </div>
</template>

<script>
/**
 *
 */
import FirebaseKeys from './ConfigureComponents/FirebaseKeys';
import App from './ConfigureComponents/App';
import Home from './ConfigureComponents/Home';
import Tutorial from './ConfigureComponents/Tutorial';
import Widget from './ConfigureComponents/Widget';

export default {
  name: 'configuration',
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
       *
       */
      localConfig: {},
      /**
       *
       */
      fkeys: null,
      /**
       *
       */
      width: 300,
      /**
       *
       */
      resizing: false,
    };
  },
  components: {
    FirebaseKeys,
    App,
    Home,
    Tutorial,
    Widget,
  },
  computed: {
    /**
     *
     */
    styleContent() {
      return {
        width: `${this.width}px`,
        position: 'fixed',
        top: 0,
        'z-index': '9',
        background: '#ffffffe0',
        height: '100%',
        padding: '10px',
        'overflow-y': 'scroll',
      };
    },
    /**
     *
     */
    styleResize() {
      return { left: `${this.width}px` };
    },
  },
  methods: {
    /**
     *
     */
    update() {
      // tell the parent component that the app was updated.
    },
    /**
     *
     */
    startResize() {
      this.resizing = true;
    },
    /**
     *
     */
    resize(e) {
      if (this.resizing) {
        this.width = e.clientX;
      }
    },
    /**
     *
     */
    endResize() {
      this.resizing = false;
    },
    /**
     *
     */
    close() {
      this.$emit('closeConfig');
    },
    /**
     *
     */
    setNewFirebaseKeys(fkeys) {
      this.config.firebaseKeys = fkeys;
    },
  },
  watch: {
    /**
     *
     */
    config() {
      this.localConfig = this.config;
    },
  },
  /**
   *
   */
  mounted() {
    this.localConfig = this.config;
    window.addEventListener('mousemove', this.resize);
    window.addEventListener('mouseup', this.endResize);
  },
  /**
   *
   */
  beforeDestroy() {
    window.removeEventListener('mousemove', this.resize);
    window.removeEventListener('mouseup', this.endResize);
  },
};
</script>

<style>
  #expander {
    height: 100%;
    position: fixed;
    width: 10px;
    top: 0;
    left: 300px;
    background: #6c757d !important;
    cursor: ew-resize;
  }
</style>
