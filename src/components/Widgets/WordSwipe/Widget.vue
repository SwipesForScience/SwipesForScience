<template>
  <div class="wordswipe">
    <header>
      <div class="wordswipe__counter">
        Sample {{ currentGame.currentSampleIndex + 1 }} of
        {{ currentGame.sampleIds.length }}
      </div>
      <div class="wordswipe__buttons">
        <div class="btn-game-hollow wordswipe__score">
          Score <span>{{ currentGame.score }}</span>
        </div>
        <PauseButton />
      </div>
    </header>
    <div class="wordswipe__cards" v-if="currentGame.currentSampleIndex >= 0">
      <Card
        v-for="sampleId in displayedSamples"
        :isCurrent="
          currentGame.sampleIds.indexOf(sampleId) ===
          currentGame.currentSampleIndex
        "
        :isNext="
          currentGame.sampleIds.indexOf(sampleId) ===
          currentGame.currentSampleIndex + 1
        "
        :sampleId="sampleId"
        :key="sampleId"
        @removeTopCard="submitResponse"
      />
    </div>
    <div v-else>There aren't any cards in the deck</div>
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
import PauseButton from "@/components/Widgets/PauseButton";
import { getDatabase, ref, runTransaction } from "firebase/database";

export default {
  components: { Card, PauseButton },
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
  },
  setup(props, context) {
    const db = getDatabase();
    const submitResponse = async response => {
      await evaluateVote(response);
      context.emit("submitVote", response);
    };
    const evaluateVote = async response => {
      if (props.config.mode === "Assessment") {
        if (
          props.allSamples[props.currentGame.currentSampleIndex].actualValue ===
          response
        ) {
          // update score
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
      // else if data annotation mode
      context.emit("submitVote", response);
    };
    return { submitResponse, evaluateVote };
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
.wordswipe__buttons {
  display: flex;
  justify-content: space-between;
}
.wordswipe__counter {
  @include font-size("xs");
  margin-bottom: space(2);
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  font-weight: $bold;
  text-align: center;
  grid-column: 1 / span 2;
}
.wordswipe__cards {
  display: flex;
  height: 12rem;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.wordswipe__score {
  display: flex;
  font-weight: $bold;
  justify-content: space-between;
  align-items: center;
  min-width: 6rem;
  grid-column: 1 / span 1;
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
