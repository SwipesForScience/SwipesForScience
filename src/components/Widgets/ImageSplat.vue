<template>
  <!-- This is a dummy Widget Template -->
  <div class="imageSplat">

    <div class="parent user-card">

      <Paper :paperSrc="baseUrl"
             :maskSrc="maskUrl"
             :contourSrc="contourUrl"
             :visibility="visible"
             :brightness="brightness"
             :contrast="contrast"
             ref="paper"
             v-on:loaded_image="setUserSettings"
             id="baseImage"/>

      <div class="user-card__name mb-3 pb-3 mt-2 pt-3" v-if="playMode">

        <div class="row">
          <div class="col-1">
            <i class="fa fa-sun-o"></i>
          </div>
          <div class="col-10">
            <vue-slider ref="slider1" v-model="brightness" v-bind="brightnessOptions">
            </vue-slider>
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-1">
            <i class="fa fa-adjust"></i>
          </div>
          <div class="col-10">
            <vue-slider ref="slider1" v-model="contrast" v-bind="brightnessOptions">
            </vue-slider>
          </div>
        </div>

        <b-btn variant="danger" @click="undo" class="mx-auto ml-3 mr-3">
          <i class="fa fa-undo"></i>
        </b-btn>

        <b-btn variant="info" :to="'/review/' + widgetPointer" class="mx-auto ml-3 mr-3 pl-3 pr-3" >
          <i class="fa fa-question"></i>
        </b-btn>

        <b-dropdown id="ddown-dropup" dropup variant="secondary" class=" mx-auto ml-2 mr-2">
          <template slot="button-content">
            <i class="fa fa-eye"></i>
          </template>
          <b-dropdown-item @click="visible.mask = !visible.mask">
            <i class="fa fa-check" aria-hidden="true" v-if="visible.mask"></i>
            Mask
          </b-dropdown-item>
          <b-dropdown-item @click="visible.contour = !visible.contour">
            <i class="fa fa-check" aria-hidden="true" v-if="visible.contour"></i>
            Contour
          </b-dropdown-item>
        </b-dropdown>

        <b-btn variant="success" @click="vote(1)" class=" mx-auto ml-3 mr-3">
          Submit <i class="fa fa-arrow-right"></i>
        </b-btn>
      </div>
    </div>
    <p v-if="!playMode" class="mt-3 pt-3 mb-3 pb-3 mt-3 pt-3">{{widgetSummary}}</p>



  </div>
</template>

<script>
/**
 * This widget is to annotate the X, Y coordinate of an image. It is still
 * a **work in progress** and not ready to be used yet.
 */
  import _ from 'lodash';
  import vueSlider from 'vue-slider-component';
  import Paper from './Tools/Paper';


  export default {
    name: 'ImageSplat',
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
     * This one keeps track of the number of users who annotated points,
     * and the number of points they annotated
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
      * Tells the widget if it should be in a "play mode" or maybe a "review mode".
      */
      playMode: {
        type: String,
        required: false,
      },
     /**
      * Tells the widget to display a tutorial step.
      * **TODO**: this part is not implemented yet.
      */
      tutorialStep: {
        type: Number,
        required: false,
      },
    },
    data() {
      return {
        /**
         * how to display an overlay image.
         */
        overlayStyle: {
          opacity: 0.5,
        },
        /**
         * whether the mask and contour image should be visible
         */
        visible: {
          mask: true,
          contour: true,
        },
        /**
         * base image brightness, 0-100
         */
        brightness: 50,
        /**
         * base image contrast, 0-100
         */
        contrast: 50,
        /**
         * sliderbar options for both the brightness and contrast UI.
         */
        brightnessOptions: {
          eventType: 'auto',
          width: 'auto',
          height: 6,
          dotSize: 16,
          dotHeight: null,
          dotWidth: null,
          min: 0,
          max: 100,
          interval: 1,
          show: true,
          speed: 0.5,
          disabled: false,
          piecewise: false,
          piecewiseStyle: {},
          piecewiseLabel: false,
          tooltip: false,
          tooltipDir: 'top',
          reverse: false,
          data: null,
          clickable: true,
          realTime: true,
          lazy: true,
          formatter: null,
          bgStyle: null,
          sliderStyle: null,
          processStyle: {
            'background-color': '#17a2b8',
          },
          piecewiseActiveStyle: null,
          tooltipStyle: null,
          labelStyle: null,
          labelActiveStyle: null,
        },
      };
    },
    mounted() {
      // if (this.userSettings.brightness) {
      //   this.brightness = this.userSettings.brightness;
      // }
      // if (this.userSettings.contrast) {
      //   this.contrast = this.userSettings.contrast;
      // }
      // this.mounted = true;
    },
    components: {
      Paper,
      vueSlider,
    },
    computed: {
      /**
      * Compute the maskURL based on baseUrlTemplate and delimiter of the widgetProperties,
      * and the widgetPointer. For example a widgetPointer="contrast1__image1" could be
      * mapped to https://base_url/contrast1/image1.jpg if
      * baseUrlTemplate = 'https://base_url/{0}/{1}.jpg' and delimiter === '__'.
       */
      maskUrl() {
        return this.widgetProperties.maskUrlTemplate && this.widgetPointer ?
          this.fillPropertyPattern(this.widgetProperties.maskUrlTemplate,
          this.widgetProperties.delimiter) : null;
      },
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
      * Compute the contourURL based on baseUrlTemplate and delimiter of the widgetProperties,
      * and the widgetPointer. For example a widgetPointer="contrast1__image1" could be
      * mapped to https://base_url/contrast1/image1.jpg if
      * baseUrlTemplate = 'https://base_url/{0}/{1}.jpg' and delimiter === '__'.
       */
      contourUrl() {
        return this.widgetProperties.contourUrlTemplate && this.widgetPointer ?
          this.fillPropertyPattern(this.widgetProperties.contourUrlTemplate,
          this.widgetProperties.delimiter) : null;
      },
    },
    watch: {
      // userSettings: {
      //   handler() {
      //     if (this.userSettings.brightness) {
      //       this.brightness = this.userSettings.brightness;
      //     }
      //     if (this.userSettings.contrast) {
      //       this.contrast = this.userSettings.contrast;
      //     }
      //   },
      //   deep: true,
      // },
    },
    methods: {
      /**
      *
      */
      setUserSettings() {
        this.contrast = this.userSettings.contrast || 50;
        this.brightness = this.userSettings.brightness || 50;
      },
      /**
       * undo the last annotation
       */
      undo() {
        this.$refs.paper.undo();
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
       * get the score based on the user's response
       */
      getScore(response) {
        const fb = this.getFeedback(response);
        if (fb.variant === 'danger') {
          return 0;
        }
        return 1;
      },
      /**
       * get feedback to show user based on the user's response
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
          const nPoints = widgetSummary.points.length;
          const pointRatio = nPoints / widgetSummary.count;

          if (pointRatio >= 0.7 && !response.length) {
            // on average, most people gave this sample some points. If you didn't, lose a point
            return {
              show: false,
              variant: 'danger',
              message: '+0 you missed some points',
            };
          } else if (pointRatio <= 0.3 && response.length) {
            // on average, most people did not mark this image, but you did
            return {
              show: false,
              variant: 'danger',
              message: '+0 you did not need to mark points',
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
       * get the new widget's summary based on the user's response.
       * here we keep track of the x,y coordatinates annotated
       */
      getSummary(response) {
        // this widget will keep track of
        // the number of times the widget is seen (count)
        // and also its associated points.
        if (!this.widgetSummary) {
          // the summary isn't initialized yet
          return {
            points: [response],
            count: 1,
          };
        }

        const newPoints = this.widgetSummary.points;
        newPoints.push([response]);

        return {
          points: newPoints,
          count: this.widgetSummary.count + 1,
        };
      },
      /**
       * get a list of the annotated coordinates in the form [{x:, y:}]
       */
      getSplatPoints() {
        /* eslint-disable */
        return _.map(this.$refs.paper.draw.points, (v) => {
          return { x: v.x, y: v.y };
        /* eslint-enable */
        });
      },
      /**
       * emit to the parent component the user's response.
       */
      vote() {
        this.$emit('updateUserSettings', {
          brightness: this.brightness,
          contrast: this.contrast,
        });
        this.$emit('widgetRating', this.getSplatPoints());
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
          maskUrlTemplate: {
            type: String,
            required: true,
            description: 'base url to the mask file',
          },
          contourUrlTemplate: {
            type: String,
            required: true,
            description: 'base url to the contour file',
          },
          delimiter: {
            type: String,
            required: false,
            default: '__',
            description: 'how to split the sample ID to fill in the template',
          },
        };
      },
      /**
      * Test all the lines of this widget.
      */
      test() {
        const response0 = [];
        const response1 = [{ x: 0, y: 0 }];
        this.getScore(response0);
        this.getScore(response1);
        this.getFeedback(response1);
        this.getFeedback(response0);
        this.getSummary(response1);
        this.getSummary(response0);
        this.vote(response1);
        this.vote(response0);
        this.getPropertiesSchema();
        return 1;
      },
    },
  };
</script>

<style scoped>
  .parent {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100% - 156px);
    background-color: white;
    border: 1px solid #ccc;
    padding: 8px;
    box-shadow: 0 2px 5px 0 #ccc;
  }

  .user-card {
    max-width: 100%;
  }

  .baseImage {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    max-width: 500px;
  }
  .overlay {
    position: absolute;
    top: 0px;
    width: 100%;
    max-width: 500px;
  }

  .paper {
    min-height: 100%;
    max-height: 100%;
    height: 100%;
    min-width: 100%;
    max-width: 100%;
    background-color: black;
  }

  .paper canvas {
    display: block;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  .imageSplat {
    width: inherit;
    height: calc(100vh - 56px);
    overflow-y: hidden;
  }
</style>
