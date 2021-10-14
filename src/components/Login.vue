<template name="login">
  <div class="frame frame--landing">
    <h1 class="mb-2">Login</h1>
    <b-alert :show="errors.show" variant="danger">{{ errors.message }}</b-alert>
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
          label="Password"
          placeholder="Password"
          vid="password"
          v-model="form.password"
          rules="required"
          type="password"
        />
        <button class="btn--landing-primary btn-full-size">Login</button>
      </form>
    </ValidationObserver>

    <p class="mt-4">
      Haven’t played before?
      <router-link :to="{ name: 'SignUp', query: routerQuery }"
        >Create an account to play</router-link
      >
    </p>
  </div>
</template>
<style lang="scss" scoped></style>
<script>
import { ValidationObserver, extend } from "vee-validate";
import { required, email } from "vee-validate/dist/rules";
import FormText from "./Form/FormText.vue";

extend("email", { ...email, message: "Please enter a valid email" });
extend("required", {
  ...required,
  message: "This field is required",
});
/**
 * The login component for the `/login` route.
 */
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export default {
  name: "login",
  props: {
    routerQuery: {
      type: Object,
    },
  },
  components: {
    ValidationObserver,
    FormText,
  },
  data() {
    return {
      /**
       * Elements for the form, with an email and password field.
       */
      form: {
        email: null,
        password: null,
      },
      /**
       * Variable to store errors and their messages.
       */
      errors: {
        show: false,
        message: null,
      },
    };
  },
  methods: {
    /**
     * When the user hits submit, we log in with firebase.
     * If its succesful, route the user to the `/play` route.
     * If there is an error, show the message.
     */
    onSubmit() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.form.email, this.form.password)
        .then((user) => {
          this.$emit("login", user);
          this.$router.push({ name: "Play", query: this.routerQuery });
        })
        .catch((err) => {
          this.errors.show = true;
          this.errors.message = err.message;
        });
    },
  },
};
</script>
