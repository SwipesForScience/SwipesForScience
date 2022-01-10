<template>
  <div class="widget-container">
    <div class="widget" v-if="gameState === GAME_STATES.IN_PROGRESS">
      <WordSwipe
        v-if="config.widgetType === 'WordSwipe'"
        :config="config"
        :currentGame="currentGame"
        :currentGameId="currentGameId"
        :allSamples="allSamples"
        :displayedSamples="displayedSamples"
        @submitVote="submitVote"
      />
    </div>
    <div v-if="gameState === GAME_STATES.GAME_OVER" class="widget__game-over">
      Game Completed! You scored
      {{ currentGame.score }} / {{ currentGame.sampleIds.length }}
      <button
        @click="startNewGame"
        class="btn-game--primary-solid btn-full-size"
      >
        Play again
      </button>
    </div>
    <div v-if="gameState === GAME_STATES.PAUSED">
      <div>Game Paused</div>
      <button class="btn-game--primary-solid btn-full-size">
        Continue Playing
      </button>
      <button class="btn-game--primary-solid btn-full-size">
        Save and Quit
      </button>
      <div>Read tutorial</div>
    </div>
    <div v-if="gameState === GAME_STATES.LEVEL_UP">
      Level up
      <button>Continue Playing</button>
      <button>Save and Quit</button>
    </div>
  </div>
</template>

<script>
import useSamples from "@/composables/gameplay/useSamples";
import useUserSeenSamples from "@/composables/gameplay/useUserSeenSamples";
import WordSwipe from "@/components/Widgets/WordSwipe/WordSwipe.vue";
import {
  getDatabase,
  ref,
  runTransaction,
  update,
  increment,
} from "firebase/database";
import { onMounted, toRaw, reactive, watch, ref as vueRef } from "vue";
import useVote from "@/composables/gameplay/useVote";

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
  setup(props, context) {
    const { allSamples, getAllSamples } = useSamples();
    const { updateUserSeenSamples } = useUserSeenSamples();
    const { sendVote } = useVote();
    const displayedSamples = reactive([]);
    const GAME_STATES = {
      LEVEL_UP: "levelUp",
      PAUSED: "paused",
      GAME_OVER: "gameOver",
      IN_PROGRESS: "inProgress",
    };
    const gameState = vueRef(GAME_STATES.IN_PROGRESS);
    const db = getDatabase();
    onMounted(async () => {
      await getAllSamples();
      const samples = toRaw(props.currentGame.sampleIds).slice(
        props.currentGame.currentSampleIndex
      );
      displayedSamples.push(...samples);
    });

    watch(
      () => props.currentGame.currentSampleIndex,
      currentSampleIndex => {
        if (currentSampleIndex < 0) gameState.value = GAME_STATES.GAME_OVER;
      }
    );

    const displayNextCard = async () => {
      displayedSamples.shift();
      const currentGameRef = ref(db, `/games/${props.currentGameId}`);
      await runTransaction(currentGameRef, currentGame => {
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
    const calculateNewAverage = ({ response, sampleId }) => {
      const { averageVote, totalSeenCount } = toRaw(allSamples.value)[sampleId];
      return (averageVote + response) / (totalSeenCount + 1);
    };
    const updateSample = async ({ response, sampleId }) => {
      const newAverage = calculateNewAverage({ response, sampleId });
      const sampleRef = ref(db, `samples/${sampleId}`);
      const updates = {};
      updates.totalSeenCount = increment(1);
      updates.averageVote = newAverage;
      update(sampleRef, updates);
    };
    const submitVote = async ({ response, sampleId }) => {
      const vote = {
        response,
        userId: props.currentGame.userId,
        gameId: props.currentGameId,
        sampleId,
      };

      sendVote(vote);
      updateSample({ response, sampleId });
      updateUserSeenSamples(props.currentGame.userId, sampleId);
      await displayNextCard();
    };

    const startNewGame = () => {
      context.emit("startNewGame");
    };

    return {
      submitVote,
      displayedSamples,
      displayNextCard,

      allSamples,
      startNewGame,
      GAME_STATES,

      gameState,
    };
  },
};
</script>

<style lang="scss" scoped>
.widget-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.widget {
  width: 100%;
  height: 100%;
}
.widget__game-over {
  text-align: center;
  display: grid;
  grid-template-rows: 1fr 1fr;
}
</style>
