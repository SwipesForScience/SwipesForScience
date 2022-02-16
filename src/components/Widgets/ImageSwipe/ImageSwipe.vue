<template>
  <div>
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

<style></style>
