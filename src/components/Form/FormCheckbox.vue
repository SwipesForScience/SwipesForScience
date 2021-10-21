<template>
  <div class="formcheckbox">
    <input
      type="checkbox"
      :id="name"
      :checked="checked"
      @change="handleChange(true)"
      :rules="rules"
    />
    <label :for="name">{{ placeholder }}</label>
    <span class="formcheckbox__warning-text">{{ errorMessage }}</span>
  </div>
</template>

<script>
import { useField } from "vee-validate";

export default {
  setup(props) {
    const { checked, handleChange, errorMessage, value } = useField(
      props.name,
      props.rules,
      {
        initialValue: false,
        uncheckedValue: false,
        type: "checkbox",
      }
    );

    return {
      checked,
      handleChange,
      errorMessage,
      value,
    };
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    rules: {
      type: String,
      default: "",
    },
    label: { type: String, required: false },
    placeholder: { type: String, required: true },
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
