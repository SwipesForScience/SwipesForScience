<template>
  <div
    class="word-card"
    ref="card"
    :class="{
      'word-card--current': isCurrent,
      'word-card--disabled': !isCurrent,
      'word-card--next': isNext,
      isAnimating: isAnimating,
    }"
    :style="{ transform: transformString }"
  >
    {{ sampleId }}
  </div>
</template>

<script>
import interact from "interactjs";
const MAX_ROTATION = 30;
const X_OFFSCREEN_COORDINATE = 1000;
const X_THRESHOLD = 20;

export default {
  name: "Card",
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
  },
  data: () => {
    return {
      isDisplayed: true,
      isAnimating: true,
      position: {
        x: 0,
        y: 0,
        rotation: 0,
      },
    };
  },
  mounted() {
    const card = this.$refs.card;
    interact(card).draggable({
      inertia: false,
      autoScroll: true,
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: "parent",
          endOnly: true,
        }),
      ],
      listeners: {
        move: this.dragMoveListener,
        end: () => {
          this.isAnimating = true;
          if (this.position.x < -X_THRESHOLD) {
            this.sendCardToLeft();
          } else if (this.position.x > X_THRESHOLD) {
            this.sendCardToRight();
          } else {
            this.resetCardPosition();
          }
        },
      },
    });
  },
  beforeUnmount() {
    interact(this.$refs.card).unset();
  },
  methods: {
    dragMoveListener(event) {
      this.isAnimating = false;
      const x = this.position.x + event.delta.x;
      const y = this.position.y + event.delta.y;
      let rotation = 0;
      if (this.position.x > 0) {
        rotation = Math.min(MAX_ROTATION, this.position.x * 2);
      } else {
        rotation = Math.max(-MAX_ROTATION, this.position.x * 2);
      }
      this.setPosition({ x: x, y: y, rotation: rotation });
    },
    setPosition(coordinates) {
      const { x = 0, y = 0, rotation = 0 } = coordinates;
      this.position = { x, y, rotation };
    },
    resetCardPosition() {
      this.setPosition({ x: 0, y: 0, rotation: 0 });
    },

    updateXThresholdOnResize() {
      this.xThreshold = window.innerWidth > 500 ? 70 : 23;
    },
    sendCardToLeft() {
      this.setPosition({ x: -X_OFFSCREEN_COORDINATE, rotation: 0 });
      setTimeout(() => {
        this.$emit("remove-top-card", { response: 0, duration: 100 });
      }, 100);
    },
    sendCardToRight() {
      this.setPosition({
        x: X_OFFSCREEN_COORDINATE,
        y: this.position.y,
        rotation: 0,
      });

      setTimeout(() => {
        this.$emit("remove-top-card", { response: 1, duration: 100 });
      }, 100);
    },
  },
  computed: {
    transformString: function () {
      if (this.isCurrent) {
        const { x, y, rotation } = this.position;
        return `translate3D(${x}px, ${y}px, 0) rotate(${rotation}deg)`;
      }
      return null;
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
  width: 85%;
  height: 12rem;
  display: flex;
  position: absolute;
  top: 0;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  touch-action: none;
}

.word-card--current {
  cursor: move;
  transform: scale(1);
  opacity: 1;
  z-index: 2;
  touch-action: none;
}
.word-card--disabled {
  transform: scale(0.9) translatey(30px);
  opacity: 0;
  pointer-events: none;
}
.word-card--next {
  opacity: 0.7;
}
.isAnimating {
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in;
}
</style>
