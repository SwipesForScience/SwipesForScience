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
    <b-navbar toggleable="md" type="dark" variant="info">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand to="/">{{brandName}}</b-navbar-brand>

      <!-- If the viewport is small, the navbar collapses.
          Everything in b-collapse is what gets collapsed.
      -->
      <b-collapse is-nav id="nav_collapse">

        <!--  Here are links to different routes  -->
        <b-navbar-nav>
          <b-nav-item to="/" exact>Home</b-nav-item>
          <b-nav-item to="/leaderboard">Leaderboard</b-nav-item>
          <b-nav-item to="/play">Play</b-nav-item>
          <b-nav-item to="/whalechats">Chats</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <!-- This part only displays if the user is authenticated -->
          <b-nav-item-dropdown right v-if="userInfo">
            <template slot="button-content">
              <em>{{userInfo.displayName}}</em>
            </template>
            <b-dropdown-item to="/profile">Profile</b-dropdown-item>
            <b-dropdown-item @click="logout">Signout</b-dropdown-item>
          </b-nav-item-dropdown>

          <!-- The login option shows if the user is not authenticated -->

          <b-nav-item v-else to="login">Login</b-nav-item>

          <b-nav-text v-if="userInfo">
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
                   v-on:taken_tutorial="setTutorial"
                   />
    </div>
  </div>
    <div class="footer bg-dark">
      <table style="height: 200px; width: 100%;">
        <tbody>
          <tr>
            <td class="align-middle text-center text-white">

            </td>
          </tr>
          <tr>
            <td class="align-middle text-center text-white">
              <router-link to="/about" class="text-white">About</router-link>
              <br>
            </td>
          </tr>
          <tr>
            <td class="align-middle text-center text-white">
            icons on this site were <a href='https://www.freepik.com/free-vector/cute-woodland-animals_1585897.htm'>Designed by Freepik</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// useful library for objects and arrays
import _ from 'lodash';

// firebase-related libraries
import VueFire from 'vuefire';
import firebase from 'firebase';
import { db } from './firebaseConfig';

// font-awesome icons
import '../node_modules/font-awesome/css/font-awesome.min.css';

// Here are some badges we set
import jelly from './assets/badges/jelly.svg';
import dolphin from './assets/badges/dolphin.svg';
import orca from './assets/badges/orca.svg';
import narwhal from './assets/badges/narwhal.svg';
import bluewhale from './assets/badges/blueWhale_or_baleen.svg';

// Here are the grayed out versions of the badges
import jellyGrey from './assets/badges/jelly_gray.svg';
import dolphinGrey from './assets/badges/dolphin_gray.svg';
import orcaGrey from './assets/badges/orca_gray.svg';
import narwhalGrey from './assets/badges/narwhal_gray.svg';
import bluewhaleGrey from './assets/badges/blueWhale_or_baleen_gray.svg';

// config options
import config from './config';

// explicit installation required in module environments
Vue.use(VueFire);
Vue.use(BootstrapVue);

export default {
  name: 'app',
  data() {
    return {
      userInfo: {},
      brandName: 'SwipesForScience',
      betaMode: config.betaMode,
      allUsers: [],
      levels: {
        0: {
          level: 0,
          min: 0,
          max: 100,
          character: null,
          img: null,
          img_grey: null,
        },
        1: {
          level: 1,
          min: 101,
          max: 750,
          character: 'jelly',
          img: jelly,
          img_grey: jellyGrey,
        },
        2: {
          level: 2,
          min: 751,
          max: 2000,
          character: 'dolphin',
          img: dolphin,
          img_grey: dolphinGrey,
        },
        3: {
          level: 3,
          min: 2001,
          max: 3500,
          character: 'orca',
          img: orca,
          img_grey: orcaGrey,
        },
        4: {
          level: 4,
          min: 3501,
          max: 6000,
          character: 'narwhal',
          img: narwhal,
          img_grey: narwhalGrey,
        },
        5: {
          level: 5,
          min: 6001,
          max: 8000,
          character: 'blue whale',
          img: bluewhale,
          img_grey: bluewhaleGrey,
        },
      },
    };
  },

  mounted() {

  },

  firebase: {
    allUsers: db.ref('/users/').orderByChild('score'),
  },

  computed: {
    userData() {
      let data = {};
      if (!this.userInfo) {
        return data;
      }
      this.allUsers.forEach((val) => {
        if (val['.key'] === this.userInfo.displayName) {
          data = val;
        }
      });
      return data;
    },
    currentLevel() {
      let clev = {};
      _.mapValues(this.levels, (val) => {
        if (this.userData.score >= val.min && this.userData.score <= val.max) {
          clev = val;
        }
      });

      return clev;
    },
  },
  methods: {
    logout() {
      firebase.auth().signOut().then(() => {
        this.userInfo = null;
        this.$router.replace('login');
      });
    },
    setUser(user) {
      this.userInfo = user;
    },
    setTutorial(val) {
      db.ref(`/users/${this.userInfo.displayName}`).child('taken_tutorial').set(val);
    },
  },

  created() {
    this.userInfo = firebase.auth().currentUser;
    const self = this;
    firebase.auth().onAuthStateChanged((user) => {
      self.userInfo = user;
    });
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
  }
  .content {
    flex: 1 0 auto;
    min-height: -webkit-fill-available;
    height: fit-content;
  }

  .footer {
    position: relative;
    height: 200px;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    /*color: #2c3e50;*/
  }

  .router {
    padding-top: 40px;
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
