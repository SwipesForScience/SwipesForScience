<template>
  <!-- This is a dummy Widget Template -->
  <div class="widgetTemplate">
    <div v-if="status === 'ready'">
      <h4 class="lead mb-3 pb-3 mt-3 pt-3">{{title}}</h4>
      <p class="text-muted">{{authors}} ({{year}})</p>
      <p class="text-justify mb-3 pb-3 mt-3 pt-3">{{abstract}}</p>
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
 * TODO: fill this in.
 */
  import axios from 'axios';
  import _ from 'lodash';
  import Bookshelf from '../Animations/Bookshelf';

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
        xmlString: '',
        status: 'loading',
      };
    },
    components: {
      Bookshelf,
    },
    computed: {
      /**
       * TODO: fill this in.
       */
      xml() {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(this.xmlString, 'text/xml');
        return xmlDoc;
      },
      /**
       * TODO: fill this in.
       */
      abstract() {
        if (this.xml) {
          const elems = this.xml.getElementsByTagName('AbstractText');
          return _.map(elems, e => e.innerHTML).join('\n');
        }
        return null;
      },
      /**
       * TODO: fill this in.
       */
      title() {
        if (this.xml) {
          const elems = this.xml.getElementsByTagName('ArticleTitle');
          return _.map(elems, e => e.innerHTML).join('\n');
        }
        return null;
      },
      /**
       * TODO: fill this in.
       */
      authors() {
        if (this.xml) {
          const elems = this.xml.getElementsByTagName('Author');
          return _.map(elems, e => `${e.children[0].innerHTML}, ${e.children[1].innerHTML[0]}.`).join(', ');
        }
        return null;
      },
      /**
       * TODO: fill this in.
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
       * TODO: fill this in.
       */
      widgetPointer() {
        if (this.widgetPointer) {
          this.getPubmedData();
        }
      },
    },
    /**
     * TODO: fill this in.
     */
    mounted() {
      if (this.widgetPointer) {
        this.getPubmedData();
      }
    },
    methods: {
      /**
       * TODO: fill this in.
       */
      getPubmedData() {
        this.status = 'loading';
        axios.get(this.widgetProperties.template.replace('{0}', this.widgetPointer))
          .then((resp) => {
            this.xmlString = resp.data;
            this.status = 'ready';
          });
      },
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
