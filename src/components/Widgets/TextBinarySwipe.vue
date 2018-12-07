<template>
  <!-- This is a dummy Widget Template -->
  <div class="widgetTemplate pb-3">
    <div class="bg-light pt-3 pb-3 pl-3 pr-3 choicemenu" v-if="playMode">
      <div class="container">
        <div class="row" v-if="playMode">
          <b-btn size="lg" variant="danger" @click="vote(0)" class="mx-auto ml-3 mr-3 bigbutton">
            {{widgetProperties.leftSwipeLabel}}
          </b-btn>
          <b-btn size="lg" variant="success" @click="vote(1)" class="mx-auto ml-3 mr-3 bigbutton">
            {{widgetProperties.rightSwipeLabel}}
          </b-btn>
        </div>
        <div>
        </div>
      </div>
    </div>

    <transition name="fadeOne" mode="out-in">
      <h4 :key="title">{{title}}</h4>
    </transition>
    <transition name="fadeOne" mode="out-in">
      <p v-html="text" class="text-left mb-3" style="white-space: pre-line;" :key="text"></p>
    </transition>
    <b-btn size="sm" variant="info" :to="'/review/' + widgetPointer" class="mx-auto ml-3 mr-3 mb-3 mt-3" >
      Not sure? Discuss!
    </b-btn>


  </div>
</template>

<script>
import axios from 'axios';
import _ from 'lodash';

/**
 * This is a dummy widget template, for widget developers to use as a base to start
 * developing a new annotation widget.
 */
export default {
  name: 'TextBinarySwipe',
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
      /**
      * this is filled by the getData method that
      * runs when this component's widgetPointer changes
      */
      data: {},
      /**
      * this is for vue-tags-input.
      */
      tag: '',
      tags: [],
      /**
      *
      */
      previousTags: [],
    };
  },
  components: {
  },
  watch: {
    widgetPointer() {
      this.getData();
    },
  },
  computed: {
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
    * returns the text based on config.titleKey
    */
    title() {
      return this.data[this.widgetProperties.titleKey];
    },
    /**
    * returns the text based on config.textKey
    */
    text() {
      return this.data[this.widgetProperties.textKey];
    },
    /**
    *
    */
    autocompleteItems() {
      // eslint-disable-next-line
      return _.filter(_.map(_.uniq(this.widgetProperties.autoComplete.concat(this.previousTags)), (c) => {
        return { text: c };
      }),
        f => new RegExp(this.tag, 'i').test(f.text));
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    /**
    * get the data from the baseURLTemplate defined in config.
    */
    getData() {
      axios.get(this.baseUrl).then((resp) => {
        this.data = resp.data;
      });
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
    vote(resp) {
      this.$emit('widgetRating', resp);
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

.choicemenu
  {
    left: 0px;
    width: 100%;
    z-index: 999;
    bottom: 0;
    /* position: sticky;
    position: -webkit-sticky; */
    position: fixed;
    margin-bottom: 0;
}

.bigbutton {
  width: 45%;
  max-width: 200px;
}

.fadeOne-enter-active, .fadeOne-leave-active {
  transition: opacity 0.5s;
}
.fadeOne-enter, .fadeOne-leave-to {
  opacity: 0;
}

</style>
