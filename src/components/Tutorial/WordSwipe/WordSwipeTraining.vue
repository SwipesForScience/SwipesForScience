<template>
  <div class="wordswipe-training">
    <h2 class="subheading">{{ title }}</h2>
    <p class="tutorial-instructions">{{ text }}</p>
    <div v-if="displayedSamples.length > 0">
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
        Congratulations! You passed!
        <button>Next</button>
      </div>
      <div v-else>
        You scored {{ currentScore }} / {{ trainingCards.length }}
        <button @click="resetDeck">Try again</button>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Widgets/WordSwipe/Card.vue";

import { ref as vueRef, reactive } from "vue";

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
  setup(props) {
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
    return {
      displayedSamples,
      removeTopCard,
      currentScore,
      resetDeck,
    };
  },
};
</script>

<style scoped lang="scss">
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
