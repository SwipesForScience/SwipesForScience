<template name="login">
  <div class="frame frame--landing">
    <h1 class="mb-2">Login</h1>
    <div :show="firebaseErrors.show" variant="danger">
      {{ firebaseErrors.message }}
    </div>
    <form @submit.prevent="onSubmit" class="form--landing">
      <FormText
        name="email"
        label="Email"
        type="email"
        rules="required|email"
        placeholder="Your email"
      />
      <FormText
        name="password"
        label="Password"
        type="password"
        placeholder="Password"
        rules="required"
      />

      <button class="btn--landing-primary btn-full-size">Login</button>
    </form>

    <p class="mt-4">
      Haven’t played before?
      <router-link :to="{ name: 'SignUp' }"
        >Create an account to play</router-link
      >
    </p>
  </div>
</template>
<script>
import { useForm } from "vee-validate";
import { useRouter } from "vue-router";
import { reactive } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import FormText from "./Form/FormText.vue";
/**
 * The login component for the `/login` route.
 */
export default {
  name: "login",
  components: {
    FormText,
  },
  props: {
    routerQuery: {
      type: Object,
    },
  },
  setup(props, context) {
    const router = useRouter();
    const firebaseErrors = reactive({
      show: false,
      message: null,
    });
    const { handleSubmit } = useForm();
    const auth = getAuth();
    const onSubmit = handleSubmit(values => {
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then(user => {
          context.emit("login", user);
          router.push({ name: "Play", query: props.routerQuery });
        })
        .catch(err => {
          firebaseErrors.show = true;
          firebaseErrors.message = err.message;
        });
    });

    return {
      firebaseErrors,
      onSubmit,
    };
  },
};
</script>
