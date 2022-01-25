<template>
  <div>
    <div v-if="passed">
      You got it!
      <button class="btn-game--primary-solid btn-full-size" @click="next">
        Next
      </button>
    </div>
    <div class="card-container" v-else>
      <SwipeAnimation />
      <Card
        v-for="sampleId in displayedSamples"
        :key="sampleId"
        :sampleId="sampleWord"
        :isCurrent="true"
        :isNext="false"
        @removeTopCard="removeTopCard"
      />
    </div>
  </div>
</template>

<script>
import Card from "@/components/Widgets/WordSwipe/Card.vue";
import SwipeAnimation from "./SwipeAnimation.vue";
import { ref as vueRef, reactive } from "vue";

export default {
  name: "WordSwipeTrial",
  components: { Card, SwipeAnimation },
  props: {
    sampleWord: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  setup(props, context) {
    const passed = vueRef(false);
    const displayedSamples = reactive([
      {
        sampleId: props.sampleWord,
      },
    ]);
    const removeTopCard = ({ response }) => {
      displayedSamples.shift();
      if (response !== props.value) {
        setTimeout(() => {
          displayedSamples.push({
            sampleId: props.sampleWord,
          });
        }, 1000);
      } else {
        setTimeout(() => {
          passed.value = true;
        }, 500);
      }
    };
    const next = () => {
      context.emit("nextStep");
    };
    return { displayedSamples, removeTopCard, passed, next };
  },
};
</script>

<style scoped lang="scss">
.card-container {
  display: flex;
  height: 10rem;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .word-card {
    height: inherit;
    width: 300px;
  }
}
svg {
  z-index: 5;
  width: 100px;
  position: absolute;
  top: 10px;
  right: 0;
}
</style>
