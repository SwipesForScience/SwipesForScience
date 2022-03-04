<template name="signup">
  <div>
    <Terms
      v-show="showConsentForm"
      @toggleConsentForm="toggleConsentForm"
      @updateConsent="updateConsent"
      :consented="consented"
    />

    <div id="signup" class="frame frame--landing" v-show="!showConsentForm">
      <h1 class="mb-3">Create an account</h1>
      <div
        class="alert-card--landing alert-card--landing--error mt-1 mb-3"
        v-if="firebaseErrors.show"
      >
        {{ firebaseErrors.message }}
      </div>
      <form @submit.prevent="onSubmit" class="form--landing">
        <FormText
          name="email"
          label="Email"
          type="email"
          placeholder="Your Email"
          rules="required|email"
        />
        <FormText
          name="password"
          label="Password"
          type="password"
          placeholder="Password"
          rules="min_length:6|required"
        />
        <FormText
          name="username"
          label="Username"
          type="text"
          placeholder="Username"
          :rules="{
            min_length: 3,
            max_length: 20,
            required: true,
            alpha_dash: true,
          }"
        />
        <component
          v-for="field in additionalFormFields"
          :key="field.name"
          :type="field.type"
          :name="field.name"
          :is="field.component"
          :label="field.label"
          :placeholder="field.placeholder"
          :rules="field.rules"
          :options="field.options"
        ></component>
        <button
          @click="onSubmit"
          class="btn--landing-primary btn-full-size mt-3"
          v-if="consented"
        >
          Get started
        </button>
      </form>
      <button
        class="btn--landing-primary btn-full-size mt-3"
        @click="toggleConsentForm"
        v-if="!consented"
      >
        Read and sign consent form
      </button>
      <span
        class="terms__consent-form-link"
        v-if="consented"
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
import { useRouter } from "vue-router";
import { reactive, ref as vueRef } from "vue";
import { omit } from "lodash";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import Terms from "./Terms.vue";
import FormCheckbox from "./Form/FormCheckbox.vue";
import FormSelect from "./Form/FormSelect.vue";
import FormText from "./Form/FormText.vue";
import { useForm } from "vee-validate";

export default {
  name: "signup",
  components: {
    FormText,
    FormCheckbox,
    FormSelect,
    Terms,
  },
  setup(props) {
    const consented = vueRef(false);
    const updateConsent = value => {
      consented.value = value;
    };
    const firebaseErrors = reactive({
      show: false,
      message: null,
    });
    const dbRef = ref(getDatabase());
    const router = useRouter();

    const { handleSubmit, setFieldError } = useForm();
    const insertUser = (values, uid) => {
      const additionalUserData = omit(values, ["password", "email"]);
      return set(ref(getDatabase(), "users/" + uid), {
        ...additionalUserData,
        level: 0,
        admin: false,
        cumulativeScore: 0,
        bestScore: 0,
        taken_tutorial: false,
        consent: consented.value,
        consentedOn: new Date(),
      });
    };
    const insertUsername = (username, uid) => {
      return set(ref(getDatabase(), "usernames/" + username), uid);
    };
    const createAccount = async values => {
      const auth = getAuth();
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        await updateProfile(userCredential.user, {
          displayName: values.username,
        });
        await insertUser(values, userCredential.user.uid);
        await insertUsername(values.username, userCredential.user.uid);
        if (props.config.tutorial.needsTutorial) {
          router.push({
            name: "Tutorial",
          });
        } else {
          router.push({
            name: "Play",
          });
        }
      } catch (err) {
        firebaseErrors.show = true;
        firebaseErrors.message = err.message;
      }
    };
    const onSubmit = handleSubmit(values => {
      // check for a unique username
      get(child(dbRef, `usernames/${values.username}`))
        .then(snapshot => {
          if (snapshot.exists()) {
            setFieldError(
              "username",
              "Username already exists! Please choose a unique username"
            );
          } else {
            createAccount(values);
          }
        })
        .catch(err => {
          firebaseErrors.show = true;
          firebaseErrors.message = err.message;
        });
    });
    return { updateConsent, consented, onSubmit, firebaseErrors };
  },

  data() {
    return {
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
     * Open the consent form modal.
     */
    toggleConsentForm() {
      this.showConsentForm = !this.showConsentForm;
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
