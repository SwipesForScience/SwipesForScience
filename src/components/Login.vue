<template name="login">
  <div id="login">
    <h1> Log In </h1>

    <div id="signupForm" class="container fluid">
      <b-alert :show="errors.show" variant="danger">{{errors.message}}</b-alert>
      <b-form @submit="onSubmit">
        <b-form-group id="emailAddressInputGroup"
                      label="Email address:"
                      label-for="emailAddress"
                      >
          <b-form-input id="emailAddress"
                        type="email"
                        v-model="form.email"
                        required
                        placeholder="Enter email">
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


        <b-button type="submit" variant="primary">Submit</b-button>

      </b-form>

      <p class="mt-3">
        Don't have an account? <router-link to="/signup">Create one</router-link>
      </p>
    </div>

  </div>
</template>
<style>
#login {
  min-height: 100vh;
}
</style>
<script>

  import firebase from 'firebase';

  export default {
    name: 'login',
    data() {
      return {
        form: {
          email: null,
          password: null,
        },
        errors: {
          show: false,
          message: null,
        },
      };
    },
    methods: {
      onSubmit(e) {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.form.email, this.form.password).then(
                  (user) => {
                    // console.log('user', user);
                    this.$emit('login', user);
                    this.$router.replace('play');
                  },
                  (err) => {
                    this.errors.show = true;
                    this.errors.message = err.message;
                  },
                );
      },
    },
  };
</script>
