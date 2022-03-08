<template>
  <div class="pause">
    <div class="pause__header">
      <img src="@/assets/badges/dna.svg" />
      <h2>Game Paused</h2>
    </div>
    <div class="pause__footer">
      <button
        class="btn-game--primary-solid btn-full-size"
        @click="$emit('unpauseGame')"
      >
        Continue Playing
      </button>
      <router-link :to="{ name: 'Profile' }"
        ><button class="btn-game--secondary-solid btn-full-size">
          Save and view Profile
        </button></router-link
      >
      <router-link :to="{ name: 'Tutorial' }">
        <button class="btn-game-transparent btn-full-size">
          Read tutorial
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["unpauseGame"],
};
</script>

<style lang="scss" scoped>
.pause {
  height: 100%;
  display: grid;
  grid-template-rows: 1fr auto;
}
.pause__header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  grid-row: 1 / span 1;

  h2 {
    margin-top: space(6);
  }
}
.pause__footer {
  width: 100%;
  align-self: end;
  grid-row: 2 / span 1;
  a:first-of-type {
    display: block;
    width: 100%;
    margin-top: space(4);
    margin-bottom: space(1);
  }
}
h2 {
  @include font-size("lg");
  text-transform: uppercase;
  font-weight: $bold;
}
</style>
