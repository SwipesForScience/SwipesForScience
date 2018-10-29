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

      <div v-if="step===1 && Object.keys(userInfo).length === 0">
        <b-alert show>
          Thanks for your keys! Now please log in or sign up to continue with configuration.
        </b-alert>
      </div>

      <div v-if="step===1 && Object.keys(userInfo).length">
        <Initializer v-if="userInfo.displayName !== null"
         :config="config"
         :userInfo="userInfo"
         :db="db"
         v-on:next="next"
         />
         <div v-else>Hold on... {{userInfo.displayName}}</div>
      </div>

      <App v-if="step===2" :config="config" />

      <Widget v-if="step===3" :config="config" />

      <Home v-if="step===4" :config="config" />

      <Tutorial v-if="step===5" :config="config" />

      <div v-if="step===6">
        Download your config file.
        <b-button variant="primary" @click="downloadConfig">Download</b-button>
      </div>

      <div v-if="step===7">
        <h5>Lock down your database!</h5>
        <p>Copy/paste your rules into your firebase console in the 'rules' tab.</p>
        <textarea class="codeBlock" :value="rules" disabled>
        </textarea>
        <br>
        <b-button variant="primary">Copy to clipboard</b-button>
      </div>

      <div v-if="step >= 2" class="mt-3 pt-3">
        <b-button v-if="step >= 3" variant="secondary" @click="prev"> Prev </b-button>
        <b-button variant="secondary"  v-if="step <= 6" @click="next"> Next </b-button>
      </div>

    </div>
    <div id="expander" :style="styleResize" @mousedown="startResize">

    </div>
  </div>
</template>

<script>
/**
 * Configuration side panel
 */
import FirebaseKeys from './ConfigureComponents/FirebaseKeys';
import App from './ConfigureComponents/App';
import Home from './ConfigureComponents/Home';
import Tutorial from './ConfigureComponents/Tutorial';
import Widget from './ConfigureComponents/Widget';
import Initializer from './ConfigureComponents/InitializeDatabase';

/*
 Function to download a text file from
 https://stackoverflow.com/questions/3665115/create-a-file-in-memory-for-user-to-download-not-through-server
*/
function download(filename, text) {
  const element = document.createElement('a');
  element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`);
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

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
    /**
     * the intialized firebase database
     */
    configurationState: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
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
    /**
     *
     */
    step() {
      return this.configurationState.step;
    },
    /**
    *
    */
    rules() {
      return `
      {
        "rules": {
          ".read": false,
          ".write": false,
          "users": {
            ".read": true,
            ".write": "auth !== null && data.exists()",
            "$displayName": {
              ".read": true,
              ".write": "$displayName === auth.token.name",
              "admin": {
                ".write": "auth.uid === '${this.userInfo.uid}'", // replace w/ your UID
              }
            }
          },
          "chats": {
            ".read": true,
            ".write": "auth !== null && data.exists()",
          },
          "sampleCounts": {
            ".read": true,
            ".write": "auth !== null && data.exists()",
          },
          "sampleSummary": {
            ".read": true,
            ".write": "auth !== null && data.exists()",
          },
          "settings": {
            ".read": true,
            ".write": "auth.uid === '${this.userInfo.uid}'" // replace w/ your UID
          },
          "userSeenSamples": {
            ".read": true,
            "$displayName": {
              ".write": "$displayName === auth.token.name"
            },
          },
          "votes": {
            ".write": "data.exists()",
            ".read": "auth !== null",
          }
        }
      }
      `;
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
      this.configurationState.step = 1;
    },
    /**
     * increment this.step by 1
     */
    next() {
      this.configurationState.step += 1;
    },
    /**
     * decrement this.step by 1
     */
    prev() {
      this.configurationState.step -= 1;
    },
    /**
     *
     */
    downloadConfig() {
      download('config.json', JSON.stringify(this.config, null, 2));
    },
  },
  watch: {
    /**
     *
     */
    userInfo: {
      handler() {
        if (this.userInfo.displayName) {
          this.$forceUpdate();
        }
      },
      deep: true,
    },
  },
  /**
   *
   */
  mounted() {
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

<style scoped>
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

  .codeBlock {
    background-color: #f1f1f1;
    color: #e83e8c;
    text-align: left;
    border-style: solid;
    border-radius: 5px;
    border-color: #f1f1f1;
    width: 100%;
    cursor: text;
  }
</style>
