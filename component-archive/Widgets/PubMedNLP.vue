<template>
  <div class="widgetTemplate">
    <div v-if="status === 'ready'">
      <h5 class="lead mt-3 pt-3 pb-0 mb-0">{{title}}</h5>
      <!-- <p class="text-muted">{{authors}} ({{year}})</p> -->
      <p class="text-justify mb-3 pb-3 mt-1 pt-1">{{abstract}}</p>
    </div>
    <div v-else>
      <Bookshelf />
    </div>

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
 * This widget is still a **work in progress**, but is based off the
 * https://appstract.pub prototype to annotate sample size from text.
 * Right now, this is just a pass/fail annotation that displays the pubmed
 * abstract based on a pubmed ID
 */
  import axios from 'axios';
  import _ from 'lodash';
  import Bookshelf from '../Animations/Bookshelf';

  export default {
    name: 'PubMedNLP',
    props: {
      /**
       * the sample ID to display. In this case it should be a pubmed id.
       */
      widgetPointer: {
        type: String,
        required: true,
      },
     /**
      * the properties of the widget, that are widget specific.
      */
      widgetProperties: {
        type: Object,
        required: true,
      },
     /**
      * the summary data of the widget.
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
      * whether the widget should render in play mode, or review mode, or tutorial mode.
      */
      playMode: {
        type: String,
        required: false,
      },
     /**
      * this is not implemented yet, but will be used to keep track of and show off
      * the annotation features of this widget.
      */
      tutorialStep: {
        type: Number,
        required: false,
      },
    },
    data() {
      return {
        xmlString: '',
        status: 'loading',
      };
    },
    components: {
      Bookshelf,
    },
    computed: {
      /**
       * the parsed XML from pubmed
       */
      xml() {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(this.xmlString, 'text/xml');
        return xmlDoc;
      },
      /**
       * the pubmed abstract, extracted from the xml
       */
      abstract() {
        if (this.xml) {
          const elems = this.xml.getElementsByTagName('AbstractText');
          return _.map(elems, e => e.innerHTML).join('\n');
        }
        return null;
      },
      /**
       * the pubmed title, extracted from the xml
       */
      title() {
        if (this.xml) {
          const elems = this.xml.getElementsByTagName('ArticleTitle');
          return _.map(elems, e => e.innerHTML).join('\n');
        }
        return null;
      },
      /**
       * the pubmed author, extracted from the xml
       */
      authors() {
        if (this.xml) {
          const elems = this.xml.getElementsByTagName('Author');
          return _.map(elems, e => `${e.children[0].innerHTML}, ${e.children[1].innerHTML[0]}.`).join(', ');
        }
        return null;
      },
      /**
       * the publication year, extracted from the XML
       */
      year() {
        if (this.xml) {
          if (this.xml.getElementsByTagName('Year').length) {
            return this.xml.getElementsByTagName('Year')[0].innerHTML;
          }
        }
        return null;
      },
    },
    watch: {
      /**
       * if the widget pointer changes, update the pubmed data.
       */
      widgetPointer() {
        if (this.widgetPointer) {
          this.getPubmedData();
        }
      },
    },
    /**
     * when its mounted, update the pubmed data
     */
    mounted() {
      if (this.widgetPointer) {
        this.getPubmedData();
      }
    },
    methods: {
      /**
       * fetch the data from pubmed
       */
      getPubmedData() {
        this.status = 'loading';
        const template = this.widgetProperties.template ||
          this.getPropertiesSchema().template.default;
        axios.get(template.replace('{0}', this.widgetPointer))
          .then((resp) => {
            this.xmlString = resp.data;
            this.status = 'ready';
          });
      },
      /**
       * get the score based on the user's response
       */
      getScore(response) {
        if (response) {
          return 1;
        }
        return 0;
      },
      /**
       * get feedback based on the user's response. **work in progress**
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
       * get the new summary based on the user's response. This is a running average.
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
       * tell the parent component the user's annotation, so it can be saved.
       */
      vote(val) {
        this.$emit('widgetRating', val);
      },
      /**
       * This method should tell users how their widgetProperties configuration should be defined.
       */
      getPropertiesSchema() {
        return {
          template: {
            type: String,
            required: true,
            description: 'pubmed query template',
            default: 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id={0}&tool=appstract&email=keshavan@berkeley.edu&retmode=xml',
          },
        };
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
