<template name="signup">
  <div id="signup">
    <h1> Sign Up </h1>
    <!-- Modal Component -->
    <b-modal id="consentform" title="Consent Form"
      ref="consentform" size="lg">
      <terms></terms>
      <div slot="modal-footer" class="w-100">
        <b-form @submit="saveConsent">
          <b-button type="submit" variant="primary">I Consent</b-button>
        </b-form>
      </div>

    </b-modal>

    <div id="signupForm" class="container fluid">
      <b-form @submit="onSubmit" validated>
        <b-alert :show="errors.show" variant="danger">{{errors.message}}</b-alert>

        <b-form-group id="consentOpenButton"
                      :label="consentFormLabel"
                      label-for="openConsent">
            <b-button v-if="!form.consented"
             variant="success" id="openConsent"
             @click="openConsentModal"> Open Consent Form </b-button>
        </b-form-group>

        <b-form-group id="emailAddressInputGroup"
                      label="Email address:"
                      label-for="emailAddress"
                      description="We'll never share your email with anyone else.">
          <b-form-input id="emailAddress"
                        type="email"
                        v-model="form.email"
                        required
                        placeholder="Enter email">
          </b-form-input>
        </b-form-group>
        <b-form-group id="usernameInputGroup"
                      label="Username:"
                      label-for="usernameInput"
                      description="This will be displayed on the leaderboard">
          <b-form-input id="usernameInput"
                        type="text"
                        v-model="form.username"
                        required
                        placeholder="Choose a username">
          </b-form-input>
        </b-form-group>

        <b-form-group id="passwordInputGroup"
                      label="Password:"
                      label-for="passwordInput">
          <b-form-input id="passwordInput"
                        type="password"
                        v-model="form.password"
                        required
                        placeholder="Password">
          </b-form-input>
        </b-form-group>

        <b-form-group id="password2InputGroup"
                      label="Password Again:"
                      label-for="password2Input">
          <b-alert :show="!validated" variant="danger">
            Make sure your passwords match!
          </b-alert>
          <b-form-input id="password2Input"
                        type="password"
                        v-model="form.password2"
                        required
                        placeholder="Confirm password">
          </b-form-input>
        </b-form-group>


        <b-button type="submit"
         variant="primary" :disabled="!validated || !form.consented">Submit</b-button>

        <p class="mt-3">
          Already have an account? <router-link to="/login">Log In</router-link>
        </p>

      </b-form>
    </div>
  </div>
</template>
<style>
#signup {
  min-height: 100vh;
}
</style>
<script>
/**
 * The component for the `/signup` route.
 */
  import firebase from 'firebase';
  import Terms from '@/components/Terms';

  export default {
    name: 'signup',
    data() {
      return {
        /**
         * This object holds the variables that the user inputs to the sign up form.
         */
        form: {
          email: '',
          password: '',
          password2: '',
          username: '',
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
    components: { terms: Terms },
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
        return this.form.consented ? 'You have consented!' : 'Click to read and sign the consent form';
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
        firebase.database().ref('users').child(this.form.username).once('value')
        .then((snapshot) => {
          const val = snapshot.val();
          if (!val) {
            this.createAccount();
          } else {
            this.errors.show = true;
            this.errors.message = 'Username already exists! Please choose a unique username';
          }
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
        firebase.auth().createUserWithEmailAndPassword(this.form.email, this.form.password).then(
          (user) => {
            this.updateProfile(user);
          }, (err) => {
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
      insertUser(user) {
        firebase.database().ref('users').child(user.displayName).set({
          score: 0,
          level: 0,
          admin: false,
          taken_tutorial: false,
          consent: this.form.consented,
          consentedOn: new Date(),
        })
        .then(() => {
        })
        .catch(() => {
        });
      },
      /**
       * Update the user's profile with their username
       * (in the displayName field of an authenticated user.)
       */
      updateProfile(user) {
        user.updateProfile({
          displayName: this.form.username,
        }).then(() => {
            // Profile updated successfully!
          this.insertUser(user);
          if (this.config.needsTutorial) {
            this.$router.replace('tutorial');
          } else {
            this.$router.replace('play');
          }
        }, (err) => {
            // An error happened.
          this.errors.show = true;
          this.errors.message = err.message;
        });
      },
    },
  };
</script>
