<template>
  <!-- This is a dummy Widget Template -->
  <div class="widgetSecret">
    <p class="text-right">
      <small>
        <b-button size="sm" variant="default" @click="resetSecret">reset secret</b-button>
      </small>
    </p>
    <div v-if="(!passesSecret && needsSecret) || reset" id="signupForm" class="mx-auto">
      <div v-if="userSettings.secret">
        <b-alert variant="danger" show>
          Oh no! You didn't enter the right secret! Try again.
        </b-alert>
      </div>
      <p class="lead mb-3 pb-3 mt-3 pt-3">
        <b-form @submit="onSubmit">
          <b-form-group id="secretInputGroup"
                        label="Secret:"
                        label-for="secret"
                        >
            <b-form-input id="secret"
                          type="text"
                          v-model="form.secret"
                          required
                          placeholder="Enter Secret">
            </b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary" @click="onSubmit">Submit</b-button>
        </b-form>
      </p>
    </div>
    <div v-else>
      <slot></slot>
    </div>

  </div>
</template>

<script>
/**
 * This is a dummy widget template, for widget developers to use as a base to start
 * developing a new annotation widget.
 */
  export default {
    name: 'SecretWidget',
    props: {
      userSettings: {
        type: Object,
        required: true,
      },
      /**
       * whether or not the widget needs a secret
       */
      needsSecret: {
        type: Boolean,
        required: false,
        default: false,
      },
      /**
       * the server secret to compare (btoa'd)
       */
      serverSecret: {
        type: String,
        required: false,
      },
    },
    data() {
      return {
        form: {
          secret: null,
        },
        reset: false,
      };
    },
    computed: {
      passesSecret() {
        if (this.needsSecret && this.userSettings.secret) {
          // if there isn't a server secret, at least make sure the user has some
          // sort of non-null secret.
          if (!this.serverSecret) {
            if (this.userSettings.secret) {
              return true;
            }
          } else if (btoa(this.userSettings.secret) === this.serverSecret) {
            return true;
          }
          return false;
        }
        if (!this.needsSecret) {
          return true;
        }
        return false;
      },
    },
    methods: {
      onSubmit(e) {
        // console.log('submitting secret');
        e.preventDefault();
        this.reset = false;
        const currentUserSettings = { ...this.userSettings };
        currentUserSettings.secret = this.form.secret;
        this.$emit('updateUserSettings', currentUserSettings);
      },
      resetSecret() {
        this.reset = true;
      },
    },
  };
</script>

<style>

</style>
