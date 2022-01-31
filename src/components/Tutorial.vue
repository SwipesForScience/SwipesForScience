<template>
  <div class="frame frame--game tutorial">
    <h1 class="heading">Tutorial</h1>
    <IntroductionSlides
      :slides="config.tutorial.introduction.slides"
      v-if="currentStep === 0"
      @nextStep="nextStep"
    />
    <div v-if="currentStep === 1">
      <TutorialCard
        :title="config.tutorial.right.title"
        :text="config.tutorial.right.text"
        :sampleId="config.tutorial.right.card.sampleId"
        :value="1"
        @nextStep="nextStep"
      />
    </div>
    <div v-if="currentStep === 2">
      <TutorialCard
        :title="config.tutorial.left.title"
        :text="config.tutorial.left.text"
        :sampleId="config.tutorial.left.card.sampleId"
        :value="0"
        @nextStep="nextStep"
      />
    </div>
    <div v-if="currentStep === 3">
      <WordSwipeTraining
        :title="config.tutorial.training.title"
        :text="config.tutorial.training.text"
        :trainingCards="config.tutorial.training.trainingCards"
        :config="config"
        @nextStep="nextStep"
        @trainingCompleted="trainingCompleted"
      />
    </div>
    <div v-if="currentStep === 4">
      <h2 class="subheading">{{ config.tutorial.summary.title }}</h2>
      <p class="tutorial-instructions">{{ config.tutorial.summary.text }}</p>
      <router-link to="/play"
        ><button class="btn-game--primary-solid btn-full-size">
          Let's play
        </button></router-link
      >
    </div>
    <div class="tutorial-step-dots">
      <ul>
        <li
          class="dot"
          v-for="index in [...Array(5).keys()]"
          :key="`tutorial-dot-${index}`"
          @click="updateCurrentStep(index)"
          :class="{
            'dot--active': currentStep === index,
            'dot--disabled': index > highestStepPassed,
          }"
        ></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref as vueRef } from "vue";
import useCurrentUser from "@/composables/gameplay/useCurrentUser";
import IntroductionSlides from "@/components/Tutorial/IntroductionSlides.vue";
import TutorialCard from "@/components/Tutorial/WordSwipe/TutorialCard.vue";
import WordSwipeTraining from "@/components/Tutorial/WordSwipe/WordSwipeTraining.vue";
export default {
  name: "Tutorial",
  components: { IntroductionSlides, WordSwipeTraining, TutorialCard },
  props: {
    config: {
      type: Object,
      required: true,
    },
    currentUser: {
      type: Object,
      required: true,
    },
    userData: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { updateTutorialStatus } = useCurrentUser();
    const currentStep = vueRef(0);
    const highestStepPassed = vueRef(0);
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
    const trainingCompleted = () => {
      if (!props.userData.taken_tutorial) {
        updateTutorialStatus(props.currentUser.uid);
      }
    };
    return {
      currentStep,
      highestStepPassed,
      updateHighestStepPassed,
      updateCurrentStep,
      nextStep,
      trainingCompleted,
    };
  },
};
</script>

<style lang="scss">
.tutorial {
  display: grid;
  grid-template-rows: auto 1fr auto;
}
p.tutorial-instructions {
  margin-bottom: space(3);
  white-space: pre-wrap;
  line-height: 1.625rem;
}

.tutorial-step-dots {
  display: flex;
  justify-content: space-around;
  padding-top: space(2);
  .dot {
    cursor: pointer;
    display: inline-block;
    width: 10px;
    height: 10px;
    margin: 0 10px;
    background: $carousel-dots-inactive;
    border-radius: 60%;
    &--active {
      background: $carousel-dots-active;
    }
    &--disabled {
      opacity: 0.3;
    }
  }
}
</style>
