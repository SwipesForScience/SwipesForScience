<template>
  <div class="frame frame--game">
    <WordSwipe
      v-if="config.widgetType === 'WordSwipe'"
      :config="config"
      :currentGame="currentGame"
      :currentGameId="currentGameId"
      :allSamples="allSamples"
      :displayedSamples="displayedSamples"
      :displayNextCard="displayNextCard"
      @submitVote="submitVote"
    />
  </div>
</template>

<script>
import useSamples from "@/composables/gameplay/useSamples";
import WordSwipe from "@/components/Widgets/WordSwipe/Widget.vue";
import { getDatabase, ref, runTransaction } from "firebase/database";
import { onMounted, computed, toRaw, reactive } from "vue";

export default {
  components: { WordSwipe },
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
  },
  setup(props) {
    const { allSamples, getAllSamplesByLeastSeen } = useSamples();
    const db = getDatabase();
    onMounted(async () => {
      await getAllSamplesByLeastSeen();
    });
    // const displayedSamples = reactive([]);
    const displayedSamplesOnMounted = props.currentGame.sampleIds
      .slice(
        props.currentGame.currentSampleIndex,
        props.currentGame.currentSampleIndex + 2
      )
      .map(sampleId => {});

    const displayNextCard = () => {
      const currentGameRef = ref(db, `/games/${props.currentGameId}`);
      runTransaction(currentGameRef, currentGame => {
        if (currentGame) {
          if (
            currentGame.currentSampleIndex <
            currentGame.sampleIds.length - 1
          ) {
            currentGame.currentSampleIndex++;
          } else {
            currentGame.currentSampleIndex = -1;
          }
        }
        return currentGame;
      });
    };

    const submitVote = vote => {
      displayNextCard();
    };
    onMounted(() => {});

    return { submitVote, displayedSamples, displayNextCard, allSamples };
  },
};
</script>
