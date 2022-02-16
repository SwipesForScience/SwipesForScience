<template>
  <div class="imageswipe">
    <WidgetHeader
      :currentScore="currentGame.score"
      :totalSamples="currentGame.sampleIds.length"
      :currentSampleIndex="currentGame.currentSampleIndex"
    />
    <div class="imageswipe__cards">
      <Card
        v-for="(sampleId, index) in displayedSamples"
        :key="sampleId"
        :isCurrent="index === 0"
        :isNext="index === 1"
        :sampleId="sampleId"
        @removeTopCard="submitResponse"
        :baseUrlTemplate="config.sampleUrlTemplate"
      />
    </div>
    <div class="imageswipe__instructions">
      <div class="imageswipe__question">{{ config?.play?.question }}</div>
      <p>{{ config?.play?.swipeRightLabel }}</p>
      <p>{{ config?.play?.swipeLeftLabel }}</p>
    </div>
    <router-link to="/tutorial"
      ><button class="btn-game-transparent btn-full-size">
        View Tutorial
      </button></router-link
    >
  </div>
</template>

<script>
import Card from "./Card";
import WidgetHeader from "@/components/Widgets/WidgetHeader";
import { computed, onMounted, onUnmounted } from "vue";

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
    const handleKeyDown = e => {
      if (e.key === "ArrowRight") {
        submitResponse({ response: 1, duration: 100 });
      } else if (e.key === "ArrowLeft") {
        submitResponse({ response: 0, duration: 100 });
      }
    };
    onMounted(() => {
      window.addEventListener("keydown", handleKeyDown);
    });
    onUnmounted(() => {
      window.removeEventListener("keydown", handleKeyDown);
    });
    const submitResponse = async ({ response, duration }) => {
      const pointsEarned = await evaluateVote(response);
      context.emit("submitVote", {
        response,
        duration,
        pointsEarned,
        sampleId: currentSampleId.value,
      });
    };
    const currentSampleId = computed(() => {
      return props.displayedSamples[0];
    });
    const evaluateVote = response => {
      if (props.allSamples[currentSampleId.value].actualValue === response)
        return 1;
      return 0;
    };
    return { submitResponse, evaluateVote, currentSampleId };
  },
};
</script>

<style lang="scss" scoped>
.imageswipe {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.imageswipe__cards {
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 100%;
}
.imageswipe__question {
  font-weight: $bold;
  margin-bottom: space(2);
}
.imageswipe__instructions {
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
</style>
