<template>
  <!-- This is a dummy Widget Template -->
  <div class="widgetTemplate">
    <!-- {{msg}} -->
    <div class="row">
    <pdf class="col" :src="pdf" style="width:100%; margin:auto;"></pdf>
    <!-- <p class="lead mb-3 pb-3 mt-3 pt-3">{{widgetPointer}}</p> -->
    <div class="col" style="margin-top: 100px;">
        <p v-if="!playMode" class="mb-3 pb-3 mt-3 pt-3">{{widgetSummary}}</p>
         Data pointer: {{widgetPointer}}
            <!-- <div class=" row mx-auto ml-4 mr-4" style="text-align:left; margin:20px;">
              <p style="width:200px;">Case Number: </p>
              <input v-model="pdf" placeholder="edit me">
            </div> -->
            <div class="row mx-auto ml-4 mr-4" style="text-align:left; margin:20px;">
              <p style="width:200px;">Person Name:</p>
              <input v-model="name" placeholder="type name here">
            </div>
            <div class=" row mx-auto ml-4 mr-4" style="text-align:left; margin:20px;">
              <p style="width:200px;">Address:</p>
              <input v-model="address" placeholder="type address here">
            </div>
            <div class=" row mx-auto ml-4 mr-4" style="text-align:left; margin:20px;">
              <p style="width:200px;">County:</p>
              <input v-model="county" placeholder="type county here">
            </div>
            <div class=" row mx-auto ml-4 mr-4" style="text-align:left; margin:20px;">
              <p style="width:200px;">Year:</p>
              <input v-model="year" placeholder="type year here">
            </div>
            <div class=" row mx-auto ml-4 mr-4" style="text-align:left; margin:20px;"> 
              <p style="width:200px;">Filename:</p>
              <p>pdf name</p>
            </div>
        <div class="row" v-if="playMode">
          <!-- <b-btn variant="danger" @click="vote(0)" class="mx-auto ml-3 mr-3">Vote No</b-btn> -->
          <b-btn variant="info" :to="'/review/' + widgetPointer" class="mx-auto ml-3 mr-3" >Discuss</b-btn>
          <b-btn variant="success" @click="vote" class="mx-auto ml-3 mr-3">Submit</b-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pdf from 'vue-pdf'
import axios from 'axios'

/**
 * This is a dummy widget template, for widget developers to use as a base to start
 * developing a new annotation widget.
 */
  export default {
    components: {
      pdf
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
        msg: 'hello',
        casenumber: null,
        name: null,
        address: null,
        county: null,
        year: null,
        filename: null,
      };
    },
    mounted() {
      // this.getpdf()

    },
    computed : {
      pdf() {
        var path = this.widgetPointer.split("__");
        console.log(path);
        var casenumber = path[3];
        var newCasenumber = "";
        for(var x = 0; x < casenumber.length; x++) {
          if(casenumber.charAt(x) == '_') {
            newCasenumber += '-';
          } else {
            newCasenumber += casenumber.charAt(x);
          }
        }
        var filename = path[4];
        var newFilename = "";
        for(var y = 0; y < filename.length; y++) {
          if(filename.charAt(y) == '_') {
            newFilename += '-';
          } else {
            newFilename += filename.charAt(y);
          }
        }
        return `http://localhost:7886/`
         + path[0] +'/'
         + path[1] +'/'
         + path[2] +'/'
         + newCasenumber + '/'
         + `file?name=`
         + newFilename
         + '.pdf';
      }
    },
    // getPdf() {
    //     console.log("testtest")
    //     var pdfFile = "";
    //     Axios.get('localhost:7886/washington/King/2017/2017-01-3-123/file?name=summons.pdf')
    //     .then((response) => pdfFile = respose)
    //     return pdfFile;
    //   },
    methods: {

      getpdf() {
        console.log(this.widgetPointer);

        axios.get('http://localhost:7886/washington/King/2017/2017-01-3-123/file?name=summons.pdf')
        .then((response) => {
          this.pdf = response.data;
        })
      }, 
      /**
       * all widgets should have a getScore method, based on the user's response
       */
      getScore(response) {
        // if (response) {
          return 1;
        // }
        // return 0;
      },

      /**
       * all widgets should have a getFeedback method, based on the user's response.
       * this is what the user will see once they respond.
       */
      getFeedback(response) {
        // if (response) {
          return {
            show: true,
            variant: 'success',
            message: 'good job',
          };
        // }

        // return {
        //   show: true,
        //   variant: 'danger',
        //   message: 'bad job',
        // };
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
        // if (!this.widgetSummary) {
        //   // the summary isn't initialized yet
        //   return {
        //     aveVote: response,
        //     count: 1,
        //   };
        // }

        // let newVote = ((this.widgetSummary.aveVote * this.widgetSummary.count) + response);
        // newVote /= (this.widgetSummary.count + 1);

        // return {
        //   aveVote: newVote,
        //   count: this.widgetSummary.count + 1,
        // };
        return {};
      },
      /**
       * all widgets should have a vote method, that emits a response to the parent component.
       */
      vote() {
        console.log(this.name);
        this.$emit('widgetRating', 
                    {name: this.name,
                     casenumber: this.casenumber,
                     address: this.address,
                     county: this.county,
                     year: this.year,
                     filename: this.filename
                     });
        this.casenumber = null;
        this.name = null;
        this.address = null;
        this.county = null;
        this.year = null;
        this.filename = null;
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
      download() {
        let pdfName = 'test';
        var doc = new jsPDF();
        doc.text(this.name, 10, 10);
        doc.save(pdfName + '.pdf')
      }
    },
  };
</script>

<style>

</style>
