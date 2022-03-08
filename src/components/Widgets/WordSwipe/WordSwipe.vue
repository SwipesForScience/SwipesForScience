<template>
  <div class="wordswipe" v-if="currentGame.currentSampleIndex >= 0">
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
      <div class="wordswipe__question mb-2">
        {{ config?.widgetProperties?.question }}
      </div>
      <p>{{ config?.widgetProperties?.rightSwipe?.label }}</p>
      <p>{{ config?.widgetProperties?.leftSwipe?.label }}</p>
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
import { computed, onMounted, onUnmounted } from "vue";

export default {
  components: { Card },
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
        submitResponse({ response: 1 });
      } else if (e.key === "ArrowLeft") {
        submitResponse({ response: 0 });
      }
    };
    onMounted(() => {
      window.addEventListener("keydown", handleKeyDown);
    });
    onUnmounted(() => {
      window.removeEventListener("keydown", handleKeyDown);
    });
    const submitResponse = async ({ response }) => {
      const pointsEarned = calculatePointsEarned(response);
      context.emit("submitVote", {
        response,
        pointsEarned,
        sampleId: currentSampleId.value,
      });
    };
    const currentSampleId = computed(() => {
      return props.displayedSamples[0];
    });
    const calculatePointsEarned = response => {
      if (props.allSamples[currentSampleId.value].totalSeenCount < 4) {
        return 1;
      }
      if (
        (response === 1 &&
          props.allSamples[currentSampleId.value].averageVote > 0.7) ||
        (response === 0 &&
          props.allSamples[currentSampleId.value].averageVote < 0.3)
      ) {
        return 1;
      }
      return 0;
    };
    return {
      submitResponse,
      calculatePointsEarned,
      currentSampleId,
    };
  },
};
</script>

<style scoped lang="scss">
.wordswipe {
  width: 100%;
  height: calc(100% - 6.75rem);
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
