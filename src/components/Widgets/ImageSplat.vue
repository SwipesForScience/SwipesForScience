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
          <div class="col-11">
            <vue-slider ref="slider1" v-model="brightness" v-bind="brightnessOptions">
            </vue-slider>
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-1 col-xs-2">
            <i class="fa fa-adjust"></i>
          </div>
          <div class="col-11 col-xs-10">
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
  import Vue from 'vue';
  import { ResizeObserver } from 'vue-resize';
  import 'vue-resize/dist/vue-resize.css';
  import Paper from './Tools/Paper';
  import vueSlider from 'vue-slider-component';

  Vue.component('resize-observer', ResizeObserver);

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
      // const width = this.$refs.baseImage.clientWidth;
      // this.overlayStyle.left = `calc(50% - ${width}px)`;
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
        if (response) {
          return 1;
        }
        return 0;
      },
      getFeedback(response) {
        if (response) {
          return {
            show: true,
            variant: 'success',
            message: 'good job',
          };
        }

        return {
          show: true,
          variant: 'danger',
          message: 'bad job',
        };
      },
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
    },
  };
</script>

<style>
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
