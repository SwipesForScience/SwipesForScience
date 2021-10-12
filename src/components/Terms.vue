<template name="terms">
  <div class="terms__overlay">
    <div if="terms" class="frame frame--landing">
      <button class="btn-close--landing" @click="closeConsentForm">
        <svg
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          fill-rule="evenodd"
          clip-rule="evenodd"
        >
          <path
            d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z"
          />
        </svg>
      </button>
      <h1 class="mb-3">Consent form</h1>
      <p>To play this game, you must agree to the Data Use Agreement below.</p>
      <div class="terms-content mt-2">
        <ul>
          <li>
            1. By signing up for the Swipes for Science application, you agree
            that you have been given explicit permission to participate in the
            quality assessment process by your supervisor, home institution, or
            other principal entity.
          </li>
          <li>
            2. Data being used within this application is for the explicit
            purpose of quality assessment as defined by the training criteria
            within the application.
          </li>
          <li>
            3. Data within this application have been stripped of all
            identifiable information and will not be used in an attempt to
            establish individual identities from the study.
          </li>
        </ul>
      </div>
      <div class="terms__consented-checkbox mt-2">
        <input
          type="checkbox"
          id="consented"
          :checked="consented"
          @change="
            () => {
              updateConsent(!consented);
            }
          "
        />
        <label for="consented"
          >I have read and I consent to take part in this research.</label
        >
      </div>
      <button
        :disabled="false"
        class="btn--landing-primary btn-full-size mt-3"
        @click="agreeAndCloseConsent"
      >
        I consent to take part in this research
      </button>
      <button
        :disabled="false"
        class="btn--landing-hollow btn-full-size mt-4"
        @click="closeConsentForm"
      >
        Go back
      </button>
    </div>
  </div>
</template>

<script>
/**
 * **TODO**: This should be a researcher's consent form. It should come from a
 * a URL to a markdown file described in the `config` from the parent component.
 */
export default {
  name: "terms",
  props: {
    consented: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    updateConsent(value) {
      this.$emit("updateConsent", value);
    },
    closeConsentForm() {
      this.$emit("toggleConsentForm");
    },
    agreeAndCloseConsent() {
      this.$emit("updateConsent", true);
      this.closeConsentForm();
    },
  },
};
</script>

<style lang="scss" scoped>
.terms__overlay {
  @include z-index("screen-overlay");
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: $landing-overlay;
}
.btn-close--landing {
  position: absolute;
  right: space(3);
  top: space(2);
}
.terms-content {
  @include font-size("xs");
  color: $landing-font-dark;
  border: 1px solid $landing-border-neutral;
  border-radius: $border-radius-xs;
  flex-grow: 1;
  overflow-y: scroll;
  padding: space(3) space(2);
  background: $landing-hollow-fill;
}
.terms__consented-checkbox {
  display: flex;
  label {
    @include font-size("xs");
    color: $landing-font-dark;
    margin-top: -5px;
    margin-left: space(1);
    user-select: none;
  }
}
</style>
