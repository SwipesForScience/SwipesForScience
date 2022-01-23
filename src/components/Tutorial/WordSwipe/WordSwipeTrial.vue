<template>
  <div class="card-container">
    <Card :sampleId="sampleWord" :isCurrent="true" :isNext="false" />
  </div>
</template>

<script>
import Card from "@/components/Widgets/WordSwipe/Card.vue";
export default {
  name: "WordSwipeTrial",
  components: { Card },
  props: {
    sampleWord: {
      type: String,
      required: true,
    },
    isRight: {
      type: Boolean,
      required: true,
    },
  },
  setup() {},
};
</script>

<style scoped>
.card-container {
  position: relative;
}
</style>
