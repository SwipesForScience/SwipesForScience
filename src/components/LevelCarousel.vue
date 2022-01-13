<template>
  <div class="flickity" ref="root">
    <div
      v-for="(level, index) in levels"
      :key="level.level"
      class="carousel-cell"
    >
      <img
        :src="require('@/assets/badges/' + level.level + '.svg')"
        :alt="`Badge for Level ${level.level}`"
        class="carousel__badge"
        @click="select(index)"
      />
      <div></div>
    </div>
  </div>
</template>

<script>
import Flickity from "flickity";
import { ref as vueRef, onMounted, onUnmounted } from "vue";

export default {
  props: {
    options: {
      type: Object,
    },
    levels: {
      type: Object,
    },
  },
  setup() {
    const root = vueRef(null);
    let flickity;
    onMounted(() => {
      flickity = new Flickity(root.value, {
        wrapAround: true,
        percentPosition: false,
        prevNextButtons: false,
        selectedAttraction: 0.2,
      });
    });
    onUnmounted(() => {
      flickity?.destroy();
    });
    const select = index => {
      flickity.select(index);
    };
    return { root, select };
  },
};
</script>

<style scoped lang="scss">
@import "~flickity/dist/flickity.css";
.carousel-cell {
  width: 30%;
  height: 100px;
  img {
    margin: 0 10px;
  }
}
</style>
