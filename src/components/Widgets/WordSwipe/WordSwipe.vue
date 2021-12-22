<template>
  <div class="wordswipe" v-if="currentGame.currentSampleIndex >= 0">
    <WidgetHeader
      :currentScore="currentGame.score"
      :totalSamples="currentGame.sampleIds.length"
      :currentSampleIndex="currentGame.currentSampleIndex"
    />
    <div class="wordswipe__cards">
      <Card
        v-for="sample in displayedSamples"
        :isCurrent="
          currentGame.sampleIds.indexOf(sample.sampleId) ===
          currentGame.currentSampleIndex
        "
        :isNext="
          currentGame.sampleIds.indexOf(sample.sampleId) ===
          currentGame.currentSampleIndex + 1
        "
        :sample="sample"
        :key="sample.sampleId"
        @removeTopCard="submitResponse"
      />
    </div>

    <div class="wordswipe__instructions">
      <div class="wordswipe__question">{{ config?.play?.question }}</div>
      <p>{{ config?.play?.swipeRightLabel }}</p>
      <p>{{ config?.play?.swipeLeftLabel }}</p>
    </div>
    <div class="wordswipe__contact">Not sure? Ask the researcher</div>
  </div>
</template>

<script>
import Card from "./Card";
import WidgetHeader from "@/components/Widgets/WidgetHeader";
import { computed } from "vue";
import { getDatabase, ref, runTransaction } from "firebase/database";

export default {
  components: { WidgetHeader, Card },
  props: {
    config: {
      type: Object,
    },
    currentGame: {
      type: Object,
      required: true,
    },
    currentGameId: {
      type: String,
      required: true,
    },
    displayedSamples: {
      type: Object,
    },
    allSamples: {
      type: Object,
    },
  },
  setup(props, context) {
    const db = getDatabase();

    const submitResponse = async ({ response, duration }) => {
      await evaluateVote(response);
      context.emit("submitVote", {
        response,
        duration,
        sampleId: currentSample.value.sampleId,
      });
    };
    const currentSample = computed(() => {
      return props.displayedSamples[0];
    });
    const evaluateVote = async response => {
      if (props.config.mode === "Assessment") {
        if (currentSample.value.actualValue === response) {
          await runTransaction(
            ref(db, `games/${props.currentGameId}`),
            currentGame => {
              if (currentGame) {
                currentGame.score++;
              }
              return currentGame;
            }
          );
        }
      }
    };
    return { submitResponse, evaluateVote, currentSample };
  },
};
</script>

<style scoped lang="scss">
.wordswipe {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.wordswipe__cards {
  display: flex;
  height: 12rem;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.wordswipe__question {
  font-weight: $bold;
  margin-bottom: space(2);
}
.wordswipe__instructions {
  @include font-size("sm");
  font-family: $primary-font;
  font-weight: $semibold;
  text-align: center;
  grid-column: 2 / span 1;
  p {
    @include font-size("s");
    color: $landing-font-dark;
  }
  @include media("≥tablet") {
    @include font-size("md");
  }
}
.wordswipe__contact {
  text-align: center;
}
</style>
