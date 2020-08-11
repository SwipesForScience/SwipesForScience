<template>
  <!-- This is a dummy Widget Template -->
  <div class="widgetTemplate">
    <b-card class="mb-3 stuck">
      <transition name="fadeOne" mode="out-in">
        <h3 class="smalltitle mb-3 pb-3 mt-3 pt-3" :key="widgetProperties.stages[currentStage].question">
          {{widgetProperties.stages[currentStage].question}}
        </h3>
      </transition>
    </b-card>

      <WidgetSelector
       :widgetType="widgetProperties.stages[currentStage].responseProperties.widgetType"
       :widgetPointer="widgetPointer"
       :widgetProperties="widgetProperties.stages[currentStage].responseProperties.widgetProperties"
       :userSettings="userSettings"
       :widgetSummary="widgetSummary"
       :playMode="playMode"
       v-on:widgetRating="saveResponse"
       v-on:updateUserSettings="updateUserSettings"
       />

      <p v-if="!playMode" class="mb-3 pb-3 mt-3 pt-3">{{widgetSummary}}</p>

  </div>
</template>

<script>
  import _ from 'lodash';
/**
 * This is a dummy widget template, for widget developers to use as a base to start
 * developing a new annotation widget.
 */
  export default {
    name: 'BranchingTemplateWidget',
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
        currentStage: 0,
        response: {},
      };
    },
    components: {
    },
    computed: {
      stages() {
        return this.widgetProperties.stages;
      },
    },
    watch: {
      widgetPointer() {
        this.currentStage = 0;
        this.response = {};
      },
    },
    methods: {
      /**
      * this method is called by default instead of vote.
      * We shouldn't submit the response until all branching logic is completed.
      */
      saveResponse(response) {
        this.response[this.stages[this.currentStage].id] = response;
        const action = this.evaluateStage();
        if (action) {
          this.vote(this.response);
        }
      },
      /**
      * a function that evaluates the stage based on this.response.
      * if there is nothing else to do, then we return 1. else, return 0
      * and set the next stage w/ this.currentStage
      */
      evaluateStage() {
        const completeStages = [];
        const todoStages = [];

        // loop through all the stages in widgetProperties
        // and figure out which ones need to be complated.
        _.map(this.stages, (stage, idx) => {
          const responseIDs = Object.keys(this.response);
          if (responseIDs.indexOf(stage.id) > -1) {
            // there is a response for this stage id.
            completeStages.push(idx);
          } else {
            // there is not a response yet for this stage id.
            // check to see if it should be shown.
            const showCriteria = this.testShowCriteria(stage);
            if (showCriteria) {
              todoStages.push(idx);
            }
          }
        });
        if (todoStages.length) {
          // there is still something left to do. Set the stage ID to
          // first todo
          this.currentStage = todoStages[0];
          return 0;
        }
        // there is nothing left to ask the user.
        return 1;
      },
      /**
      * a function that tests whether a given stage needs to be shown.
      */
      testShowCriteria(stage) {
        if (_.isEmpty(stage.showCriteria)) {
          return true;
        }
        const condition = stage.showCriteria.statement;
        const responseValue = this.response[stage.showCriteria.node];
        const testValue = stage.showCriteria.value;
        switch (condition) {
          case '==':
            return responseValue === testValue;
          case '>=':
            return responseValue >= testValue;
          case '<=':
            return responseValue <= testValue;
          case '!=':
            return responseValue !== testValue;
          default:
            return 0;
        }
      },
      /**
      * emit the widget's user settings to the parent
      */
      updateUserSettings(settings) {
        this.$emit('updateUserSettings', settings);
      },
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
        window.scrollTo(0, 0);
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

<style scoped>
  .smalltitle {
    /* font-size: 2em; */
    position: sticky;
    position: -webkit-sticky;
    background-color: white;
    top: 0
    /* font-variant-caps: all-petite-caps; */
  }

  .stuck {
    position: sticky;
    position: -webkit-sticky;
    top: 0px;
  }

  .fadeOne-enter-active, .fadeOne-leave-active {
    transition: opacity 0.5s;
  }
  .fadeOne-enter, .fadeOne-leave-to {
    opacity: 0;
  }
</style>
