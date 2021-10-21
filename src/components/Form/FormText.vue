<template>
  <div class="formtext">
    <label :for="name">{{ label }}</label>
    <input
      :type="type"
      :id="name"
      v-model="inputValue"
      :placeholder="placeholder"
      @blur="handleBlur"
      @change="handleChange"
      v-bind:class="{
        'formtext--warning': errorMessage,
      }"
    />
    <span class="formtext__warning-text">{{ errorMessage }}</span>
  </div>
</template>

<script>
import { useField } from "vee-validate";

export default {
  name: "FormText",
  setup(props) {
    const { value, errorMessage, handleBlur, handleChange, errors } = useField(
      props.name,
      props.rules
    );
    return {
      handleBlur,
      inputValue: value,
      errorMessage,
      handleChange,
      errors,
    };
  },

  props: {
    name: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
      default: "text",
    },
    placeholder: {
      type: String,
      required: false,
    },
    rules: {
      required: false,
      default: "",
    },
    label: {
      type: String,
      required: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.formtext {
  position: relative;
  margin-bottom: space(3);
}
.formtext input {
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
input.formtext--warning {
  border: 1px solid $landing-warning;
}

.formtext__warning-text {
  @include font-size("xxs");
  color: $landing-warning;
  width: 100%;
  position: absolute;
  bottom: -1rem;
  left: 0;
  &:first-letter {
    text-transform: capitalize;
  }
}
</style>
