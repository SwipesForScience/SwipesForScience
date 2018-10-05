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
             id="baseImage"/>
      <!-- <img ref="baseImage" id="baseImage" class="baseImage" :src="baseUrl">
      <img class="overlay mask" :style="overlayStyle" :src="maskUrl">
      <img class="overlay contour" :style="overlayStyle" :src="contourUrl"> -->
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
  import _ from 'lodash';
  import vueSlider from 'vue-slider-component';
  import Paper from './Tools/Paper';


  export default {
    props: ['widgetPointer', 'widgetProperties', 'widgetSummary', 'playMode'],
    data() {
      return {
        overlayStyle: {
          opacity: 0.5,
        },
        visible: {
          mask: true,
          contour: true,
        },
        brightness: 50,
        contrast: 50,
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

    },
    components: {
      Paper,
      vueSlider,
    },
    computed: {
      maskUrl() {
        return this.widgetProperties.maskUrlTemplate && this.widgetPointer ?
          this.fillPropertyPattern(this.widgetProperties.maskUrlTemplate,
          this.widgetProperties.delimiter) : null;
      },
      baseUrl() {
        return this.widgetProperties.baseUrlTemplate && this.widgetPointer ?
          this.fillPropertyPattern(this.widgetProperties.baseUrlTemplate,
          this.widgetProperties.delimiter) : null;
      },
      contourUrl() {
        return this.widgetProperties.contourUrlTemplate && this.widgetPointer ?
          this.fillPropertyPattern(this.widgetProperties.contourUrlTemplate,
          this.widgetProperties.delimiter) : null;
      },
    },
    methods: {
      undo() {
        this.$refs.paper.undo();
      },
      fillPropertyPattern(pattern, delimiter) {
        // fill the pattern by splitting the widgetPointer by delimiter
        let output = pattern;
        const parts = this.widgetPointer.split(delimiter);
        _.map(parts, (p, i) => {
          output = output.replace(`{${i}}`, p);
        });
        return output;
      },
      getScore(response) {
        const fb = this.getFeedback(response);
        if (fb.variant === 'danger') {
          return 0;
        }
        return 1;
      },
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
      getSplatPoints() {
        /* eslint-disable */
        return _.map(this.$refs.paper.draw.points, (v) => {
          return { x: v.x, y: v.y };
            /* eslint-enable */
        });
      },
      vote() {
        this.$emit('widgetRating', this.getSplatPoints());
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
