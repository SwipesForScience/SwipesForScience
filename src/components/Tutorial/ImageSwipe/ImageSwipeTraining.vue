<template>
  <div class="imageswipe-training">
    <h2 class="subheading">{{ title }}</h2>
    <div v-if="displayedSamples.length > 0">
      <p class="tutorial-instructions">{{ text }}</p>
      <div class="card-container">
        <Card
          v-for="(sample, index) in displayedSamples"
          :key="sample.sampleId"
          :isCurrent="index === 0"
          :isNext="index === 1"
          :imageUrl="sample.imageUrl"
          :sampleId="sample.sampleId"
          @removeTopCard="removeTopCard"
          :baseUrlTemplate="config.sampleUrlTemplate"
        />
      </div>
      <div class="imageswipe__instructions">
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
import Card from "@/components/Widgets/ImageSwipe/Card.vue";

import { ref as vueRef, reactive, onMounted, onUnmounted } from "vue";

export default {
  name: "imageswipeTraining",
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
        removeTopCard({ response: -1 });
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
.imageswipe-training {
  height: 100%;
}
.card-container {
  width: 80%;
  margin: auto;
  margin-bottom: calc(80% + space(6));
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .word-card {
    height: inherit;
    width: 300px;
  }
  @include media("≥tablet") {
    width: 60%;
    margin-bottom: calc(60% + space(6));
  }
}

.imageswipe__instructions {
  @include font-size("sm");
  font-family: $primary-font;
  font-weight: $semibold;
  text-align: center;
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
