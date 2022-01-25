<template>
  <div class="tutorial__steps">
    <section
      :id="`slide-${index}`"
      class="slide__step"
      v-for="(slide, index) in slides"
      :key="slide.title"
      :ref="`slide_${index}`"
    >
      <h2 class="subheading">{{ slide.title }}</h2>
      <p class="slide__text">
        {{ slide.text }}
      </p>
      <div v-if="slide.img" class="slide__image">
        <img
          :src="slide.img.url"
          class="tutorial__step-image"
          :alt="slide.img.caption"
        />
        <div class="slide__image-caption">{{ slide.img.caption }}</div>
      </div>
      <button
        class="btn-game--primary-solid btn-full-size"
        @click="scrollToNextSlide(index + 1)"
        v-if="index < slides.length - 1"
      >
        {{ BUTTON_COPY[index % 5] }}
      </button>
      <button
        class="btn-game--primary-solid btn-full-size"
        @click="next()"
        v-else
      >
        Ready to train?
      </button>
    </section>
  </div>
</template>

<script>
const BUTTON_COPY = [
  "Got it!",
  "Tell me more!",
  "I'm with you so far!",
  "Next!",
  "Moving on!",
  "Ok!",
];

export default {
  setup(props, context) {
    const next = () => {
      context.emit("nextStep");
    };
    return { BUTTON_COPY, next };
  },
  props: {
    slides: {
      type: Object,
      required: true,
    },
  },
  methods: {
    scrollToNextSlide(nextEl) {
      let el = document.querySelector(`#slide-${nextEl}`);
      el.scrollIntoView({ behavior: "smooth" });
    },
  },
};
</script>

<style lang="scss" scoped>
.tutorial__steps {
  position: relative;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
}
.slide__text {
  margin-bottom: space(3);
  white-space: pre-wrap;
  line-height: 1.625rem;
}
.slide__step {
  height: 100%;
  scroll-snap-align: start;
}

.tutorial__step-image {
  width: 100%;
  @include media("aspect-ratio-3/2") {
    width: 60%;
  }
}
.slide__image {
  text-align: center;
  margin-bottom: space(3);
  display: flex;
  flex-direction: column;
  align-items: center;
  & > img {
    margin-bottom: space(1);
  }
}
</style>
