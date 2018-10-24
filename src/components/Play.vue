<template name="play">
  <div id="play" class="container">
    <!-- Modal Component -->
    <b-modal id="levelUp" ref="levelUp" title="You've Levelled Up!" ok-only>
      <div class="my-4">
        <h3>Level {{currentLevel.level}}</h3>
        <img :src="currentLevel.img" width="120px" height="120px"/>
        <p class="lead">You've unlocked: {{currentLevel.character}}</p>
      </div>
    </b-modal>

    <div class="main">

      <b-alert :show="dismissCountDown"
         :variant="feedback.variant"
         class="toast"
         @dismissed="dismissCountdown=0"
         @dismiss-count-down="countDownChanged">
         {{feedback.message}}
      </b-alert>

      <div v-if="noData">
        <h1>There is no data in your database!</h1>
        <p class="lead">Follow the instructions to set up your SwipesForScience App</p>
        <img class="blankImage" :src="blankImage" alt="there is no data" />
      </div>

      <div>
        <div v-if="!widgetPointer">
          <Flask />
          <p class="mt-3 pt-3 lead">loading...</p>
        </div>

        <WidgetSelector
         v-else
         :widgetType="widgetType"
         :widgetPointer="widgetPointer"
         :widgetProperties="widgetProperties"
         :widgetSummary="widgetSummary"
         v-on:widgetRating="sendWidgetResponse"
         :playMode='true'
         ref="widget"
        />
      </div>



    </div>

  </div>
</template>

<style>
  /*https://github.com/pudymody/tinderSwipe/blob/gh-pages/style.css*/

  .main {
    min-height: 100vh;
  }

  .toast {
    width: auto;
    max-width: 200px;
    top: 60px;
    left: 0;
    margin: auto;
    position: absolute;
    right: 0;
    z-index: 999;
  }

  .blankImage {
    max-width: 500px;
  }

</style>

<script>
  /**
   * TODO: fill this in.
   */
  import _ from 'lodash';
  import WidgetSelector from './WidgetSelector';
  import Flask from './Animations/Flask';

  export default {
    name: 'play',
    props: {
      /**
       * the authenticated user object from firebase
       */
      userInfo: {
        type: Object,
        required: true,
      },
      /**
       * the computed user data object based on userInfo
       */
      userData: {
        type: Object,
        required: true,
      },
      /**
       * the various levels, the points need to reach the levels,
       * and the badges (colored and greyed out) to display
       */
      levels: {
        type: Object,
        required: true,
      },
      /**
       * the user's current level
       */
      currentLevel: {
        type: Object,
        required: true,
      },
      /**
       * The config object that is loaded from src/config.js.
       * It defines how the app is configured, including
       * any content that needs to be displayed (app title, images, etc)
       * and also the type of widget and where to update pointers to data
       */
      config: {
        type: Object,
        required: true,
      },
      /**
       * the intialized firebase database
       */
      db: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        /**
         * keep track of the time a user took to vote on a sample
         */
        startTime: null,
        /**
         * flags for the small toast that shows feedback
         */
        dismissSecs: 1,
        /**
         * flags for the small toast that shows feedback
         */
        dismissCountDown: 0,

        /**
         * feedback will be filled by the widget component
         * for now its initialized here
         */
        feedback: {
          variant: 'warning',
          message: '',
        },

        /**
         * status flag that is set to "complete" when the firebase keys are filled.
         */
        status: 'loading',

        /**
         * these keys will be filled by firebase when the component is mounted
         */
        sampleCounts: [],
        userSeenSamples: [],

        /**
         * if sampleCounts is empty after its fetched from the db, then noData
         * flag is set to true. TODO: prompt the user to the setup instructions
         */
        noData: false,

        /**
         * widgetPointer is a pointer to the keys in sampleCounts, sampleSummary, and sampleChats
         */
        widgetPointer: null,

        /**
         * widget summary comes from firebase when the widget Pointer is set.
         */
        widgetSummary: {},
      };
    },
    watch: {
      /**
       * TODO: fill this in.
       */
      currentLevel() {
        if (this.userData.score === this.currentLevel.min && this.currentLevel.min) {
          this.$refs.levelUp.show();
          this.db.ref(`/users/${this.userInfo.displayName}`).child('level').set(this.currentLevel.level);
        }
      },
      /**
       * TODO: fill this in.
       */
      widgetPointer() {
        /* eslint-disable */
        this.widgetPointer ? this.db.ref('sampleSummary').child(this.widgetPointer).once('value', (snap) => {
          this.widgetSummary = snap.val();
        }) : null;
        /* eslint-enable */
      },
    },
    /**
     * TODO: fill this in.
     */
    mounted() {
      this.initSampleCounts();
      this.initSeenSamples();
    },
    components: {
      WidgetSelector,
      Flask,
    },
    computed: {
      /**
       * TODO: fill this in.
       */
      samplePriority() {
        return _.sortBy(this.sampleCounts, '.value');
      },
      /**
       * if there is nothing in the database, display a blank image
       */
      blankImage() {
        return this.config.play.blankImage;
      },
      /**
       * type of widget, named exactly how it is in the Widgets folder
       */
      widgetType() {
        return this.config.widgetType;
      },
      /**
       * specific properties for a widget
       */
      widgetProperties() {
        return this.config.widgetProperties;
      },
    },
    methods: {
      /**
       * TODO: fill this in.
       */
      initSampleCounts() {
        this.db.ref('sampleCounts').once('value', (snap) => {
          /* eslint-disable */
          this.sampleCounts = _.map(snap.val(), (val, key) => {
            return { '.key': key, '.value': val };
          });
          /* eslint-enable */
          if (!this.sampleCounts.length) {
            this.noData = true;
          } else {
            this.startTime = new Date();
            this.setNextSampleId();
          }
        });
      },
      /**
       * TODO: fill this in.
       */
      initSeenSamples() {
        this.db.ref('userSeenSamples')
          .child(this.userInfo.displayName)
          .once('value', (snap) => {
            /* eslint-disable */
            this.userSeenSamples = _.map(snap.val(), (val, key) => {
              return { '.key': key, '.value': val };
            });
            /* eslint-enable */
          });
      },
      /**
       * TODO: fill this in.
       */
      shuffle(array) {
        // a method to shuffle an array, from
        // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        let currentIndex = array.length;
        let temporaryValue;
        let randomIndex;
        // While there remain elements to shuffle...
        while (currentIndex !== 0) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          /* eslint-disable */
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
          /* eslint-enable */
        }
        return array;
      },
      /**
       * TODO: fill this in.
       */
      sampleUserPriority() {
        // A method that returns an array of samples prioritized by
        // the least seen overall and by the user

        // if the user is logged in then,
        if (this.userInfo) {
          // remove all the samples that the user has seen
          let samplesRemain;
          if (this.userSeenSamples) {
            // if the user has seen some samples, remove them
            const userSeenList = _.map(this.userSeenSamples, s => s['.key']);
            samplesRemain = _.filter(this.samplePriority,
              v => userSeenList.indexOf(v['.key']) < 0);

            // but if the user has seen everything,
            // return the total sample priority
            samplesRemain = samplesRemain.length ? samplesRemain : this.samplePriority;
          } else {
            // the user hasn't seen anything yet, so all samples remain
            samplesRemain = this.samplePriority;
          }

          if (samplesRemain.length) {
            // some samples remain to be seen.
            // get the smallest value that hasn't been seen by user yet.
            // samplesRemain is sorted, so the first value has been seen the
            // least number of times.
            const minUnseen = samplesRemain[0]['.value'];
            // then filter the rest of the samples
            // so they are only the smallest seen value;
            const samplesSmallest = _.filter(samplesRemain, c => c['.value'] === minUnseen);
            // and then randomize the order;
            return this.shuffle(samplesSmallest);
          }

          // TODO: check whether we actually hit this line. If we don't, remove it.
          return this.shuffle(this.samplePriority);
        }
        // if samplePriority was empty the whole time, return null
        return null;
      },
      /**
       * TODO: fill this in.
       */
      sendWidgetResponse(response) {
        // this method is called from the child widget
        // it will first get feedback from the child on the response
        // next, it will send the user response to the db
        // then it will update the user's score and the sample's view count
        // last, it will set the next sample.

        // 1. get feedback from the widget, and display if needed
        const feedback = this.$refs.widget.getFeedback(response);
        if (feedback.show) {
          this.feedback = feedback;
          this.showAlert();
        }

        // 2. send the widget data
        const timeDiff = new Date() - this.startTime;
        this.sendVote(response, timeDiff);

        // 3. update the score and count for the sample
        this.updateScore(this.$refs.widget.getScore(response));
        this.updateSummary(this.$refs.widget.getSummary(response));
        this.updateCount();
        this.updateSeen();

        // 3. set the next Sample
        this.setNextSampleId();
      },
      /**
       * TODO: fill this in.
       */
      setNextSampleId() {
        // method to get the next sample id to show in the widget
        // view time gets reset first, then the new sample is found and set.

        this.startTime = new Date();

        const sampleId = this.sampleUserPriority()[0];

        // if sampleId isn't null, set the widgetPointer
        if (sampleId) {
          this.widgetPointer = sampleId['.key'];
        }
      },
      /**
       * TODO: fill this in.
       */
      sendVote(response, time) {
        // the user's response for the sample is sent to the db
        // along with their user displayName and the time they took to respond.
        this.db.ref('votes').push({
          user: this.userInfo.displayName,
          sample: this.widgetPointer,
          response,
          time,
        });
      },
      /**
       * TODO: fill this in.
       */
      updateScore(scoreIncrement) {
        // this method update's the user's score by scoreIncrement;

        this.db.ref('users')
          .child(this.userInfo.displayName)
          .child('score')
          .transaction(score => (score || 0) + scoreIncrement);
      },
      /**
       * TODO: fill this in.
       */
      updateSummary(summary) {
        this.db.ref('sampleSummary')
          .child(this.widgetPointer)
          .set(summary);
      },
      /**
       * TODO: fill this in.
       */
      updateCount() {
        // update the firebase database copy
        this.db.ref('sampleCounts')
          .child(this.widgetPointer)
          .transaction(count => (count || 0) + 1);

        // update the local copy
        _.map(this.sampleCounts, (val) => {
          if (val['.key'] === this.widgetPointer) {
            /* eslint-disable */
            val['.value'] += 1;
            /* eslint-enable */
          }
        });
      },
      /**
       * TODO: fill this in.
       */
      updateSeen() {
        // mark that this user has seen this widgetPointer
        // update the firebase database copy
        this.db.ref('userSeenSamples')
          .child(this.userInfo.displayName)
          .child(this.widgetPointer)
          .transaction(count => (count || 0) + 1);

        // update the local copy
        this.userSeenSamples.push({ '.key': this.widgetPointer, '.value': 1 });
      },
      /**
       * TODO: fill this in.
       */
      countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown;
      },
      /**
       * TODO: fill this in.
       */
      showAlert() {
        this.dismissCountDown = this.dismissSecs;
      },
    },
  };
</script>
