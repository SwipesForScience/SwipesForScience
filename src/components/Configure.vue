<template>
  <div class='configuration'>
    <div :style="styleContent">
      <h3> Swipes for Science
        <button type="button" class="close" aria-label="Close" @click="close" id="closeConfigButton">
          <span aria-hidden="true">&times;</span>
        </button>
      </h3>

      <p class="lead">Configuration</p>

      <FirebaseKeys v-if="step===0" v-on:newFirebaseKeys="setNewFirebaseKeys"/>

      <div v-if="step===1 && Object.keys(userInfo).length === 0">
        <b-alert show>
          Thanks for your keys!
          Follow the steps on the video above:
        </b-alert>
        <video class="video" src="https://s3.amazonaws.com/hotdognothotdog/setupAuthAndDatabase.webm" controls>
        </video>
        <b-alert show>
          when you're done,
          <router-link to="/login">log in</router-link>
          or <router-link to="/signup">sign up</router-link>
          to continue with configuration.
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
        <h5>Lock down your database!</h5>
        <p>Copy/paste your rules into your firebase console in the 'rules' tab.</p>
        <textarea class="codeBlock" :value="rules" disabled rows="15">
        </textarea>
        <br>
        <b-button variant="primary">Copy to clipboard</b-button>
      </div>

      <div v-if="step===7">
        <p> 1. Download your config file. </p>
        <b-button class="mb-3" variant="primary" @click="downloadConfig">Download</b-button>
        <p> 2. Upload your config file to the web (e.g S3, GitHub, Gist, etc) </p>
        <p> 3. Copy/paste the public URL to your config here: </p>
        <b-input v-model="configURL"></b-input>
      </div>

      <div v-if="step===8">
        <h5>Done!</h5>
        <p class="lead">
          The URL to your project is:
        </p>
        <p>
          <a :href="'https://dev.swipesforscience.org/#/?config=' + configURL">
           https://dev.swipesforscience.org/#/?config={{configURL}}
          </a>
        </p>
      </div>

      <div v-if="step >= 2" class="mt-3 pt-3">
        <b-button v-if="step >= 3" variant="secondary" @click="prev"> Prev </b-button>
        <b-button variant="secondary"  v-if="step <= 7" @click="next" :disabled="step === 7 && !configURL"> Next </b-button>
      </div>

    </div>
    <div id="expander" :style="styleResize" @mousedown="startResize">

    </div>
  </div>
</template>

<script>
/**
 * Configuration side panel. This panel lets you modify the main config file,
 * So you can build your own app.
 */
import FirebaseKeys from './ConfigureComponents/FirebaseKeys';
import App from './ConfigureComponents/App';
import Home from './ConfigureComponents/Home';
import Tutorial from './ConfigureComponents/Tutorial';
import Widget from './ConfigureComponents/Widget';
import Initializer from './ConfigureComponents/InitializeDatabase';


function download(filename, text) {
  /*
   Function to download a text file from
   https://stackoverflow.com/questions/3665115/create-a-file-in-memory-for-user-to-download-not-through-server
  */
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
      /**
      placeholder for the user's uploaded config file.
      */
      configURL: '',
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
          ".read": "auth.uid === '${this.userInfo.uid}'", // replace w/ your UID
          ".write": "auth.uid === '${this.userInfo.uid}'",// replace w/ your UID
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
          "userSettings": {
            ".read": false,
            ".write": "auth !== null && data.exists()",
            "$displayName": {
              ".read": "$displayName === auth.token.name",
              ".write": "$displayName === auth.token.name",
            },
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
              ".write": true, // "$displayName === auth.token.name"
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
     * set the resizing flag to true, because the user has mousedown'd on the border.
     */
    startResize() {
      this.resizing = true;
    },
    /**
     * Set this.width to e.clientX
     */
    resize(e) {
      if (this.resizing) {
        this.width = e.clientX;
      }
    },
    /**
     * Set the resizing flag to false to signal that we stopped resizing.
     */
    endResize() {
      this.resizing = false;
    },
    /**
     * Tell the parent component that this config panel should be closed.
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
     * Download the completed config file.
     */
    downloadConfig() {
      download('config.json', JSON.stringify(this.config, null, 2));
    },
  },
  watch: {
    /**
     * If the user logs in, force update the DOM.
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
   * When this component is mounted, set listeners on mousemove and mouseup.
   * These are listeners for the config panel resize.
   * We also (for now) set the needsTutorial flag to off, only because
   * we haven't set up the UI for configuring the tutorial yet.
   */
  mounted() {
    window.addEventListener('mousemove', this.resize);
    window.addEventListener('mouseup', this.endResize);
    this.config.needsTutorial = false;
  },
  /**
   * Before this component is destroyed, remove the resizing listeners.
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

  .video {
      max-width: -webkit-fill-available;
  }
</style>
