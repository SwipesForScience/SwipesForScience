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
 * This is a dummy widget template, for widget developers to use as a base to start
 * developing a new annotation widget.
 */
  export default {
    name: 'TemplateWidget',
    props: {
       /**
        * a sample ID to display
        */
      widgetPointer: {
        type: String,
        required: true,
      },
      /**
       * properties of the widget, that are widget specific. the schema is up to you.
       */
      widgetProperties: {
        type: Object,
        required: true,
      },
      /**
       * annotaion summary for the widget, the schema is up to you.
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
       * variable to note wheter the widget should be in "play mode"
       * or "review mode" or "tutorial mode"
       */
      playMode: {
        type: String,
        required: false,
      },
      /**
       * variable to save the current tutorial step. Not used here.
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
       * all widgets should have a getScore method, based on the user's response
       */
      getScore(response) {
        if (response) {
          return 1;
        }
        return 0;
      },
      /**
       * all widgets should have a getFeedback method, based on the user's response.
       * this is what the user will see once they respond.
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
       * all widgets should have a get summary method, that updates the sample's
       * annotation summary based on the user's response. This can help you keep track
       * or summarize the annotations so far, and help you score a user's response based on
       * this summary. For example, if the summary keep track of a running average vote, then
       * you can use this method to score the user
       * (e.g if they don't agree with the running average).
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
       * all widgets should have a vote method, that emits a response to the parent component.
       */
      vote(val) {
        this.$emit('widgetRating', val);
      },
      /**
       * This method should tell users how their widgetProperties configuration should be defined.
       */
      getPropertiesSchema() {
        return {};
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
        this.getPropertiesSchema();
        return 1;
      },
    },
  };
</script>

<style>

</style>
