<template>
  <div>
    <div v-if="loading"></div>
    <div v-else class="play">
      <Widget
        v-if="currentGame"
        :currentGame="currentGame"
        :currentGameId="userData.currentGameId"
        :config="config"
      />
    </div>
  </div>
</template>

<script>
import useSamples from "@/composables/gameplay/useSamples";
import Widget from "@/components/Widget";
import useGenerateDeck from "@/composables/gameplay/useGenerateDeck";
import useUserSeenSamples from "@/composables/gameplay/useUserSeenSamples";
import useCurrentGame from "@/composables/gameplay/useCurrentGame";

import { onMounted, onUnmounted, ref as vueRef, toRaw } from "vue";
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
  methods: {},
  setup(props) {
    const loading = vueRef(false);
    const { allSamples, getAllSamplesByLeastSeen } = useSamples();
    const { generateLeastSeenDeck } = useGenerateDeck();
    const { userSeenSamples, getUserSeenSamples } = useUserSeenSamples();
    const { currentGame, createNewGame, watchCurrentGame } = useCurrentGame();

    let unsubscribeCurrentGame = () => {};
    onMounted(async () => {
      // if game does not exist, create new game
      if (!props.userData.currentGameId) {
        await getUserSeenSamples(props.currentUser.uid);
        const newDeck = await generateLeastSeenDeck(
          allSamples,
          toRaw(userSeenSamples.value),
          10
        );
        await createNewGame(newDeck, props.currentUser.uid);
        loading.value = true;
      }

      unsubscribeCurrentGame = await watchCurrentGame(
        props.userData.currentGameId
      );
    });
    onUnmounted(() => {
      unsubscribeCurrentGame();
    });
    const submitVote = () => {
      // save vote to votes table
      // update user's cumulative score
      // +1 to userSeenSamples
    };
    return {
      loading,
      currentGame,
      submitVote,
    };
  },
};
</script>

<style lang="scss" scoped>
.play {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
</style>
