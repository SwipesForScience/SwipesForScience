<template>
  <!-- This is a dummy Widget Template -->
  <div class="widgetTemplate">

    <p class="lead mb-3 pb-3 mt-3 pt-3">{{widgetPointer}}</p>

    <p v-if="!playMode" class="mb-3 pb-3 mt-3 pt-3">{{widgetSummary}}</p>

    <div class="row" v-if="playMode">
      <b-btn variant="danger" @click="vote(0)" class="mx-auto ml-3 mr-3">Vote No</b-btn>
      <b-btn variant="info" :to="'/review/' + widgetPointer" class="mx-auto ml-3 mr-3" >Help</b-btn>
      <b-btn variant="success" @click="vote(1)" class="mx-auto ml-3 mr-3">Vote Yes</b-btn>
    </div>

  </div>
</template>

<script>
/**
 * TODO: fill this in.
 */
  export default {
    props: {
       /**
        * TODO: fill this in.
        */
      widgetPointer: {
        type: String,
        required: true,
      },
      /**
       * TODO: fill this in.
       */
      widgetProperties: {
        type: Object,
        required: true,
      },
      /**
       * TODO: fill this in.
       */
      widgetSummary: {
        type: Object,
        required: false,
      },
      /**
       * TODO: fill this in.
       */
      playMode: {
        type: String,
        required: false,
      },
      /**
       * TODO: fill this in.
       */
      tutorialStep: {
        type: Number,
        required: false,
      },
    },
    data() {
      return {

      };
    },
    methods: {
      /**
       * TODO: fill this in.
       */
      getScore(response) {
        if (response) {
          return 1;
        }
        return 0;
      },
      /**
       * TODO: fill this in.
       */
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
      /**
       * TODO: fill this in.
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
       * TODO: fill this in.
       */
      vote(val) {
        this.$emit('widgetRating', val);
      },
    },
  };
</script>

<style>

</style>
