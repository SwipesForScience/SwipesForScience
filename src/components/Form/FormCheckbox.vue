<template>
  <ValidationProvider
    :vid="vid"
    mode="eager"
    v-slot="v"
    :rules="rules"
    class="formcheckbox"
    tag="div"
  >
    <input type="checkbox" :id="vid" v-model="checked" />
    <label :for="vid">{{ label }}</label>
    <span class="formcheckbox__warning-text">{{ v.errors[0] }}</span>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from "vee-validate";

export default {
  components: {
    ValidationProvider,
  },
  props: {
    vid: { type: String, required: true },
    rules: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Boolean,
    },
    label: { type: String, required: true },
  },
  computed: {
    checked: {
      get: function () {
        return this.value;
      },
      set: function (newValue) {
        this.$emit("update:checked", newValue);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.formcheckbox {
  margin-bottom: space(1);
  position: relative;
  label {
    cursor: pointer;
    @include font-size("xs");
    color: $landing-font-dark;
    margin-left: space(1);
    user-select: none;
  }
}
.formcheckbox__warning-text {
  width: 100%;
  position: absolute;
  top: 1.5rem;
  left: 0;
  @include font-size("xxs");
  color: $landing-warning;
}
</style>
