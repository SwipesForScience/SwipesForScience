<template>
  <div class="wordswipe" v-if="currentGame.currentSampleIndex >= 0">
    <WidgetHeader
      :currentScore="currentGame.score"
      :totalSamples="currentGame.sampleIds.length"
      :currentSampleIndex="currentGame.currentSampleIndex"
    />

    <div class="wordswipe__cards">
      <Card
        v-for="(sampleId, index) in displayedSamples"
        :key="sampleId"
        :isCurrent="index === 0"
        :isNext="index === 1"
        :sampleId="sampleId"
        @removeTopCard="submitResponse"
      />
    </div>

    <div class="wordswipe__instructions">
      <div class="wordswipe__question">{{ config?.play?.question }}</div>
      <p>{{ config?.play?.swipeRightLabel }}</p>
      <p>{{ config?.play?.swipeLeftLabel }}</p>
    </div>
    <router-link to="/profile"
      ><button class="btn-game-transparent btn-full-size">
        View your profile
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
    const evaluateVote = async response => {
      if (props.allSamples[currentSampleId.value].actualValue === response)
        return 1;
      return 0;
    };
    return { submitResponse, evaluateVote, currentSampleId };
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
