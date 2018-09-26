<template>
  <!-- This is a dummy Widget Template -->
  <div class="imageSplat">

    <div class="parent">
      <resize-observer @notify="onresize" />
      <Paper :paperSrc="baseUrl"
             :maskSrc="maskUrl"
             :contourSrc="contourUrl"
             id="baseImage"/>
      <!-- <img ref="baseImage" id="baseImage" class="baseImage" :src="baseUrl">
      <img class="overlay mask" :style="overlayStyle" :src="maskUrl">
      <img class="overlay contour" :style="overlayStyle" :src="contourUrl"> -->

    </div>
    <p v-if="!playMode" class="mt-3 pt-3 mb-3 pb-3 mt-3 pt-3">{{widgetSummary}}</p>

    <div class="row mb-3 pb-3" v-if="playMode">
      <b-btn variant="danger" @click="vote(0)" class="mx-auto ml-3 mr-3">Vote No</b-btn>
      <b-btn variant="info" :to="'/review/' + widgetPointer" class="mx-auto ml-3 mr-3" >Help</b-btn>
      <b-btn variant="success" @click="vote(1)" class="mx-auto ml-3 mr-3">Vote Yes</b-btn>
    </div>

  </div>
</template>

<script>
  import _ from 'lodash';
  import Vue from 'vue';
  import { ResizeObserver } from 'vue-resize';
  import 'vue-resize/dist/vue-resize.css';
  import Paper from './Tools/Paper';

  Vue.component('resize-observer', ResizeObserver);

  export default {
    props: ['widgetPointer', 'widgetProperties', 'widgetSummary', 'playMode'],
    data() {
      return {
        overlayStyle: {
          opacity: 0.5,
        },
      };
    },
    mounted() {
      // const width = this.$refs.baseImage.clientWidth;
      // this.overlayStyle.left = `calc(50% - ${width}px)`;
    },
    components: {
      Paper,
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
      onresize() {
        // const width = this.$refs.baseImage.clientWidth;
        // this.overlayStyle.left = `calc(50% - ${width}px)`;
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
    background-color: black;
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

  canvas {
    display: block;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  /* .imageSplat {
    width: inherit;
    height: calc(100vh - 56px);
    overflow-y: hidden;
  } */
</style>
