<template>
  <div class="widget-container">
    <div class="widget" v-if="gameState === GAME_STATES.IN_PROGRESS">
      <WidgetHeader
        :currentScore="currentGame.score"
        :totalSamples="currentGame.sampleIds.length"
        :currentSampleIndex="currentGame.currentSampleIndex"
        @pauseGame="pauseGame"
      />
      <WordSwipe
        v-if="config.widgetType === 'WordSwipe'"
        :config="config"
        :currentGame="currentGame"
        :currentGameId="currentGameId"
        :allSamples="allSamples"
        :displayedSamples="displayedSamples"
        @submitVote="submitVote"
      />
      <ImageSwipe
        v-if="config.widgetType === 'ImageSwipe'"
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
    <PauseScreen
      v-if="gameState === GAME_STATES.PAUSED"
      @unpauseGame="unpauseGame"
    />
    <div v-if="gameState === GAME_STATES.LEVEL_UP">
      Level up
      <button @click="unpauseGame">Continue Playing</button>
      <router-link :to="{ name: 'Profile' }"
        ><button>Save and view Profile</button></router-link
      >
    </div>
  </div>
</template>

<script>
import useSamples from "@/composables/gameplay/useSamples";
import useUserSeenSamples from "@/composables/gameplay/useUserSeenSamples";
import useCurrentUser from "@/composables/gameplay/useCurrentUser";
import useVote from "@/composables/gameplay/useVote";
import useCurrentGame from "@/composables/gameplay/useCurrentGame";
import WordSwipe from "@/components/Widgets/WordSwipe/WordSwipe.vue";
import ImageSwipe from "@/components/Widgets/ImageSwipe/ImageSwipe.vue";
import WidgetHeader from "@/components/Widgets/WidgetHeader";
import PauseScreen from "@/components/PauseScreen";

import {
  getDatabase,
  ref,
  runTransaction,
  update,
  increment,
} from "firebase/database";
import { onMounted, toRaw, watch, computed, ref as vueRef } from "vue";

export default {
  components: { WidgetHeader, WordSwipe, ImageSwipe, PauseScreen },
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
    const { updateUserCumulativeScore } = useCurrentUser();
    const { updateGameScore } = useCurrentGame();
    const { sendVote } = useVote();
    const GAME_STATES = {
      LEVEL_UP: "levelUp",
      PAUSED: "paused",
      GAME_OVER: "gameOver",
      IN_PROGRESS: "inProgress",
    };

    const displayedSamples = computed(() => {
      return props.currentGame.sampleIds.slice(
        props.currentGame.currentSampleIndex,
        props.currentGame.currentSampleIndex + 4
      );
    });
    const gameState = vueRef(GAME_STATES.IN_PROGRESS);
    const currentCardStartTime = vueRef(null);
    const currentCardState = vueRef(null);
    const db = getDatabase();
    onMounted(async () => {
      await getAllSamples();
      currentCardStartTime.value = new Date();
    });

    watch(
      () => props.currentGame.currentSampleIndex,
      currentSampleIndex => {
        if (currentSampleIndex < 0) gameState.value = GAME_STATES.GAME_OVER;
      }
    );

    const displayNextCard = async () => {
      const currentGameRef = ref(db, `/games/${props.currentGameId}`);
      currentCardStartTime.value = new Date();
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
      return (averageVote * totalSeenCount + response) / (totalSeenCount + 1);
    };
    const updateSample = async ({ response, sampleId }) => {
      const newAverage = calculateNewAverage({ response, sampleId });
      const sampleRef = ref(db, `samples/${sampleId}`);
      const updates = {};
      updates.totalSeenCount = increment(1);
      updates.averageVote = newAverage;
      update(sampleRef, updates);
    };
    const submitVote = async ({ response, sampleId, pointsEarned }) => {
      const duration = new Date() - currentCardStartTime.value;
      const vote = {
        response,
        userId: props.currentGame.userId,
        gameId: props.currentGameId,
        sampleId,
        duration,
      };
      sendVote(vote);
      updateSample({ response, sampleId });
      updateGameScore(props.currentGameId, pointsEarned);
      updateUserCumulativeScore(props.currentGame.userId, pointsEarned);
      updateUserSeenSamples(props.currentGame.userId, sampleId);

      await displayNextCard();
    };

    const startNewGame = () => {
      context.emit("startNewGame");
    };

    const pauseGame = () => {
      gameState.value = GAME_STATES.PAUSED;
    };
    const unpauseGame = () => {
      gameState.value = GAME_STATES.IN_PROGRESS;
      currentCardStartTime.value = new Date();
    };

    return {
      submitVote,
      displayNextCard,
      displayedSamples,
      allSamples,
      startNewGame,
      GAME_STATES,
      gameState,
      pauseGame,
      unpauseGame,
      currentCardState,
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
