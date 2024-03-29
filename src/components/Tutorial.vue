<template>
  <div class="frame frame--game tutorial">
    <div v-if="userData.taken_tutorial">
      <router-link :to="{ name: 'Play' }">
        <button class="btn-game-transparent btn--game-back">
          <i class="fa fa-chevron-left" aria-hidden="true"></i> Back to gameplay
        </button>
      </router-link>
    </div>
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
        :card="config.tutorial.right.card"
        :value="1"
        :widgetType="config.widgetType"
        @nextStep="nextStep"
      />
    </div>
    <div v-if="currentStep === 2">
      <TutorialCard
        :title="config.tutorial.left.title"
        :text="config.tutorial.left.text"
        :card="config.tutorial.left.card"
        :value="0"
        :widgetType="config.widgetType"
        @nextStep="nextStep"
      />
    </div>
    <div v-if="currentStep === 3">
      <WordSwipeTraining
        v-if="config.widgetType === 'WordSwipe'"
        :title="config.tutorial.training.title"
        :text="config.tutorial.training.text"
        :trainingCards="config.tutorial.training.trainingCards"
        :config="config"
        @nextStep="nextStep"
        @trainingCompleted="trainingCompleted"
      />
      <ImageSwipeTraining
        v-if="config.widgetType === 'ImageSwipe'"
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
      <p class="tutorial-instructions mb-3">
        {{ config.tutorial.summary.text }}
      </p>
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
import { ref as vueRef, watchEffect } from "vue";
import useCurrentUser from "@/composables/gameplay/useCurrentUser";
import IntroductionSlides from "@/components/Tutorial/IntroductionSlides.vue";
import TutorialCard from "@/components/Tutorial/TutorialCard.vue";
import WordSwipeTraining from "@/components/Tutorial/WordSwipe/WordSwipeTraining.vue";
import ImageSwipeTraining from "@/components/Tutorial/ImageSwipe/ImageSwipeTraining.vue";
export default {
  name: "Tutorial",
  components: {
    IntroductionSlides,
    WordSwipeTraining,
    ImageSwipeTraining,
    TutorialCard,
  },
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
    const highestStep = 4;
    const highestStepPassed = vueRef(
      props.userData.taken_tutorial ? highestStep : 0
    );

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
    watchEffect(() => {
      highestStepPassed.value = props.userData.taken_tutorial ? highestStep : 0;
    });

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

<style lang="scss" scoped>
.btn--game-back {
  padding-left: 0;
  @include media("≥tablet") {
    padding: 0;
  }
}
.tutorial {
  display: grid;
  grid-template-rows: auto auto 1fr auto;
}

p.tutorial-instructions {
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
