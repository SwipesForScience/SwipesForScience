<template>
  <div class="wordswipe-training">
    <h2 class="subheading">{{ title }}</h2>
    <div v-if="displayedSamples.length > 0">
      <p class="tutorial-instructions">{{ text }}</p>
      <div class="card-container">
        <Card
          v-for="({ sampleId }, index) in displayedSamples"
          :key="sampleId"
          :sampleId="sampleId"
          :isCurrent="index === 0"
          :isNext="index === 1"
          @removeTopCard="removeTopCard"
        />
      </div>
      <div class="wordswipe__instructions">
        <p>{{ config?.play?.swipeRightLabel }}</p>
        <p>{{ config?.play?.swipeLeftLabel }}</p>
      </div>
    </div>
    <div v-else>
      <div v-if="currentScore === trainingCards.length">
        <h3>Well done! You passed!</h3>
        <button @click="next" class="btn-game--primary-solid btn-full-size">
          Next
        </button>
      </div>
      <div v-else>
        <h3>You scored {{ currentScore }} / {{ trainingCards.length }}</h3>
        <button
          @click="resetDeck"
          class="btn-game--primary-solid btn-full-size"
        >
          Try again?
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Widgets/WordSwipe/Card.vue";

import { ref as vueRef, reactive, onMounted, onUnmounted } from "vue";

export default {
  name: "WordSwipeTraining",
  components: { Card },
  props: {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    config: {
      type: Object,
      required: true,
    },
    trainingCards: {
      type: Object,
      required: true,
    },
  },
  emits: ["nextStep", "trainingCompleted"],
  setup(props, context) {
    const handleKeyDown = e => {
      if (e.key === "ArrowRight") {
        removeTopCard({ response: 1 });
      } else if (e.key === "ArrowLeft") {
        removeTopCard({ response: 0 });
      }
    };
    onMounted(() => {
      window.addEventListener("keydown", handleKeyDown);
    });
    onUnmounted(() => {
      window.removeEventListener("keydown", handleKeyDown);
    });
    const currentScore = vueRef(0);
    const answerKey = new Map();
    props.trainingCards.forEach(({ sampleId, value }) => {
      answerKey.set(sampleId, value);
    });
    const displayedSamples = reactive([...props.trainingCards]);
    const removeTopCard = ({ response }) => {
      if (response === displayedSamples[0].value) {
        currentScore.value++;
      }
      displayedSamples.shift();
    };
    const resetDeck = () => {
      displayedSamples.push(...props.trainingCards);
      currentScore.value = 0;
    };
    const next = () => {
      context.emit("trainingCompleted");
      context.emit("nextStep");
    };
    return {
      displayedSamples,
      removeTopCard,
      currentScore,
      resetDeck,
      next,
    };
  },
};
</script>

<style scoped lang="scss">
h3 {
  @include font-size("sm");
  text-align: center;
  font-weight: $semibold;
  margin-bottom: space(3);
}
.wordswipe-training {
  height: 100%;
}
.card-container {
  display: flex;
  height: 10rem;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .word-card {
    height: inherit;
    width: 300px;
  }
}

.wordswipe__instructions {
  @include font-size("sm");
  font-family: $primary-font;
  font-weight: $semibold;
  text-align: center;
  grid-column: 2 / span 1;
  margin-top: space(6);
  p {
    @include font-size("s");
    color: $landing-font-dark;
  }
  @include media("≥tablet") {
    @include font-size("md");
  }
}
svg {
  z-index: 5;
  width: 100px;
  position: absolute;
  top: 10px;
  right: 30px;
}
</style>
