<template>
  <div id="app" ref="app">
    <transition
      appear
      @before-enter="beforeNavEnter"
      @enter="navEnter"
      mode="out-in"
    >
      <Navigation v-if="showNavigationBar" />
    </transition>
    <div class="router" v-if="isMounted">
      <transition
        appear
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:before-leave="beforeLeave"
        mode="out-in"
      >
        <router-view
          :userInfo="userInfo"
          :userData="userData"
          :allUsers="allUsers"
          :levels="levels"
          :currentLevel="currentLevel"
          :config="config"
          :db="db"
          v-on:taken_tutorial="setTutorial"
          :routerQuery="routerQuery"
        />
      </transition>
    </div>
  </div>
</template>

<script>
/**
 * The main entrypoint to the app.
 */
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import axios from "axios";
import Navigation from "@/components/Navigation";
import gsap from "gsap";
// firebase-related libraries
import VueFire from "vuefire";
import firebase from "firebase/compat/app";
import { getDatabase, ref, update, onValue } from "firebase/database";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

// useful library for objects and arrays
import _ from "lodash";

// Animate on scroll, for the tutorial
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
// font-awesome icons
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "../node_modules/reset-css/reset.css";
import "../src/css/animations.css";
// config options
import config from "./config";
Vue.use(VueFire);
Vue.use(BootstrapVue);

/**
 * This is the main entrypoint to the app.
 */
export default {
  name: "app",
  components: { Navigation },
  data() {
    return {
      /**
       * This is from firebase auth
       */
      userInfo: {},
      userData: {},
      /**
       * This is the firebase database object.
       */
      db: getDatabase(),
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
      /**
       * Whether or not to show Mobile menu, will be extracted into Header component later
       */
      showHeader: false,
      isMounted: false,
      unsubscribeUser: () => {},
      transitionName: "fade",
    };
  },
  /**
   * When the component is mounted, if there is a query in the route, then
   * load the config file from the query and set it to the components config variable.
   */
  mounted() {
    const auth = getAuth();
    this.userInfo = auth.currentUser || {};
    onAuthStateChanged(auth, (user) => {
      this.userInfo = user || {};
      // if there is a user, subscribe to changes in userData
      if (user) {
        this.unsubscribeUser = onValue(
          ref(getDatabase(), "users/" + user.displayName),
          (snapshot) => {
            this.userData = snapshot.val();
          }
        );
      } else this.unsubscribeUser();
    });
    this.isMounted = true;
  },
  beforeDestroy() {
    this.unsubscribeUser();
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
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.userInfo = {};
          firebase
            .app()
            .delete()
            .then(() => {
              firebase.initializeApp(newKeys);
              this.db = firebase.database();
              this.db
                .ref("/users/")
                .orderByChild("score")
                .on("value", (snap) => {
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
     * whether or not the user is forced to take the tutorial.
     */
    needsTutorial() {
      return this.config.needsTutorial;
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
    isLanding() {
      return false;
    },
    /**
     * whether or not a user is authenticated and has a username.
     */
    userIsDefined() {
      if (this.userInfo == null) {
        return false;
      }
      return !!Object.keys(this.userInfo).length;
    },
    /**
     * router query
     */
    routerQuery() {
      return this.$route.query;
    },
    backgroundColor() {
      return this.$route.name === "Home" ? "#e7e2fe" : "#210856";
    },
    showNavigationBar() {
      const routesWithNav = ["Login", "SignUp"];

      return routesWithNav.includes(this.$route.name);
    },
  },
  methods: {
    /**
     * log out of firebase
     */
    logout() {
      const auth = getAuth();
      signOut(auth).then(() => {
        this.userInfo = {};
        this.$router.replace("/");
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
      const updates = {};
      updates[`/users/${this.userInfo.displayName}/taken_tutorial`] = val;
      update(ref(this.db), updates).then(() => {
        this.$router.replace("play");
      });
    },
    beforeEnter(el) {
      el.style.opacity = 0;
    },
    enter(el) {
      gsap.to(el, {
        opacity: 1,
        duration: 2,
        ease: "elastic.out(1.2, 0.45)",
      });
    },
    beforeLeave(el) {
      gsap.to(el, {
        opacity: 0,
        duration: 2,
        ease: "elastic.out(1.2, 0.45)",
      });
    },
    beforeNavEnter(el) {
      el.style.opacity = 0;
      el.style.transform = "translateY(-60px)";
    },
    navEnter(el) {
      gsap.to(el, {
        duration: 0.5,
        y: 0,
        opacity: 1,
        ease: "elastic.out(1.2, 0.45)",
        delay: 1,
      });
    },
  },

  /**
   * intialize the animate on scroll library (for tutorial) and listen to authentication state
   */
  created() {
    if (this.$route.query.config) {
      // the URL has a config file that overrides the default one for this app!
      axios
        .get(this.$route.query.config)
        .then((resp) => {
          // remove the firebase project
          this.config = resp.data;
        })
        .catch(() => {
          // TODO: set a warning if the config url wasn't valid
          // console.log(e.message);
        });
    }
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Nunito:400,600,700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap");

.router {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
#app {
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: $game-bg-color;
  font-family: $display-font;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $white;
}
</style>
