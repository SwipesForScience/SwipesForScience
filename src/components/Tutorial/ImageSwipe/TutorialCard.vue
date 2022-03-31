<template>
  <img :src="imageUrl" class="image-card" />
</template>

<script>
export default {
  props: {
    imageUrl: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.image-card {
  border-radius: $border-radius-sm;
  width: 100%;
  @include media("≥mobile") {
    width: 70%;
  }
}
</style>
