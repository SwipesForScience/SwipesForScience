<template>
  <div class="frame frame--game">
    <div v-if="loading" class="spinner">Loading...</div>
    <div v-else class="play">
      <Widget
        v-if="currentGame"
        :currentGame="currentGame"
        :currentGameId="userData.currentGameId"
        :config="config"
        @startNewGame="startNewGame"
      />
    </div>
  </div>
</template>

<script>
import Widget from "@/components/Widget";
import useCurrentGame from "@/composables/gameplay/useCurrentGame";
import { onMounted, onUnmounted, ref as vueRef } from "vue";

export default {
  name: "Play",
  components: { Widget },
  props: {
    config: {
      type: Object,
    },
    currentUser: {
      type: Object,
    },
    userData: {
      type: Object,
    },
  },
  setup(props) {
    const loading = vueRef(false);
    const { currentGame, createNewGame, watchCurrentGame, getGameById } =
      useCurrentGame();
    let unsubscribeCurrentGame = null;

    onMounted(async () => {
      loading.value = true;
      if (props.userData.currentGameId) {
        const game = await getGameById(props.userData.currentGameId);
        if (game.currentSampleIndex == -1)
          await createNewGame(props.currentUser.uid);
      } else await createNewGame(props.currentUser.uid);

      unsubscribeCurrentGame = await watchCurrentGame(
        props.userData.currentGameId
      );
      loading.value = false;
    });

    const startNewGame = async () => {
      loading.value = true;
      unsubscribeCurrentGame();
      await createNewGame(props.currentUser.uid);
      unsubscribeCurrentGame = await watchCurrentGame(
        props.userData.currentGameId
      );
      loading.value = false;
    };
    onUnmounted(() => {
      unsubscribeCurrentGame();
    });

    return {
      loading,
      currentGame,
      startNewGame,
    };
  },
};
</script>

<style lang="scss" scoped>
.play {
  width: 100%;
  height: 100%;
}
</style>
