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

      <FirebaseKeys v-if="step===0" v-on:newFirebaseKeys="setNewFirebaseKeys"/>

      <div v-if="step===1 && userInfo === null">
        <b-alert show>
          Thanks for your keys! Now please log in or sign up to continue with configuration.
        </b-alert>
      </div>

      <div v-if="step===1 && userInfo !== null">
        <Initializer v-if="step===1 && userInfo.displayName !== null"
         :config="config"
         :userInfo="userInfo"
         :db="db"
         v-on:next="next"
         />
      </div>

      <App v-if="step===2" :config="config" />

      <Home v-if="step===3" :config="config" />

      <Tutorial v-if="step===4" :config="config" />

      <Widget v-if="step===5" :config="config" />

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
import Initializer from './ConfigureComponents/InitializeDatabase';

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
    /**
     * the authenticated user object from firebase
     */
    userInfo: {
      type: Object,
      required: true,
    },
    /**
     * the intialized firebase database
     */
    db: {
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
      /**
       * Step counter
       */
      step: 0,
    };
  },
  components: {
    FirebaseKeys,
    App,
    Home,
    Tutorial,
    Widget,
    Initializer,
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
     * Set the firebase keys in the config
     * this launches a watcher on the parent that reinitializes
     * a new firebase database.
     * Also we set the step counter to 1.
     */
    setNewFirebaseKeys(fkeys) {
      this.config.firebaseKeys = fkeys;
      this.step = 1;
    },
    /**
     * increment this.step by 1
     */
    next() {
      this.step += 1;
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
    this.config.needsTutorial = false;
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
    width: 7px;
    top: 0;
    left: 300px;
    background: rgba(255, 255, 255, 0.88) !important;
    cursor: ew-resize;
    -webkit-box-shadow: 5px 2px 38px -3px #000000;
    box-shadow: 5px 2px 38px -3px #000000;
  }
</style>
