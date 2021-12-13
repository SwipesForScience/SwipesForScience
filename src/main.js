// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import { createApp, reactive } from "vue";
import { initializeApp } from "firebase/app";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";
import {
  getAuth,
  onAuthStateChanged,
  connectAuthEmulator,
} from "firebase/auth";
import defineValidationRules from "./validation-rules";
import App from "./App";
import router from "./router";
import appConfig from "./config";
import imageswipeTestConfig from "./example.imageswipe-test.config";
import wordswipeTestConfig from "./example.wordswipe-test.config";
let app;

// we have to to initialize the app w/ existing config keys here.
// this is important for when the user refreshes.

/*
"Import your Firebase configuration and set up the Firebase method onAuthStateChanged.
This will make sure Firebase initializes before loading the app when a user refreshes a page."
- https://savvyapps.com/blog/definitive-guide-building-web-app-vuejs-firebase
*/

let config = appConfig;
// Sample setup for ImageSwipe and WordSwipe for development for testing only. Will be removed when testing is done
if (process.env.VUE_APP_PROJECT_ID === "imageswipe-test") {
  config = imageswipeTestConfig;
}
if (process.env.VUE_APP_PROJECT_ID === "wordswipe-test") {
  config = wordswipeTestConfig;
}

initializeApp(config.firebaseKeys);
const sourceOfTruth = reactive({
  message: "Hello",
});
const auth = getAuth();
const db = getDatabase();
if (process.env.NODE_ENV === "development") {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectDatabaseEmulator(db, "localhost", 9000);
}
onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp({
      template: "<App/>",
      components: { App },
      data() {
        return sourceOfTruth;
      },
    });
    app.use(router).mount("#app");
  }
});

defineValidationRules();
