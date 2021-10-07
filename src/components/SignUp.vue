<template name="signup">
  <div id="signup" class="frame frame--landing">
    <h1 class="mb-3">Create an account</h1>
    <form @submit="onSubmit" class="form--landing">
      <b-alert :show="errors.show" variant="danger">{{
        errors.message
      }}</b-alert>

      <label for="emailAddress">Email address</label>
      <input
        v-model="form.email"
        type="email"
        placeholder="Your email"
        id="emailAddress"
        required
      />
      <label for="username">Username</label>
      <input
        v-model="form.username"
        type="text"
        placeholder="Choose a username"
        id="username"
        required
      />
      <label for="password">Password</label>
      <input
        v-model="form.password"
        type="text"
        placeholder="Password"
        id="username"
        required
      />

      <!-- <b-button
        type="submit"
        variant="primary"
        :disabled="!validated || !form.consented"
        >Get started</b-button
      > -->
      <button
        :disabled="false"
        @click="onSubmit"
        class="btn--landing-primary btn-full-size"
      >
        Get started
      </button>

      <p class="mt-3">
        Already have an account? <router-link to="/login">Log In</router-link>
      </p>
    </form>
  </div>
</template>

<script>
/**
 * The component for the `/signup` route.
 */
import { getDatabase, child, ref, get, set } from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export default {
  name: "signup",
  data() {
    return {
      /**
       * This object holds the variables that the user inputs to the sign up form.
       */
      form: {
        email: "",
        password: "",
        password2: "",
        username: "",
        consented: false,
      },
      /**
       * **TODO**: I'm not sure this is used anywhere. Check this.
       */
      show: true,
      /**
       * A variable to keep track of errors, whether to show it and the error message.
       */
      errors: {
        show: false,
        message: null,
      },
    };
  },
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
  computed: {
    /**
     * The form is validated if the user types the same password twice.
     */
    validated() {
      return this.form.password === this.form.password2;
    },
    /**
     * Return a message based on whether or not the user has consented.
     */
    consentFormLabel() {
      return this.form.consented
        ? "You have consented!"
        : "Click to read and sign the consent form";
    },
  },
  methods: {
    /**
     * Register a new user to firebase.
     * Make sure the username isn't already taken.
     */
    onSubmit(e) {
      e.preventDefault();
      // check for a unique username
      const dbRef = ref(getDatabase());
      get(child(dbRef, `users/${this.form.username}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            throw new Error(
              "Username already exists! Please choose a unique username"
            );
          } else this.createAccount();
        })
        .catch((err) => {
          this.errors.show = true;
          this.errors.message = err.message;
        });
    },
    /**
     * Save that the user has consented.
     */
    saveConsent(e) {
      e.preventDefault();
      this.form.consented = true;
      this.$refs.consentform.hide();
    },
    /**
     * Open the consent form modal.
     */
    openConsentModal() {
      this.$refs.consentform.show();
    },
    /**
     * A method that creates the firebase account and shows an error if there is one.
     */
    createAccount() {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.form.email, this.form.password)
        .then(() => {
          this.updateProfile();
        })
        .catch((err) => {
          this.errors.show = true;
          this.errors.message = err.message;
        });
    },
    /**
     * A method to insert a new user into the `/users` document of firebase.
     * This initializes the user's score, level, whether or not they've consented.
     * and when they consented.
     * **TODO**: set an error message if something goes wrong here.
     */
    insertUser(displayName) {
      const db = getDatabase();
      set(ref(db, "users/" + displayName), {
        score: 0,
        level: 0,
        admin: false,
        taken_tutorial: false,
        consent: this.form.consented,
        consentedOn: new Date(),
      });
    },
    /**
     * Update the user's profile with their username
     * (in the displayName field of an authenticated user.)
     */
    updateProfile() {
      const auth = getAuth();
      updateProfile(auth.currentUser, {
        displayName: this.form.username,
      })
        .then(() => {
          this.insertUser(this.form.username);
          if (this.config.needsTutorial) {
            this.$router.replace("tutorial");
          } else {
            this.$router.replace("play");
          }
        })
        .catch((err) => {
          this.errors.show = true;
          this.errors.message = err.message;
        });
    },
  },
};
</script>
