<template>
  <div class="formselect">
    <label :for="name">{{ label }}</label>
    <div class="select__wrapper">
      <i
        class="fa fa-chevron-down select--native__chevron"
        v-bind:class="{
          'select--upsidedown__chevron': showDropdown,
        }"
      ></i>
      <!-- Native Select that appears only on devices that do not support hover-->
      <select
        class="select--native"
        v-model="inputValue"
        tabindex="0"
        v-bind:class="{
          'formselect__input--warning': errorMessage,
        }"
      >
        <option disabled :value="undefined">Select an option</option>
        <option v-for="option in options" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
      <span class="formselect__warning">{{ errorMessage }}</span>
      <!-- Custom Select that appears only on devices that support hover -->
      <div class="select--custom__container">
        <div
          class="select--custom"
          aria-hidden="true"
          @click="toggleDropdown"
          @keyup.enter="toggleDropdown"
          tabindex="0"
          v-bind:class="{
            'formselect__input--warning': errorMessage,
          }"
        >
          <span>{{ inputValue || "Select an option" }}</span>
          <i
            class="fa fa-chevron-down"
            v-bind:class="{
              'select--upsidedown__chevron': showDropdown,
            }"
          ></i>
        </div>
        <transition
          @before-enter="beforeListEnter"
          @enter="listEnter"
          @leave="listLeave"
        >
          <ul appear class="select--custom__options" v-if="showDropdown">
            <li
              class="select--custom__option"
              v-for="(option, index) in options"
              :key="option"
              @keyup.enter="selectOption(option)"
              @blur="handleBlur"
              @click="selectOption(option)"
              :data-index="index"
              tabindex="0"
              v-bind:class="{
                'select--custom__option--selected': inputValue === option,
              }"
            >
              {{ option }}
            </li>
          </ul>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import gsap from "gsap";
import { useField } from "vee-validate";

export default {
  name: "FormSelect",

  setup(props) {
    const {
      value: inputValue,
      errorMessage,
      handleBlur,
      handleChange,
      meta,
    } = useField(props.name, props.rules, {
      initialValue: props.value,
    });
    return {
      handleChange,
      handleBlur,
      errorMessage,
      inputValue,
      meta,
    };
  },
  data: () => {
    return {
      selected: "",
      showDropdown: false,
    };
  },
  props: {
    name: { type: String, required: false },
    rules: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    label: { type: String, required: true },
    options: { type: Array, required: true },
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
      this.handleBlur();
    },
    selectOption(option) {
      this.handleChange(option);
      this.showDropdown = false;
    },
    // staggered transitions for select menu items
    beforeListEnter(el) {
      el.style.opacity = 0;
      el.style.transform = "translateY(-20px)";
    },
    listEnter(el, done) {
      gsap.to(el, {
        opacity: 1,
        duration: 0.3,
        y: 0,
        ease: "power4.out",
        onComplete: done,
      });
    },
    listLeave(el, done) {
      gsap.to(el, {
        opacity: 0,
        duration: 0.3,
        y: -20,
        ease: "power4.out",
        onComplete: done,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.formselect {
  position: relative;
  margin-bottom: space(3);
}
.formselect__warning {
  position: absolute;
  @include font-size("xxs");
  color: $landing-warning;
  top: 2.8rem;
  width: 100%;
  left: 0;
}
.select__wrapper {
  position: relative;
  height: 2.5rem;
  width: 100%;
  @media (hover: hover) {
    &:before {
      display: none;
    }
  }
}

.select--native__chevron {
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
  color: $landing-font-dark;
  z-index: 1;
  @media (hover: hover) {
    display: none;
  }
}
select {
  appearance: none;
  width: 100%;
  height: 2.5rem;
  background: $landing-hollow-fill;
  border: none;
  transition: all 0.3s ease-in;
  position: relative;
  &:focus {
    outline: none;
    border: 1px solid $landing-primary;
  }
}
.select--native {
  position: relative;
  display: block;
  padding: 0 space(2);
  border-radius: $border-radius-sm;
  @media (hover: hover) {
    display: none;
    &:focus + .select--custom {
      display: none;
    }
  }
}
.fa-chevron-down {
  transition: transform 0.1s ease-out;
}
.select--upsidedown__chevron {
  transform: rotate(180deg);
}

.select--custom__container {
  position: relative;
}
.select--custom {
  user-select: none;

  border: none;
  margin-bottom: space(3);
  padding: 0.75rem space(2);
  height: 2.5rem;
  width: 100%;
  background: $landing-hollow-fill;
  border-radius: $border-radius-md;
  width: 100%;
  height: 2.5rem;
  position: absolute;
  top: 0;
  left: 0;
  display: none;
  color: $landing-font-dark;
  &:focus {
    outline: none;
    border: 1px solid $landing-warning;
  }
  @media (hover: hover) {
    display: flex;
    justify-content: space-between;
  }
  &__options {
    @include z-index("above-base");
    height: calc(2.5rem * 5);
    overflow-y: scroll;
    cursor: pointer;
    background: $landing-hollow-fill;
    color: $landing-font-dark;
    position: absolute;
    @include font-size("s");
    top: 3rem;
    left: 0;
    padding: space(1);
    border-radius: $border-radius-sm;
    width: 100%;
    display: none;
    @media (hover: hover) {
      display: block;
    }
  }
  &__option {
    padding: space(1);
    transition: all 0.1s ease-in;
    margin-bottom: space(1);
    &:hover,
    &:focus,
    &--selected {
      outline: none;
      background: $landing-bg-color;
      color: $plum;
      border-radius: $border-radius-xs;
    }
  }
}
.formselect__input--warning {
  border: 1px solid $landing-warning;
}
</style>
