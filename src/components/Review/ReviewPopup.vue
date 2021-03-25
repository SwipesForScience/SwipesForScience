<template>
  <div class="review-popup">
    <ReviewConversation
      :widgetPointer="widgetPointer"
      :userInfo="userInfo"
      :db="db"
    >
      <template v-slot:button>
        <button class="back-button" @click="togglePopup">
          <i class="fa fa-angle-left"></i> Back to gameplay
        </button>
      </template>
    </ReviewConversation>
  </div>
</template>

<script>
import ReviewConversation from "./ReviewConversation";

export default {
  name: "ReviewPopup",
  components: {
    ReviewConversation
  },
  props: {
    widgetPointer: {
      type: String,
      required: true
    },
    userInfo: {
      type: Object,
      required: true
    },
    db: {
      type: Object,
      required: true
    }
  },
  methods: {
    togglePopup() {
      this.$emit("toggleReviewPopup");
    }
  }
};
</script>

<style scoped>
.review-popup {
  z-index: 2;
  width: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  background-color: white;
}
</style>
