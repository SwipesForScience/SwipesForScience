<template name="tutorial">
  <div class="tutorial" ref="tutorial">
    <Bubbles v-if="backgroundAnimation == 'Bubbles'" />
    <!-- Title -->
    <div>
      <h1>Tutorial</h1>
      <p class="lead">Scroll down to learn how to play</p>
    </div>
    <!-- Progress Bar -->
    <div class="pbar pt-3 pb-3" v-if="currentBin.bin">
      <b-progress
        :value="scrollPosition"
        :max="1"
        show-progress
        class="ml-3 mr-3"
      ></b-progress>
    </div>

    <!-- Introduction steps -->
    <div
      v-for="(step, index) in steps.intro"
      v-bind:key="step.key"
      :ref="step.key"
      class="fullpage video-trigger"
    >
      <div class="" :id="'intro' + index">
        <p v-html="step.text"></p>
        <span class="invisible">{{ step.text }}</span>
      </div>
      <img :src="step.image" class="mt-3 pt-3 img" />
    </div>

    <!-- Example Steps -->
    <div
      v-for="(step, index) in steps.examples"
      v-bind:key="step.key"
      :ref="step.key"
      class="fullpage video-trigger"
    >
      <div class="text-center message w-100" :id="'example' + index">
        <p v-html="step.text"></p>
        <span class="invisible">{{ step.text }}</span>
        <div v-if="step.pointer" class="mt-3">
          <WidgetSelector
            :widgetType="widgetType"
            :widgetPointer="step.pointer"
            :widgetProperties="widgetProperties"
            :widgetSummary="widgetSummary"
            :playMode="'tutorial'"
            :userSettings="userSettings"
            :tutorialStep="step.tutorialStep"
            v-on:widgetRating="triggerHelper"
            ref="widget"
          />
        </div>
        <div v-if="step.tutorialCompleted">
          <b-button @click="tutorialComplete" class="mt-3">Play now</b-button>
        </div>
      </div>
    </div>

    <!-- Video Player -->
    <div :class="`tutorial-helper ${videoPaused ? 'not-playing' : ''}`">
      <video class="video" ref="tutorialVideo">
        <source :src="video" type="video/mp4" />
      </video>
    </div>

    <div v-if="bins.length - 1 != currentBin.bin" v-scroll-to="nextStep">
      <Arrow />
    </div>

    <p></p>
  </div>
</template>

<style>
.img {
  max-height: 80vh;
  width: 100%;
  max-width: 500px;
}

.tutorial {
  /* height: 500vh; */
}

.fullpage {
  height: 100vh;
}

.message {
  position: absolute;
}

.invisible {
  opacity: 0;
  white-space: pre-wrap;
}

.pbar {
  position: -webkit-sticky; /* Safari */
  position: sticky;
  background: white;
  top: 0;
  z-index: 2;
}
</style>

<script>
/**
 * TODO: fill this in.
 */
import _ from "lodash";
import Vue from "vue";
import Arrow from "./Animations/ArrowDown";
import Bubbles from "./Animations/Bubbles";
import WidgetSelector from "./WidgetSelector";
import video from "../assets/6bff0f6dab95402016a264862060e7f0.mp4";

const VueScrollTo = require("vue-scrollto");

// You can also pass in the default options
Vue.use(VueScrollTo, {
  container: "body",
  duration: 500,
  easing: "ease",
  offset: -75,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
});

export default {
  name: "tutorial",
  components: {
    Arrow,
    Bubbles,
    WidgetSelector
  },
  data() {
    return {
      /**
       * The current scroll position
       */
      scrollPosition: 0,
      /**
       * The sample IDs summary (not implemented yet)
       */
      widgetSummary: {}, // TODO: fill this properly
      /**
       * User settings from firebase (not implemented yet)
       */
      userSettings: {}, // TODO: fill this properly
      /**
       * Path to tutorial video.
       */
      video,
      /**
       * time (s) to pause video. Set by duration + start
       */
      videoEnd: 2,
      /**
       * Event listener `timeupdate` on video el. Pauses video after configured duration.
       */
      videoPaused: true,
      removeVideoListener: () => {},
      /**
       * [observer, element] pairs for triggering videos on step visibility.
       */
      stepObservers: []
    };
  },
  props: {
    /**
     * the various levels, the points need to reach the levels,
     * and the badges (colored and greyed out) to display
     */
    levels: {
      type: Object,
      required: true
    },
    /**
     * The config object that is loaded from src/config.js.
     * It defines how the app is configured, including
     * any content that needs to be displayed (app title, images, etc)
     * and also the type of widget and where to update pointers to data
     */
    config: {
      type: Object,
      required: true
    }
  },
  watch: {},
  computed: {
    /**
     * The widget type defined in config.
     */
    widgetType() {
      return this.config.widgetType;
    },
    /**
     * The widget properties defined in config.
     */
    widgetProperties() {
      return this.config.widgetProperties;
    },
    /**
     * The steps defined in config, with text and images to display.
     */
    steps() {
      // return this.config.tutorial.steps;
      const steps = this.config.tutorial.steps;
      return {
        intro: steps.intro.map((step, i) => ({ ...step, key: "intro." + i })),
        examples: steps.examples.map((step, i) => ({
          ...step,
          key: "examples." + i
        }))
      };
    },
    /**
     * The steps defined in config, with text and images to display.
     */
    allSteps() {
      return [...this.steps.intro, ...this.steps.examples];
    },
    /**
     * The type of background animation to show.
     */
    backgroundAnimation() {
      return this.config.tutorial.customBackgroundAnimation;
    },
    /**
     * The cutoffs of scrolling,
     * to help map scroll position to the step of the tutorial
     */
    bins() {
      const Nsteps = this.steps.intro.length + this.steps.examples.length;
      const binSize = 1 / Nsteps;
      const bins = [];
      for (let i = 0; i < Nsteps; i += 1) {
        bins.push({ bin: i, from: i * binSize, to: (i + 1) * binSize });
      }
      return bins;
    },
    /**
     * The current bin based on scroll position.
     */
    currentBin() {
      const cBin = _.filter(
        this.bins,
        b => this.scrollPosition <= b.to && this.scrollPosition > b.from
      );
      if (cBin.length) {
        return cBin[0];
      }

      return { bin: 0 };
    },
    /**
     * The current stage, either the intro text stage,
     * or the part that shows how the widget works.
     */
    currentStage() {
      if (this.currentBin.bin < this.steps.intro.length) {
        return { ...this.steps.intro[this.currentBin.bin], mode: "intro" };
      }
      return {
        ...this.steps.examples[this.currentBin.bin - this.steps.intro.length],
        mode: "examples"
      };
    },
    /**
     * The next step that should be displayed.
     */
    nextStep() {
      if (this.currentBin.bin < this.steps.intro.length - 1) {
        return `#intro${this.currentBin.bin + 1}`;
      }
      return `#example${this.currentBin.bin - this.steps.intro.length + 1}`;
    }
  },
  methods: {
    /**
     * When this method is run, we tell the parent component that the
     * user has completed the tutorial.
     */
    tutorialComplete() {
      this.$emit("taken_tutorial", true);
    },
    /**
     * Keep track of the scroll position and save it to the scrollPosition variable.
     */
    handleScroll() {
      const h = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight || 0
      );
      const scrollPosition =
        (window.scrollY - 60) / (this.$refs.tutorial.clientHeight - h);
      if (scrollPosition < 0) {
        this.scrollPosition = 0;
      } else if (scrollPosition > 1) {
        this.scrollPosition = 1;
      } else {
        this.scrollPosition = scrollPosition;
      }
    },
    playVideo(start, duration) {
      this.videoPaused = false;
      const tutorialVideo = this.$refs.tutorialVideo;
      tutorialVideo.removeEventListener("timeupdate", this.pause);

      tutorialVideo.currentTime = start || 0;
      tutorialVideo.play();

      this.videoEnd = duration ? start + duration : tutorialVideo.duration;
      this.removeVideoListener = () => {
        tutorialVideo.removeEventListener("timeupdate", this.pause, true);
        this.removeVideoListener = () => {};
      };
      tutorialVideo.addEventListener("timeupdate", this.pause, true);
    },
    pause() {
      const tutorialVideo = this.$refs.tutorialVideo;
      if (tutorialVideo.currentTime >= this.videoEnd) {
        tutorialVideo.pause();
        this.removeVideoListener();
        this.videoPaused = true;
      }
    },
    setVisibilityTriggers() {
      this.allSteps.forEach(step => {
        const element = this.$refs[step.key][0];
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting && step?.video?.onFocus) {
              const { start, duration } = step.video.onFocus;
              this.playVideo(start, duration);
            }
          },
          { threshold: [0.6] }
        );
        observer.observe(element);
        this.stepObservers.push([observer, element]);
      });
    },
    triggerHelper(vote) {
      const step = this.allSteps.find(step => step.pointer === vote.pointer);
      const expected = step.answer;
      const success = vote.value === expected;
      const videoSettings = success
        ? step.video?.onCorrect
        : step.video?.onIncorrect;
      if (videoSettings)
        this.playVideo(videoSettings.start, videoSettings.duration);
    }
  },
  /**
   * Add a scroll listener when the component is created.
   */
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  mounted() {
    this.setVisibilityTriggers();
  },
  /**
   * Remove the scroll listener before the component is destroyed.
   */
  beforeDestroy() {
    this.$refs.tutorialVideo?.removeEventListener("timeupdate", this.pause);
    window.removeEventListener("scroll", this.handleScroll);
    this.stepObservers.forEach(([observer, element]) => {
      observer.unobserve(element);
    });
    this.stepObservers = [];
  }
};
</script>

<style scoped>
.tutorial-helper {
  position: fixed;
  bottom: 0;
  right: 0;
  height: 15.9em;
  width: 28em;
  z-index: 2;
}
.tutorial-helper .video {
  position: absolute;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  width: 100%;
  height: auto;
  background-size: cover;
  overflow: hidden;
}
.tutorial-helper.not-playing {
  transform: translateY(50vh);
}
</style>
