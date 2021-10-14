<template>
  <ValidationProvider
    :vid="vid"
    mode="eager"
    v-slot="v"
    :rules="rules"
    class="formtext"
    tag="div"
  >
    <label :for="vid">{{ label }}</label>
    <input
      :value="value"
      @input="$emit('input', $event.target.value)"
      :type="type"
      :placeholder="placeholder"
      class="formtext__input"
      v-bind:class="{
        'formtext__input--warning': v.errors[0],
      }"
    />
    <span class="formtext__warning-text">{{ v.errors[0] }}</span>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from "vee-validate";
export default {
  components: { ValidationProvider },
  props: {
    vid: { type: String, required: true },
    value: { required: true },
    required: {
      true: Boolean,
      default: false,
    },
    label: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    rules: {
      type: String,
      default: "",
    },
  },
  mounted() {},
  methods: {
    update(value) {
      this.$emit("update:modelValue", value);
    },
  },
  uuid: {
    type: String,
  },
};
</script>

<style lang="scss" scoped>
.formtext {
  position: relative;
  margin-bottom: space(3);
}
.formtext__input {
  width: 100%;
  height: 2.5rem;
  border: none;
  border-radius: $border-radius-md;
  padding: space(2);
  background: $landing-hollow-fill;
  transition: all 0.3s ease-in;
  &::placeholder {
    @include font-size("s");
    color: $landing-font-dark;
    font-family: $primary-font;
  }
  &:focus {
    outline: none;
    border: 1px solid $landing-primary;
  }
}
.formtext__input--warning {
  border: 1px solid $landing-warning;
}

.formtext__warning-text {
  @include font-size("xxs");
  color: $landing-warning;
  width: 100%;
  position: absolute;
  top: 4.9rem;
  left: 0;
}
</style>
