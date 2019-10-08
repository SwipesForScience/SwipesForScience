<template>
  <div id="app">
    <!-- The Navbar below stays constant throughout the app.
         We've set up links on the navbar to different "routes",
         like the "Home" page and "About" page.

         There is also a right-aligned link to Login with GitHub.
         When logged in, this shows the username with a dropdown menu
         to see the profile or logout.
    -->
    <div class="content">
      <div v-if="betaMode" class="corner-ribbon bottom-right sticky blue">Beta</div>
    <b-navbar id="custom_navbar" toggleable="md" type="dark" :variant="navbarVariant">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand to="/" id="brandName">{{brandName}}</b-navbar-brand>

      <!-- If the viewport is small, the navbar collapses.
          Everything in b-collapse is what gets collapsed.
      -->
      <b-collapse is-nav id="nav_collapse">

        <!--  Here are links to different routes  -->
        <b-navbar-nav id="navLinks">
          <b-nav-item :to="{ name: 'Home', query: routerQuery}" exact>Home</b-nav-item>
          <b-nav-item :to="{ name: 'Leaderboard', query: routerQuery}">Leaderboard</b-nav-item>
          <b-nav-item :to="{ name: 'Play', query: routerQuery}">Play</b-nav-item>
          <b-nav-item :to="{ name: 'Chats', query: routerQuery}">Chats</b-nav-item>
          <b-nav-item v-if="needsTutorial" :to="{ name: 'Tutorial', query: routerQuery}">Tutorial</b-nav-item>
          <b-nav-item v-if="userData.admin" :to="{ name: 'Admin', query: routerQuery}">Admin</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <!-- This part only displays if the user is authenticated -->
          <b-nav-item-dropdown right v-if="userIsDefined">
            <template slot="button-content">
              <em>{{userInfo.displayName}}</em>
            </template>
            <b-dropdown-item :to="{ name: 'Profile', query: routerQuery }">Profile</b-dropdown-item>
            <b-dropdown-item @click="logout">Signout</b-dropdown-item>
          </b-nav-item-dropdown>

          <!-- The login option shows if the user is not authenticated -->

          <b-nav-item v-else :to="{ name: 'Login', query: routerQuery}">Login</b-nav-item>

          <b-nav-text v-if="userIsDefined">
            <b-img v-if="currentLevel.img"
              rounded="circle" width="20"
              height="20"
              alt="img" class="m-1"
              :src="currentLevel.img"
              />
            {{userData.score}}
          </b-nav-text>

        </b-navbar-nav>

      </b-collapse>
    </b-navbar>

    <!-- The content is in the router view -->
    <div class="router">
      <router-view :userInfo="userInfo"
                   :userData="userData"
                   :allUsers="allUsers"
                   :levels="levels"
                   :currentLevel="currentLevel"
                   :config="config"
                   :db="db"
                   v-on:taken_tutorial="setTutorial"
                   :routerQuery="routerQuery"
                   />
    </div>
      <!-- Configuration Drawer -->
      <Configure ref="configurationPane" v-if="showConfig"
       :config="config" v-on:closeConfig="closeConfig"
       :userInfo="userInfo"
       :db="db"
       :configurationState="configurationState"
      />

  </div>
    <Footer v-on:openConfig="openConfig" :config="config" :routerQuery="routerQuery"></Footer>
  </div>
</template>

<script>
/**
 * The main entrypoint to the app.
 */
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import axios from 'axios';

// useful library for objects and arrays
import _ from 'lodash';

// Animate on scroll, for the tutorial
import AOS from 'aos';
import 'aos/dist/aos.css';

// firebase-related libraries
import VueFire from 'vuefire';
import firebase from 'firebase';
// import { db } from './firebaseConfig';

// font-awesome icons
import '../node_modules/font-awesome/css/font-awesome.min.css';

// config options
import config from './config';
import Configure from './components/Configure';
import Footer from './components/Footer';

// explicit installation required in module environments
Vue.use(VueFire);
Vue.use(BootstrapVue);

// this is only for debugging. probably should get rid of it.
window.firebase = firebase;

/**
* This is the main entrypoint to the app.
*/
export default {
  name: 'app',
  data() {
    return {
      /**
       * This is from firebase
       */
      userInfo: {},
      /**
       * This is the firebase database object.
       */
      db: firebase.database(),
      /**
       * This is the config object, it defines the look of the app
       */
      config,
      /**
       * Whether or not to show the configuration panel
       */
      showConfig: false,
      /**
       * All the users in the /users document
       */
      allUsers: [],
      /**
       * The configuration state, keeping track of the step number only.
       */
      configurationState: {
        step: 0,
      },
    };
  },
  /**
   * When the component is mounted, if there is a query in the route, then
   * load the config file from the query and set it to the components config variable.
   */
  mounted() {
    AOS.init();
    this.userInfo = firebase.auth().currentUser;
    const self = this;
    firebase.auth().onAuthStateChanged((user) => {
      self.userInfo = user || {};
    });
  },

  components: {
    Configure,
    Footer,
  },

  firebase() {
    return {
      allUsers: {
        source: this.db.ref('/users/').orderByChild('score'),
        asObject: true,
      },
    };
  },
  watch: {
    /**
     * watch the firebase keys. if they change, then delete the old firebase app,
     * and then initialize a new one with the keys.
     * also, log out of the old app, and set a listener on authentication state for the
     * new app.
     */
    firebaseKeys(newKeys) {
      // there has been a change in firebaseKeys
      firebase.auth().signOut().then(() => {
        this.userInfo = {};
        firebase.app().delete().then(() => {
          firebase.initializeApp(newKeys);
          this.db = firebase.database();
          this.db.ref('/users/').orderByChild('score').on('value', (snap) => {
            this.allUsers = snap.val();
          });
          this.userInfo = firebase.auth().currentUser || {};
          const self = this;
          firebase.auth().onAuthStateChanged((user) => {
            self.userInfo = user || {};
          });
        });
      });
    },
  },

  computed: {
    /**
     * the firebase keys from the config file
     */
    firebaseKeys() {
      return this.config.firebaseKeys;
    },
    /**
     * the brandname from the config file (home.title)
     */
    brandName() {
      return this.config.home.title;
    },
    /**
     * whether or not to show the "beta" ribbon, defined in the config.
     */
    betaMode() {
      return this.config.betaMode;
    },
    /**
     * whether or not the user is forced to take the tutorial.
     */
    needsTutorial() {
      return this.config.needsTutorial;
    },
    /**
     * color of the navbar, based on bootstrap4 color variants.
     */
    navbarVariant() {
      return this.config.app ? this.config.app.navbarVariant || 'info' : 'info';
    },
    /**
     * the current user's data, based on the userInfo from the firebase.auth.
     * this matches the info in allUsers (/users) to the firebase.auth user info.
     */
    userData() {
      let data = {};
      if (this.userInfo == null) {
        return data;
      } else if (!Object.keys(this.userInfo).length) {
        return data;
      }

      _.map(this.allUsers, (value, key) => {
        if (key === this.userInfo.displayName) {
          data = value;
          data['.key'] = key;
        }
      });
      return data;
    },
    /**
     * The levels are defined based on score bins. Each level also defines
     * a character image that a user can "unlock" when the annotate enough samples.
     * eventually, this should be abstracted out into the config variable.
     */
    levels() {
      return this.config.levels;
    },
    /**
     * the current user's level.
     */
    currentLevel() {
      let clev = {};
      _.mapValues(this.levels, (val) => {
        if (this.userData.score >= val.min && this.userData.score <= val.max) {
          clev = val;
        }
      });

      return clev;
    },
    /**
     * whether or not a user is authenticated and has a username.
     */
    userIsDefined() {
      if (this.userInfo == null) {
        return false;
      }
      return Object.keys(this.userInfo).length;
    },
    /**
     * router query
     */
    routerQuery() {
      return this.$route.query;
    },
  },
  methods: {
    /**
     * log out of firebase
     */
    logout() {
      firebase.auth().signOut().then(() => {
        this.userInfo = {};
        this.$router.replace('login');
      });
    },
    /**
     * set the userInfo attribute
     */
    setUser(user) {
      this.userInfo = user || {};
    },
    /**
     * set the tutorial status of the current user
     */
    setTutorial(val) {
      this.db.ref(`/users/${this.userInfo.displayName}`).child('taken_tutorial').set(val);
      this.$router.replace('play');
    },
    /**
     * open the config panel
     */
    openConfig() {
      this.showConfig = true;
    },
    /**
     * close the config panel
     */
    closeConfig() {
      this.showConfig = false;
    },
  },
  /**
   * intialize the animate on scroll library (for tutorial) and listen to authentication state
   */
  created() {
    if (this.$route.query.config) {
      // the URL has a config file that overrides the default one for this app!
      axios.get(this.$route.query.config).then((resp) => {
        // remove the firebase project
        this.config = resp.data;
      }).catch(() => {
        // TODO: set a warning if the config url wasn't valid
        // console.log(e.message);
      });
    }
  },
};
</script>

<style>
  /*
    You can style your component here. Since this is a top level componentm
    the styles follow into child components.
  */

  html, body {
    height: 100%;
  }
  body {
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
  }
  .content {
    flex: 1 0 auto;
    min-height: -webkit-fill-available;
    height: fit-content;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    /*color: #2c3e50;*/
  }

  .router {
    padding-top: 20px;
  }

  #signupForm {
    max-width: 400px;
    padding: 20px;
    margin-top: 20px;
    box-shadow: 0px 0 7px 0px #80808036;
  }

  .inline {

  }

  /* The ribbons */

  .corner-ribbon{
    width: 200px;
    background: #e43;
    position: absolute;
    top: 25px;
    left: -50px;
    text-align: center;
    line-height: 50px;
    letter-spacing: 1px;
    color: #f0f0f0;
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }

  /* Custom styles */

  #custom_navbar {
    background-color: purple !important;
  }

.landing > h1, p {
    color: black !important;
    background-color: white !important;
  }

  .corner-ribbon.sticky{
    position: fixed;
  }

  .corner-ribbon.shadow{
    box-shadow: 0 0 3px rgba(0,0,0,.3);
  }

  /* Different positions */

  .corner-ribbon.top-left{
    top: 25px;
    left: -50px;
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }

  .corner-ribbon.top-right{
    top: 25px;
    right: -50px;
    left: auto;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
  }

  .corner-ribbon.bottom-left{
    top: auto;
    bottom: 25px;
    left: -50px;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
  }

  .corner-ribbon.bottom-right{
    top: auto;
    right: -50px;
    bottom: 25px;
    left: auto;
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }

  /* Colors */

  .corner-ribbon.white{background: #f0f0f0; color: #555;}
  .corner-ribbon.black{background: #333;}
  .corner-ribbon.grey{background: #999;}
  .corner-ribbon.blue{background: #007aff;
  z-index: 99}
  .corner-ribbon.green{background: #2c7;}
  .corner-ribbon.turquoise{background: #1b9;}
  .corner-ribbon.purple{background: #95b;}
  .corner-ribbon.red{background: #e43;}
  .corner-ribbon.orange{background: #e82;}
  .corner-ribbon.yellow{background: #ec0;}
</style>
