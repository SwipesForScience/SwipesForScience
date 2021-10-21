<template>
  <div class="frame frame--landing">
    <h1 class="mb-2">Reset Password</h1>
    <div
      class="alert-card--landing alert-card--landing--error mt-1 mb-3"
      v-if="firebaseErrors.show"
    >
      {{ firebaseErrors.message }}
    </div>
    <p v-if="emailSent">
      Email has been sent! Please check your inbox for the reset password link.
    </p>

    <p class="mb-3">
      Enter the email associated with your account and we'll send an email with
      instructions to reset your password.
    </p>
    <form @submit.prevent="onSubmit" class="form--landing">
      <FormText
        name="email"
        type="email"
        rules="required|email"
        placeholder="Your email"
      />
      <button class="btn--landing-primary btn-full-size">
        Send Reset Link
      </button>
    </form>
    <router-link :to="{ name: 'Login' }">
      <button :disabled="false" class="btn--landing-hollow btn-full-size mt-4">
        Go back
      </button></router-link
    >
  </div>
</template>

<script>
import { reactive, ref as vueRef } from "vue";
import { useForm } from "vee-validate";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import FormText from "./Form/FormText.vue";

export default {
  name: "ResetPassword",
  components: {
    FormText,
  },
  setup() {
    const auth = getAuth();
    const firebaseErrors = reactive({
      show: false,
      message: null,
    });
    const { handleSubmit } = useForm();
    const emailSent = vueRef(false);
    const onSubmit = handleSubmit(values => {
      sendPasswordResetEmail(auth, values.email)
        .then(() => {
          firebaseErrors.show = false;
          emailSent.value = true;
        })
        .catch(err => {
          firebaseErrors.show = true;
          firebaseErrors.message = err.message;
        });
    });
    return { onSubmit, firebaseErrors, emailSent };
  },
};
</script>
