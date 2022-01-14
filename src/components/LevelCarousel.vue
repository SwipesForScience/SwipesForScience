<template>
  <div>
    <div class="flickity" ref="root">
      <div
        v-for="(level, index) in levelCopy"
        :key="level.name"
        class="carousel-cell"
      >
        <img
          :src="require('@/assets/badges/' + level.filename)"
          :alt="`Badge for ${level.name}`"
          class="carousel__badge"
          v-bind:class="{
            'carousel__badge--greyscale': levelThresholds[index] > totalScore,
          }"
          @click="select(index)"
        />
      </div>
    </div>
    <div v-if="levelThresholds[selected] <= totalScore">
      {{ levelCopy[selected].caption }}
    </div>
    <div v-else>
      You need to swipe {{ levelThresholds[selected] - totalScore }} more cards
      to get this badge
    </div>
  </div>
</template>

<script>
import Flickity from "flickity";
import { ref as vueRef, onMounted, onUnmounted } from "vue";
import LEVELS from "@/constants/levels";

export default {
  props: {
    totalScore: {
      type: Number,
      required: true,
    },
    levelThresholds: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const levelCopy = LEVELS;
    const root = vueRef(null);
    let flickity;
    const selected = vueRef(0);
    onMounted(() => {
      flickity = new Flickity(root.value, {
        wrapAround: true,
        percentPosition: false,
        prevNextButtons: false,
        pageDots: false,
        selectedAttraction: 0.2,
        adaptiveHeight: true,
        on: {
          change: function (index) {
            selected.value = index;
          },
        },
      });
    });
    onUnmounted(() => {
      flickity?.destroy();
    });
    const select = index => {
      flickity.select(index);
    };
    return { root, select, selected, levelCopy };
  },
};
</script>

<style scoped lang="scss">
@import "~flickity/dist/flickity.css";
.carousel-cell {
  width: 6rem;
  height: 6rem;
  img {
    margin: 0 space(1);
  }
  @include media("≥mobile") {
    width: 7rem;
    height: 7rem;
    img {
      margin: 0 space(3);
    }
  }
  @include media("≥tablet") {
    width: 9rem;
    height: 9rem;
  }
}
.carousel__badge--greyscale {
  filter: grayscale(1);
}
</style>
