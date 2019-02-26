<template>
  <div class="imageSoundSwipe">
      <transition :key="swipe" :name="swipe" >
        <div class="user-card" :key="baseUrl">
            <div class="image_area" @click="playSound">
              <progressive-img class="user-card__picture mx-auto" :src="baseUrl"
                v-hammer:swipe.horizontal="onSwipe"
                placeholder="https://unsplash.it/500"
                :aspect-ratio="1"
                >
              </progressive-img>
            </div>
          <div class="user-card__name">
            <b-button variant="danger"
              v-if="playMode"
              style="float:left"
              @click="swipeLeft"
              v-shortkey="['arrowleft']"
              @shortkey="swipeLeft"
              v-hammer:swipe.left="swipeLeft"
              ref="leftSwipe"
            > <i class="fa fa-long-arrow-left" aria-hidden="true"></i>
            {{widgetProperties.leftSwipeLabel}}
           </b-button>

           <span style="float:left" v-else>
             <span v-if="widgetSummary"> ave vote: {{widgetSummary.aveVote || 0}} </span>
             <span v-else>ave vote: N/A</span>
           </span>

            <b-button v-if="playMode"
             :to="'/review/'+widgetPointer"
             ref="helpButton"
             class="helpbtn"
             >Help</b-button>

            <b-button variant="success"
              v-if="playMode"
              style="float:right"
              @click="swipeRight"
              v-shortkey="['arrowright']"
              @shortkey="swipeRight"
              ref="rightSwipe"
            > {{widgetProperties.rightSwipeLabel}}
            <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
            </b-button>

            <span style="float:right" v-else>
              <span v-if="widgetSummary"> num votes: {{widgetSummary.count || 0}} </span>
              <span v-else>num votes: 0</span>
            </span>

          </div>
        </div>

      </transition>

  </div>
</template>

<script>
/**
* The ImageSoundSwipe widget is based on the original, https://braindr.us Tinder-like widget
* where you swipe left to "fail" an image, and swipe right to  "pass" it.
* in this case, we also play a sound (it should be a short sound clip)
* and the image should in some way correspond to the sound (a spectrogram for example)
* this is for binary classification only.
 */
  import _ from 'lodash';
  import Vue from 'vue';
  import { VueHammer } from 'vue2-hammer';
  import imagesLoaded from 'vue-images-loaded';
  import GridLoader from 'vue-spinner/src/PulseLoader';
  import VueProgressiveImage from '../../../node_modules/vue-progressive-image/dist/vue-progressive-image';

  Vue.use(VueProgressiveImage);
  Vue.use(VueHammer);
  Vue.use(require('vue-shortkey'));

  export default {
    name: 'ImageSoundSwipe',
    props: {
      /**
       * The sample ID to tell the widget to display.
       */
      widgetPointer: {
        type: String,
        required: true,
      },
     /**
      * The widget-specific properties. The schema is widget specific.
      */
      widgetProperties: {
        type: Object,
        required: true,
      },
     /**
     * The summary data for the widget.
     * This one keeps track of the running average.
     */
      widgetSummary: {
        type: Object,
        required: false,
      },
     /**
      * Tells the widget if it should be in a "play mode" or maybe a "review mode".
      */
      playMode: {
        type: String,
        required: false,
      },
      /**
       * The user's settings on the widget. The schema is widget specific.
       */
      userSettings: {
        type: Object,
        required: true,
      },
     /**
     * Tells the widget to display a tutorial step.
     * tutorialStep = 1 highlights/glows the pass button.
     * tutorialStep = 2 highlights/glows the fail button.
     * tutorialStep = 3 highlights/glows the help button.
     */
      tutorialStep: {
        type: Number,
        required: false,
      },
    },
    components: { VueHammer, GridLoader },
    directives: {
      imagesLoaded,
    },
    data() {
      return {
        /**
         * the status of the image to load
         */
        status: 'loading',
        /**
         * save the swipe direction.
         */
        swipe: null,
        /**
         * the current audio clip that is playing.
         */
        currentAudio: null,
      };
    },
    watch: {
      /**
       * if the sample id changes, then play the new sample's sound.
       */
      widgetPointer() {
        if (this.playMode !== 'tutorial') {
          this.playSound();
        }
      },
    },
    /**
     * if the play mode is not in tutorial mode, then play a sound. else,
     * show a tutorial step.
     */
    mounted() {
      this.$nextTick(() => {
        if (this.playMode !== 'tutorial') {
          this.playSound();
        } else {
          this.showTutorialStep(this.tutorialStep);
        }
      });
    },
    computed: {
      /**
      * Compute the baseURL based on baseUrlTemplate and delimiter of the widgetProperties,
      * and the widgetPointer. For example a widgetPointer="contrast1__image1" could be
      * mapped to https://base_url/contrast1/image1.jpg if
      * baseUrlTemplate = 'https://base_url/{0}/{1}.jpg' and delimiter === '__'.
       */
      baseUrl() {
        return this.widgetProperties.baseUrlTemplate && this.widgetPointer ?
          this.fillPropertyPattern(this.widgetProperties.baseUrlTemplate,
          this.widgetProperties.delimiter) : null;
      },
      /**
      * Compute the soundURL based on soundUrlTemplate and delimiter of the widgetProperties,
      * and the widgetPointer. For example a widgetPointer="contrast1__image1" could be
      * mapped to https://base_url/contrast1/image1.wav if
      * soundUrlTemplate = 'https://base_url/{0}/{1}.wav' and delimiter === '__'.
       */
      soundUrl() {
        return this.widgetProperties.soundUrlTemplate && this.widgetPointer ?
          this.fillPropertyPattern(this.widgetProperties.soundUrlTemplate,
          this.widgetProperties.delimiter) : null;
      },
    },
    methods: {
      /**
       * Show a tutorial step
       */
      showTutorialStep(stepNumber) {
        switch (stepNumber) {
          case 0:
            // highlight the pass button
            this.$refs.rightSwipe.classList.add('focus');
            break;
          case 1:
            // highlight the fail button
            this.$refs.leftSwipe.classList.add('focus');
            break;
          case 2:
            // highlight the help button
            this.$refs.helpButton.classList.add('focus');
            break;
          default:
            break;
        }
      },
      /**
       * Fill a pattern by `this.widgetPointer` based on a delimiter.
       */
      fillPropertyPattern(pattern, delimiter) {
        // fill the pattern by splitting the widgetPointer by delimiter
        let output = pattern;
        const parts = String(this.widgetPointer).split(delimiter);
        _.map(parts, (p, i) => {
          output = output.replace(`{${i}}`, p);
        });
        return output;
      },
      /**
       * play the current audio sound, unless one is already playing, then pause it.
       * and play the new sound.
       */
      playSound() {
        if (this.currentAudio) {
          this.currentAudio.pause();
          this.currentAudio = null;
        }
        // const soundUrl = this.currentImage.replace('.jpg', '.wav');
        const audio = new Audio(this.soundUrl);
        this.currentAudio = audio;
        audio.play();
        const self = this;
        audio.onended = function setEnd() {
          self.currentAudio = null;
        };
      },
      /**
       * Get the score based on a user's response.
       */
      getScore(response) {
        const fb = this.getFeedback(response);
        if (fb.variant === 'danger') {
          return 0;
        }
        return 1;
      },
      /**
       * Get the feedback based on a user's response.
       */
      getFeedback(response) {
        let widgetSummary;
        if (!this.widgetSummary) {
          widgetSummary = {
            count: 0,
          };
        } else {
          widgetSummary = this.widgetSummary;
        }
        if (widgetSummary.count > 4) {
          // if this sample has been seen more than 4 times
          // count the number of points
          const aveVote = widgetSummary.aveVote;

          if (aveVote >= 0.7 && !response) {
            // on average, most people gave this sample some points. If you didn't, lose a point
            return {
              show: false,
              variant: 'danger',
              message: '+0 most people swiped right',
            };
          } else if (aveVote <= 0.3 && response) {
            // on average, most people did not mark this image, but you did
            return {
              show: false,
              variant: 'danger',
              message: '+0 most people swiped left',
            };
          }

          return {
            show: true,
            variant: 'success',
            message: '+1 good job',
          };
        }

        return {
          show: true,
          variant: 'success',
          message: '+1 thanks',
        };
      },
      /**
      * get the widget's new summary based on a user's response.
      * in this case its a running average.
      */
      getSummary(response) {
        // this widget will keep track of
        // the number of votes and the average vote
        if (!this.widgetSummary) {
          // the summary isn't initialized yet
          return {
            aveVote: response,
            count: 1,
          };
        }

        let newVote = ((this.widgetSummary.aveVote * this.widgetSummary.count) + response);
        newVote /= (this.widgetSummary.count + 1);

        return {
          aveVote: newVote,
          count: this.widgetSummary.count + 1,
        };
      },
      /**
       * emit an annotation to the parent.
       */
      vote(val) {
        this.$emit('widgetRating', val);
      },
      /**
       * This method should tell users how their widgetProperties configuration should be defined.
       */
      getPropertiesSchema() {
        return {
          baseUrlTemplate: {
            type: String,
            required: true,
            description: 'base url to image file',
          },
          soundUrlTemplate: {
            type: String,
            required: true,
            description: 'url to sound file',
          },
          delimiter: {
            type: String,
            required: false,
            default: '__',
            description: 'how to split the sample ID to fill the template',
          },
          leftSwipeLabel: {
            type: String,
            required: false,
            default: 'Fail',
            description: 'label for the left swipe button',
          },
          rightSwipeLabel: {
            type: String,
            required: false,
            default: 'True',
            description: 'label for the right swipe button',
          },
        };
      },
      /**
       * Set the swipe-left animation and vote 0
       */
      swipeLeft() {
        // set the transition style
        this.setSwipe('swipe-left');
        this.vote(0);
      },
      /**
       * set the swipe-right animation and vote 1
       */
      swipeRight() {
        // set the transition style
        this.setSwipe('swipe-right');
        this.vote(1);
      },
      /**
       * set the swipe direction based on the mouse/touch event.
       */
      onSwipe(evt) {
        if (evt.direction === 2) {
          this.swipeLeft();
        } else {
          this.swipeRight();
        }
      },
      /**
       * save the swipe direction variable.
       */
      setSwipe(sw) {
        this.swipe = sw;
      },
      /**
      * Test all the lines of this widget.
      */
      test() {
        this.getScore(1);
        this.getScore(0);
        this.getFeedback(1);
        this.getFeedback(0);
        this.getSummary(1);
        this.getSummary(0);
        this.vote(1);
        if (this.playMode === 'play') {
          this.showTutorialStep(0);
          this.showTutorialStep(1);
          this.showTutorialStep(2);
        }
        this.swipeLeft();
        this.swipeRight();
        this.onSwipe({ direction: 1 });
        this.onSwipe({ direction: 2 });
        this.setSwipe('swipe-left');
        this.getPropertiesSchema();
        return 1;
      },
    },
  };
</script>

<style scoped>
  .imageSoundSwipe {
    min-height: 75vh;
    max-height: 600px;
  }
  .user-card {
      max-width: 500px;
      height: fit-content;
      width: 100%;
      border: 1px solid #ccc;
      padding: 8px;
      box-shadow: 0px 2px 5px 0px #ccc;
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
      background-color: white;
  }
  .user-card__picture {
      width: 100%;
      display: block;
  }
  .image_area {
    background: black;
    position: relative;
  }
  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9;
  }
  .user-card__name {
      margin-bottom: 0;
      margin-top: 8px;
  }
  .swipe-left {
      -webkit-animation: swipe-left 1s forwards;
              animation: swipe-left 1s forwards;
  }
  .swipe-right {
      -webkit-animation: swipe-right 1s forwards;
              animation: swipe-right 1s forwards;
  }
  @-webkit-keyframes swipe-left {
      to {
          -webkit-transform: rotate(-13deg) translate3d(-100%, 0, 0);
                  transform: rotate(-13deg) translate3d(-100%, 0, 0);
          opacity: 0;
      }
  }
  @keyframes swipe-left {
      to {
          -webkit-transform: rotate(-13deg) translate3d(-100%, 0, 0);
                  transform: rotate(-13deg) translate3d(-100%, 0, 0);
          opacity: 0;
      }
  }
  @-webkit-keyframes swipe-right {
      to {
          -webkit-transform: rotate(13deg) translate3d(100%, 0, 0);
                  transform: rotate(13deg) translate3d(100%, 0, 0);
          opacity: 0;
      }
  }
  @keyframes swipe-right {
      to {
          -webkit-transform: rotate(13deg) translate3d(100%, 0, 0);
                  transform: rotate(13deg) translate3d(100%, 0, 0);
          opacity: 0;
      }
  }
  /* Enter and leave animations can use different */
  /* durations and timing functions.              */
  /*.swipe-right-enter-active {
    transition: all .3s ease;
  }
  .swipe-right-enter-to {
    transition: all .3s ease;
  }*/
  .swipe-right-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .swipe-right-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
    -webkit-transform: rotate(13deg) translate3d(100%, 0, 0);
            transform: rotate(13deg) translate3d(100%, 0, 0);
    opacity: 0;
  }
  /*.swipe-left-enter-active {
    transition: all .3s ease;
  }*/
  .swipe-left-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .swipe-left-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
    -webkit-transform: rotate(-13deg) translate3d(-100%, 0, 0);
            transform: rotate(-13deg) translate3d(-100%, 0, 0);
    opacity: 0;
  }

  .focus {
    animation:pulse 0.5s infinite alternate;
  }


  @keyframes pulse {
    from { box-shadow:0px 0px 10px 0px #ffffff;}
    to { box-shadow:0px 0px 20px 5px #17a2b8;}
  }

</style>
