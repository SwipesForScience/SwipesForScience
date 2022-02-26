<template>
  <div>
    <h2 class="subheading">{{ title }}</h2>
    <p class="tutorial-instructions">{{ text }}</p>
    <div class="tutorial-card">
      <div class="word-card">
        {{ sampleId }}
      </div>
      <SwipeAnimation
        :class="{
          'swipe--left': value === 0,
        }"
      />
    </div>
    <button
      class="btn-game-transparent btn-full-size"
      @click="$emit('nextStep')"
    >
      {{ BUTTON_TEXT[value] }}
    </button>
  </div>
</template>

<script>
import SwipeAnimation from "./SwipeAnimation.vue";

const BUTTON_TEXT = ["Moving on!", "Got it, next!"];

export default {
  name: "TutorialCard",
  components: { SwipeAnimation },
  emits: ["nextStep"],
  props: {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    sampleId: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  setup() {
    return { BUTTON_TEXT };
  },
};
</script>

<style lang="scss" scoped>
.tutorial-card {
  display: flex;
  height: 10rem;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: space(3);
}
.word-card {
  @include font-size("lg");
  font-weight: $semibold;
  background: $game-primary-gradient;
  border-radius: $border-radius-sm;
  height: 10rem;
  width: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  user-select: none;
}
svg {
  @include z-index("above-base");
  width: 6rem;
  position: absolute;
  top: 0.8rem;
  right: 1rem;
}
svg.swipe--left {
  transform: scaleX(-1);
  left: 1rem;
}
</style>
