<template>
  <div class="imageSwipe">
      <transition :key="swipe" :name="swipe" >
        <div class="user-card" :key="baseUrl">
            <div class="image_area">
              <!-- <div v-if="status == 'loading'">
                <grid-loader class="loader" color="#ffc107"></grid-loader>
              </div> -->
              <progressive-img class="user-card__picture mx-auto" :src="baseUrl"
                placeholder="https://unsplash.it/500"
                :aspect-ratio="1"
                >
              </progressive-img>
            </div>

            <div class="user-card__name">
             <b-button v-for="(choice, key) in widgetProperties.choices"
                :key="key"
                :variant="choice.variant"
                v-if="playMode"
                @click="vote(key)"
                ref="choice.id">
                {{choice.name}}
             </b-button>

            </div>

            <div class="user-card__name">
              <b-button v-if="playMode"
              :to="'/review/'+widgetPointer"
              ref="helpButton"
              class="helpbtn"
              >Help</b-button>
            </div>
          </div>
      </transition>
  </div>
</template>

<script>
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
    name: 'ImageSwipeChoices',
    props: {
      /**
      * the sample ID to display. In this case it should be a pubmed id.
      */
      widgetPointer: {
        type: String,
        required: true,
      },
     /**
      * the properties of the widget, that are widget specific.
      */
      widgetProperties: {
        type: Object,
        required: true,
      },
     /**
      * the summary data of the widget.
      */
      widgetSummary: {
        type: Object,
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
      * whether the widget should render in play mode, or review mode, or tutorial mode.
      */
      playMode: {
        type: String,
        required: false,
      },
     /**
      * this is not implemented yet, but will be used to keep track of and show off
      * the annotation features of this widget.
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
        *
        */
        status: 'loading',
        /**
        *
        */
        swipe: null,
      };
    },
    computed: {
      /**
      *
      */
      baseUrl() {
        return this.widgetProperties.baseUrlTemplate && this.widgetPointer ?
          this.fillPropertyPattern(this.widgetProperties.baseUrlTemplate,
          this.widgetProperties.delimiter) : null;
      },
    },
    /**
    *
    */
    mounted() {
      if (this.playMode === 'tutorial') {
        this.showTutorialStep(this.tutorialStep);
      }
    },
    methods: {
      /**
      *
      */
      showTutorialStep(stepNumber) {
        if (stepNumber < this.widgetProperties.length) {
          // eslint-disable-next-line
          const element = this.widgetProperties.choices[stepNumber].id;
          this.$refs.element.$el.classList.add('focus');
        }
      },
      /**
      *
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
      *
      */
      getScore(response) {
        const fb = this.getFeedback(response);
        if (fb.variant === 'danger') {
          return 0;
        }
        return 1;
      },
      /**
      *
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
      *
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
            description: 'base url to the image file',
          },
          delimiter: {
            type: String,
            required: false,
            default: '__',
            description: 'how to split the sample ID to fill in the template',
          },
          choices: {
            type: Array,
            required: true,
            description: 'the different tags for the image',
            max_length: 4,
            default: [
              {
                id: 'artifact',
                name: 'Artifact',
                variant: 'danger',
              },
              {
                id: 'unknown',
                name: 'Don\'t know',
                variant: 'info',
              },
              {
                id: 'brain',
                name: 'Brain',
                variant: 'success',
              },
            ],
            schema: {
              type: Object,
              schema: {
                id: {
                  type: String,
                  required: true,
                  description: 'id of the button',
                },
                name: {
                  type: String,
                  required: true,
                  description: 'name of the button',
                },
                variant: {
                  type: String,
                  required: true,
                  description: 'color variant of the button',
                },
              },
            },
          },
        };
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
        this.showTutorialStep(0);
        this.showTutorialStep(1);
        this.showTutorialStep(2);
        this.getPropertiesSchema();
        return 1;
      },
    },
  };
</script>

<style scoped>

  .btn {
    text-align: center;
    margin-left: 10px;
    margin-right: 10px;
  }

  .imageSwipe {
    min-height: 100vh;
    height: 532px;
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
