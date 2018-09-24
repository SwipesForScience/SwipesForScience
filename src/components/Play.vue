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

      <div v-if="sampleCounts.length">
        <div v-if="!widgetPointer">
          loading...
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

      <div v-else>
        <h1>There is no data in your database!</h1>
        <p class="lead">Follow the instructions to set up your SwipesForScience App</p>
        <img class="blankImage" :src="blankImage" alt="there is no data" />
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
  }

  .blankImage {
    max-width: 100%;
  }

</style>

<script>
  import _ from 'lodash';
  import { db } from '../firebaseConfig';
  import config from '../config';
  import WidgetSelector from './WidgetSelector';

  export default {
    name: 'play',
    firebase: {
      sampleCounts: {
        source: db.ref('sampleCounts'),
        asObject: false, // keep it bound as a list
        readyCallback() {
          this.startTime = new Date();
          this.setNextSampleId();
        },
      },
      // userSeenSamples: db.ref('doneSamples').child(this.userInfo.displayName),
    },
    props: ['userInfo', 'userData', 'levels', 'currentLevel'],
    data() {
      return {
        startTime: null,
        dismissSecs: 1,
        dismissCountDown: 0,
        feedback: {
          variant: 'warning',
          message: '',
        },
        status: 'loading',

        // if there is no data loaded, show an image from the config.
        blankImage: config.play.blankImage,

        // type of widget, named exactly how it is in the Widgets folder
        widgetType: config.widgetType,

        // specific properties for a widget
        widgetProperties: config.widgetProperties,

        // widgetPointer is a pointer to the keys in sampleCounts, sampleSummary, and sampleChats
        widgetPointer: null,

        // widget summary comes from firebase when the widget Pointer is set.
        widgetSummary: {},

        // get this data from the firebase database
        // sampleCounts: [],
        // userSeenSamples: [],
      };
    },
    watch: {
      currentLevel() {
        if (this.userData.score === this.currentLevel.min && this.currentLevel.min) {
          this.$refs.levelUp.show();
          db.ref(`/users/${this.userInfo.displayName}`).child('level').set(this.currentLevel.level);
        }
      },
      widgetPointer() {
        /* eslint-disable */
        this.widgetPointer ? db.ref('sampleSummary').child(this.widgetPointer).once('value', (snap) => {
          this.widgetSummary = snap.val();
        }) : null;
        /* eslint-enable */
      },
    },
    mounted() {
      // this.startTime = new Date();
      // this.setNextSampleId();
    },
    components: { WidgetSelector },
    directives: {

    },
    computed: {
      samplePriority() {
        return _.sortBy(this.sampleCounts, '.value');
      },
    },
    methods: {
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

      sampleUserPriority() {
        // A method that returns an array of samples prioritized by
        // the least seen overall and by the user

        // if the user is logged in then,
        if (this.userInfo) {
          // remove all the samples that the user has seen
          let samplesRemain;
          if (this.userSeenSamples) {
            // if the user has seen some samples, remove them
            samplesRemain = _.filter(this.samplePriority,
              v => Object.keys(this.userSeenSamples).indexOf(v['.key']) < 0);

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
        this.updateCount();

        // 3. set the next Sample
        this.setNextSampleId();
      },

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

      sendVote(response, time) {
        // the user's response for the sample is sent to the db
        // along with their user displayName and the time they took to respond.
        db.ref('votes').push({
          user: this.userInfo.displayName,
          sample: this.widgetPointer,
          response,
          time,
        });
      },

      updateScore(scoreIncrement) {
        // this method update's the user's score by scoreIncrement;

        db.ref('users')
          .child(this.userInfo.displayName)
          .child('score')
          .transaction(score => (score || 0) + scoreIncrement);
      },

      updateCount() {
        db.ref('sampleCounts')
          .child(this.widgetPointer)
          .transaction(count => (count || 0) + 1);
      },

      countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown;
      },

      showAlert() {
        this.dismissCountDown = this.dismissSecs;
      },
    },
  };
</script>