<template>
  <div class="frame frame--game tutorial">
    <h1 class="heading">Tutorial</h1>
    <IntroductionSlides
      :slides="config.tutorial.introduction.slides"
      v-if="currentStep === 0"
      @nextStep="nextStep"
    />
    <div v-if="currentStep === 1">
      <h2 class="subheading">{{ config.tutorial.right.title }}</h2>
      <p>{{ config.tutorial.right.text }}</p>
      <WordSwipeTrial
        :sampleWord="config.tutorial.right.rightCard.text"
        :value="1"
        @nextStep="nextStep"
      />
    </div>
    <div v-if="currentStep === 2">
      <h2 class="subheading">{{ config.tutorial.left.title }}</h2>
      <p>{{ config.tutorial.left.text }}</p>
      <WordSwipeTrial
        :sampleWord="config.tutorial.left.leftCard.text"
        :value="0"
        @nextStep="nextStep"
      />
    </div>
    <div v-if="currentStep === 3">
      <h2 class="subheading">{{ config.tutorial.summary.title }}</h2>
      <p>{{ config.tutorial.summary.text }}</p>
      <button class="btn-game--primary-solid btn-full-size">Play</button>
    </div>
    <ul class="dots">
      <div>
        <li class="dot"></li>
        <li class="dot"></li>
        <li class="dot"></li>
        <li class="dot"></li>
      </div>
    </ul>
  </div>
</template>

<script>
import { ref as vueRef } from "vue";
import IntroductionSlides from "@/components/Tutorial/IntroductionSlides.vue";
import WordSwipeTrial from "@/components/Tutorial/WordSwipe/WordSwipeTrial.vue";
export default {
  name: "Tutorial",
  components: { IntroductionSlides, WordSwipeTrial },
  props: {
    /**
     * The config object that is loaded from src/config.js.
     * It defines how the app is configured, including
     * any content that needs to be displayed (app title, images, etc)
     * and also the type of widget and where to update pointers to data
     */
    config: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const currentStep = vueRef(1);
    const highestStepPassed = vueRef(1);
    const updateHighestStepPassed = stepNumber => {
      if (stepNumber > highestStepPassed.value)
        highestStepPassed.value = stepNumber;
    };
    const updateCurrentStep = stepNumber => {
      if (stepNumber <= highestStepPassed.value) {
        currentStep.value = stepNumber;
      }
    };
    const nextStep = () => {
      highestStepPassed.value = currentStep.value + 1;
      updateCurrentStep(currentStep.value + 1);
    };
    return {
      currentStep,
      highestStepPassed,
      updateHighestStepPassed,
      updateCurrentStep,
      nextStep,
    };
  },
};
</script>

<style lang="scss" scoped>
.tutorial {
  display: grid;
  grid-template-rows: auto 1fr auto;
}
p {
  margin-bottom: space(3);
  white-space: pre-wrap;
  line-height: 1.625rem;
}

.dots {
  display: flex;
  justify-content: space-around;
  padding-top: space(2);
}
.dot {
  display: inline-block;
  width: 0.6rem;
  height: 0.6rem;
  margin: 0 0.5rem;
  background: $carousel-dots-inactive;
  border-radius: 50%;
  cursor: pointer;
}
</style>
