<template>
  <!-- This is a dummy Widget Template -->
  <div class="widgetTemplate">
    <div v-if="status === 'ready'">
      <!-- <b-row>
        <b-col>
        </b-col>
      </b-row> -->

      <b-row>
        <b-col>
          <b-row>
            <b-col>
              <h3>{{firstName}} {{middleName}} {{lastName}} </h3>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="text-center">
              <p>{{country}}</p>
              <p>{{university}}</p>
              <p>{{position}}</p>
              <p>{{gender}}</p>
            </b-col>
          </b-row>

          <b-row>
            <b-col class="text-justify">
              <p><b>Programming:</b> {{programmingExp}}</p>
              <p><b>Statement:</b> {{statement}}</p>
              <p><b>CV:</b> <a :href="cv">{{cv}}</a></p>
            </b-col>
          </b-row>
        </b-col>
      </b-row>


    </div>

    <Bookshelf v-else />

    <div v-if="playMode && status === 'ready'">
      <!-- <b-btn variant="danger" @click="vote(0)" class="mx-auto ml-3 mr-3">Vote No</b-btn>
      <b-btn variant="info" :to="'/review/' + widgetPointer" class="mx-auto ml-3 mr-3" >Help</b-btn>
      <b-btn variant="success" @click="vote(1)" class="mx-auto ml-3 mr-3">Vote Yes</b-btn> -->
    
      <div  class="row w-50 mx-auto">
        <b-col>
        <p>Computational Score </p>
        <vue-slider v-model="evalCriteria.computational" v-bind="sliderOptions"></vue-slider>
        </b-col>
      </div>

      <div  class="row w-50 mx-auto">
        <b-col>
        <p>Neuroscience Score </p>
        <vue-slider v-model="evalCriteria.neuroscience" v-bind="sliderOptions"></vue-slider>
        </b-col>
      </div>

      <div  class="row w-50 mx-auto">
        <b-col>
          <p>Statement Score </p>
          <vue-slider v-model="evalCriteria.statement" v-bind="sliderOptions"></vue-slider>
        </b-col>
      </div>


      <b-row class="mt-3 mb-3">
        <b-col>
          <b-button variant="danger" @click="skip"> Conflict of Interest </b-button>
          <b-button variant="primary" @click="vote"> Submit </b-button>
        </b-col>
      </b-row>
    
    </div>

  </div>
</template>

<script>
import firebase from 'firebase';
import axios from 'axios';
import vueSlider from 'vue-slider-component';
import Bookshelf from '../Animations/Bookshelf';

window.axios = axios;


/**
 * This is a dummy widget template, for widget developers to use as a base to start
 * developing a new annotation widget.
 */
export default {
  name: 'NHAWidget',
  components: {
    vueSlider,
    Bookshelf,
  },
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
      applicantData: {},
      status: 'loading',
      cvdata: '',
      evalCriteria: {
        neuroscience: 5,
        statement: 5,
        computational: 5,
      },
      sliderOptions: {
        value: 5,
        tooltip: 'always',
        disabled: false,
        piecewise: true,
        piecewiseLabel: true,
        data: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        ],
        piecewiseStyle: {
          backgroundColor: '#ccc',
          visibility: 'visible',
          width: '12px',
          height: '12px',
        },
        piecewiseActiveStyle: {
          backgroundColor: '#3498db',
        },
        labelActiveStyle: {
          color: '#3498db',
        },
      },
    };
  },
  computed: {
    firstName() {
      return this.applicantData['First Name'];
    },
    lastName() {
      return this.applicantData['Last Name'];
    },
    middleName() {
      return this.applicantData['Middle Name'];
    },
    university() {
      return this.applicantData['Academic Institution'];
    },
    country() {
      return this.applicantData.Country;
    },
    position() {
      return this.applicantData['What is your current position?'];
    },
    programmingExp() {
      // eslint-disable-next-line
      return this.applicantData[`Please briefly tell us about your programming skills and experience (max 200 words). We strongly encourage you to include links to any code you have online (e.g., a GitHub account if you have one)`];
    },
    statement() {
      return this.applicantData['No Label'];
    },
    cv() {
      return this.applicantData['Please upload a copy of your CV (pdf format)'];
    },
    gender() {
      return this.applicantData.Gender;
    },
  },
  watch: {
    widgetPointer() {
      this.getApplicantData();
    },
  },
  mounted() {
    this.getApplicantData();
  },
  methods: {
    /**
     * gets the applicant data
     */
    getApplicantData() {
        // Create a root reference
      this.status = 'loading';
      const storageRef = firebase.storage().ref();
      // Create a reference to 'mountains.jpg'
      const applicantRef = storageRef.child(`${this.widgetPointer}.json`);
      applicantRef.getDownloadURL().then((url) => {
        axios.get(`https://cors-anywhere.herokuapp.com/${url}`).then((resp) => {
          this.applicantData = resp.data;
          this.status = 'ready';
        });
      });
    },
    /**
     * reset the sliders; scroll to top.
     */
    reset() {
      window.scrollTo(0, 0);
      this.evalCriteria = {
        neuroscience: 0,
        statement: 0,
        computational: 0,
      };
    },
    /**
     * all widgets should have a getScore method, based on the user's response
     */
    getScore() {
      return 1;
    },
    /**
     * all widgets should have a getFeedback method, based on the user's response.
     * this is what the user will see once they respond.
     */
    getFeedback() {
      return {
        show: true,
        variant: 'success',
        message: 'thanks!',
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
    getSummary() {
      return {};
    },
    /**
     * all widgets should have a vote method, that emits a response to the parent component.
     */
    vote() {
      this.$emit('widgetRating', this.evalCriteria);
      this.reset();
    },
    /**
     * skip because of COI
     */
    skip() {
      this.$emit('skip');
      this.reset();
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
