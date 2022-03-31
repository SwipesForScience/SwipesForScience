<template>
  <div class="word-card">
    {{ sampleId }}
  </div>
</template>

<script>
export default {
  props: {
    sampleId: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.word-card {
  @include font-size("lg");
  font-weight: $semibold;
  background: $game-primary-gradient;
  border-radius: $border-radius-sm;
  width: 20rem;
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}
</style>
