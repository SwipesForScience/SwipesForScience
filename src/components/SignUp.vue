<template name="signup">
  <div>
    <Terms
      v-show="showConsentForm"
      @toggleConsentForm="toggleConsentForm"
      @updateConsent="updateConsent"
      :consented="form.consented"
    />
    <div id="signup" class="frame frame--landing" v-show="!showConsentForm">
      <h1 class="mb-3">Create an account</h1>
      <b-alert :show="errors.show" variant="danger">{{
        errors.message
      }}</b-alert>
      <ValidationObserver v-slot="{ handleSubmit }" ref="form" tag="div">
        <form @submit.prevent="handleSubmit(onSubmit)" class="form--landing">
          <FormText
            label="Email Address"
            placeholder="Your email"
            vid="email"
            v-model="form.email"
            type="email"
            rules="required|email"
          />
          <FormText
            label="Username"
            placeholder="Username"
            vid="username"
            v-model="form.username"
            rules="required|alpha_dash"
          />
          <FormText
            label="Password"
            placeholder="Password"
            vid="password"
            v-model="form.password"
            rules="required"
            type="password"
          />
          <!-- Additional fields specified by config-->
          <div v-for="field in additionalFormFields" :key="field.fieldName">
            <FormText
              v-if="field.component === 'FormText'"
              :vid="field.fieldName"
              :label="field.label"
              :placeholder="field.placeholder"
              v-model="form[`${field.fieldName}`]"
              :rules="field.rules"
              :type="field.type"
            />
            <FormSelect
              v-if="field.component === 'FormSelect'"
              :vid="field.fieldName"
              :label="field.label"
              v-model="form[`${field.fieldName}`]"
              :options="field.options"
              :rules="field.rules"
            />
            <FormCheckbox
              v-if="field.component === 'FormCheckbox'"
              :vid="field.fieldName"
              :label="field.label"
              :value="form[`${field.fieldName}`]"
              :checked.sync="form[`${field.fieldName}`]"
              :rules="field.rules"
            />
          </div>

          <button
            class="btn--landing-primary btn-full-size mt-3"
            v-if="form.consented"
          >
            Get started
          </button>
        </form>
      </ValidationObserver>
      <button
        class="btn--landing-primary btn-full-size mt-3"
        @click="toggleConsentForm"
        v-if="!form.consented"
      >
        Read and sign consent form
      </button>
      <span
        class="terms__consent-form-link"
        v-if="form.consented"
        @click="toggleConsentForm"
      >
        View consent form
      </span>
      <p class="mt-3">
        Already have an account?
        <router-link to="/login">Log In</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { getDatabase, child, ref, get, set } from "firebase/database";
import { omit } from "lodash";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { ValidationObserver, extend } from "vee-validate";
import {
  required,
  email,
  min_value,
  max_value,
  integer,
  alpha_dash,
} from "vee-validate/dist/rules";
import FormSelect from "./Form/FormSelect.vue";
import FormText from "./Form/FormText.vue";
import FormCheckbox from "./Form/FormCheckbox.vue";
import Terms from "@/components/Terms";

extend("email", { ...email, message: "Please enter a valid email" });
extend("required", {
  ...required,
  message: "This field is required",
});
extend("alpha_dash", {
  ...alpha_dash,
  message:
    "Should only contain alphabetic characters, numbers, dashes or underscores",
});
extend("min_value", { ...min_value, message: "Value is too low" });
extend("max_value", { ...max_value, message: "Value is too high" });
extend("integer", integer);

export default {
  name: "signup",
  components: {
    ValidationObserver,
    FormSelect,
    FormText,
    Terms,
    FormCheckbox,
  },
  data() {
    return {
      /**
       * This object holds the variables that the user inputs to the sign up form.
       */
      form: {
        email: "",
        password: "",
        username: "",
        consented: false,
      },

      /**
       * A variable to keep track of errors, whether to show it and the error message.
       */
      errors: {
        show: false,
        message: null,
      },
      showConsentForm: false,
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
  methods: {
    /**
     * Register a new user to firebase.
     * Make sure the username isn't already taken.
     */
    onSubmit() {
      // check for a unique username
      const dbRef = ref(getDatabase());
      get(child(dbRef, `users/${this.form.username}`))
        .then(snapshot => {
          if (snapshot.exists()) {
            this.$refs.form.setErrors({
              username: [
                "Username already exists! Please choose a unique username",
              ],
            });
          } else {
            if (this.form.consented) {
              this.createAccount();
            } else {
              this.toggleConsentForm();
            }
          }
        })
        .catch(err => {
          this.errors.show = true;
          this.errors.message = err.message;
        });
    },
    /**
     * Save that the user has consented.
     */
    updateConsent(value) {
      this.form.consented = value;
    },
    /**
     * Open the consent form modal.
     */
    toggleConsentForm() {
      this.showConsentForm = !this.showConsentForm;
    },
    /**
     * A method that creates the firebase account and shows an error if there is one.
     */
    createAccount() {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.form.email, this.form.password)
        .then(() => {
          return updateProfile(auth.currentUser, {
            displayName: this.form.username,
          });
        })
        .then(() => {
          return this.insertUser(this.form.username);
        })
        .then(() => {
          if (this.config.needsTutorial) {
            this.$router.replace("tutorial");
          } else {
            this.$router.replace("play");
          }
        })
        .catch(err => {
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
      const additionalUserData = omit(this.form, [
        "username",
        "password",
        "email",
        "consented",
      ]);
      return set(ref(db, "users/" + displayName), {
        ...additionalUserData,
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
          return this.insertUser(this.form.username);
        })
        .then(() => {
          if (this.config.needsTutorial) {
            this.$router.replace("tutorial");
          } else {
            this.$router.replace("play");
          }
        })
        .catch(err => {
          this.errors.show = true;
          this.errors.message = err.message;
        });
    },
  },
  computed: {
    additionalFormFields() {
      return this.config?.signup?.additionalFormFields || [];
    },
  },
};
</script>
<style lang="scss" scoped>
.terms__consent-form-link {
  margin-top: space(1);
  cursor: pointer;
  @include font-size("xs");
  color: $landing-warning;
  display: block;
  text-decoration: underline;
  text-align: center;
}
</style>
