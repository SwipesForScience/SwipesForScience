<template>
  <header class="widget-header">
    <div class="widget-header__counter">
      Sample {{ currentSampleIndex + 1 }} of
      {{ totalSamples }}
    </div>
    <div class="widget-header__buttons">
      <div class="btn-game-hollow widget-header__score">
        Score <span>{{ currentScore }}</span>
      </div>
      <PauseButton @click="$emit('pauseGame')" />
    </div>
  </header>
</template>

<script>
import PauseButton from "@/components/Widgets/PauseButton";
import useCurrentGame from "@/composables/gameplay/useCurrentGame";

export default {
  components: { PauseButton },
  props: {
    currentSampleIndex: {
      type: Number,
    },
    totalSamples: {
      type: Number,
    },
    currentScore: {
      type: Number,
    },
  },
  emits: ["pauseGame"],
  setup() {
    const { GAME_STATES, currentGameState, updateGameState } = useCurrentGame();
    return { GAME_STATES, updateGameState, currentGameState };
  },
};
</script>

<style lang="scss" scoped>
.widget-header {
  margin-bottom: space(4);
}
.widget-header__counter {
  @include font-size("xs");
  margin-bottom: space(2);
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  font-weight: $bold;
  text-align: center;
  grid-column: 1 / span 2;
}
.widget-header__buttons {
  display: flex;
  justify-content: space-between;
}

.widget-header__score {
  min-width: 6rem;
  grid-column: 1 / span 1;
  span {
    margin-left: space(1);
  }
}
</style>
