<template>
  <div
    class="image-card"
    ref="card"
    :class="{
      'image-card--current': isCurrent,
      'image-card--disabled': !isCurrent,
      'image-card--next': isNext,
    }"
  >
    {{ imageUrl }}
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  props: {
    sampleId: {
      type: String,
      required: true,
    },
    isCurrent: {
      type: Boolean,
      required: true,
    },
    isNext: {
      type: Boolean,
      required: true,
    },
    baseUrlTemplate: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const imageUrl = computed(() => {
      return props.baseUrlTemplate.replace("_SAMPLE_ID_", props.sampleId);
    });
    return { imageUrl };
  },
};
</script>

<style></style>
