<template>
  <div>
    <h2 class="subheading">{{ title }}</h2>
    <p class="tutorial-instructions mb-3">{{ text }}</p>
    <div class="tutorial-card mb-3">
      <WordTutorialCard
        :sampleId="card.sampleId"
        v-if="widgetType === 'WordSwipe'"
      />
      <ImageTutorialCard
        v-if="widgetType === 'ImageSwipe'"
        :imageUrl="card.img.url"
      />
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
import WordTutorialCard from "./WordSwipe/TutorialCard.vue";
import ImageTutorialCard from "./ImageSwipe/TutorialCard.vue";
const BUTTON_TEXT = ["Moving on!", "Got it, next!"];

export default {
  name: "TutorialCard",
  components: { SwipeAnimation, ImageTutorialCard, WordTutorialCard },
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
    card: {
      type: Object,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    widgetType: {
      type: String,
      required: true,
    },
  },
  setup() {
    const removeTopCard = () => {};
    return { BUTTON_TEXT, removeTopCard };
  },
};
</script>

<style lang="scss" scoped>
.tutorial-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
