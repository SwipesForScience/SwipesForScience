<template>
  <!-- This is a dummy Widget Template -->
  <div class="widgetTemplate">
    <!-- {{msg}} -->
    <div v-if="!userSettings">
      you are not allowed
      TODO: add some sort of text input for the password
      <input v-model="password" placeholder="type name here">
      <b-button @click="savePasswordToUserSettings">submit password</b-button>

    </div>

    <div class="row" v-else>
    <!-- <pdf class="col" :src=getSource() style="width:100%; margin:auto;"></pdf> -->
    <!-- <vue-friendly-iframe class="col" :src=getSource()></vue-friendly-iframe> -->
    <div class="col" style="width:600px;padding-right:100px;">
      <iframe :src="pdfData" frameborder="0" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe>
    </div>
    <div>userSettings: {{ userSettings }}</div>
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
              <p style="width:200px;">House Number:</p>
              <input v-model="house" placeholder="type house number here">
            </div>
            <div class=" row mx-auto ml-4 mr-4" style="text-align:left; margin:20px;">
              <p style="width:200px;">Pre Direction:</p>
              <input v-model="preDirection" placeholder="type street pre direction here">
            </div>
            <div class=" row mx-auto ml-4 mr-4" style="text-align:left; margin:20px;">
              <p style="width:200px;">Street Name:</p>
              <input v-model="streetName" placeholder="type street name here">
            </div>
            <div class=" row mx-auto ml-4 mr-4" style="text-align:left; margin:20px;">
              <p style="width:200px;">Street:</p>
              <input v-model="street" placeholder="type street name here">
            </div>
            <div class=" row mx-auto ml-4 mr-4" style="text-align:left; margin:20px;">
              <p style="width:200px;">Post Direction:</p>
              <input v-model="postDirection" placeholder="type street post direction here">
            </div>
            <div class=" row mx-auto ml-4 mr-4" style="text-align:left; margin:20px;">
              <p style="width:200px;">City:</p>
              <input v-model="city" placeholder="type city here">
            </div>
            <div class=" row mx-auto ml-4 mr-4" style="text-align:left; margin:20px;">
              <p style="width:200px;">County:</p>
              <!-- <input v-model="county" placeholder="type county here"> -->
              <p>{{ this.county }}</p>
            </div>
            <div class=" row mx-auto ml-4 mr-4" style="text-align:left; margin:20px;">
              <p style="width:200px;">State:</p>
              <!-- <input v-model="county" placeholder="type county here"> -->
              <p>{{ this.state }}</p>
            </div>
            <div class=" row mx-auto ml-4 mr-4" style="text-align:left; margin:20px;">
              <p style="width:200px;">zip:</p>
              <input v-model="zip" placeholder="type zip here">
            </div>
            <div class=" row mx-auto ml-4 mr-4" style="text-align:left; margin:20px;">
              <p style="width:200px;">Year:</p>
              <!-- <input v-model="year" placeholder="type year here"> -->
              <p>{{ this.year }}</p>
            </div>
            <div class=" row mx-auto ml-4 mr-4" style="text-align:left; margin:20px;">
              <p style="width:200px;">Filename:</p>
              <p>{{ this.filename }}</p>
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
import Vue from 'vue';
import VueFriendlyIframe from 'vue-friendly-iframe';
window.axios = axios;

Vue.component('vue-friendly-iframe', VueFriendlyIframe);
/**
 * This is a dummy widget template, for widget developers to use as a base to start
 * developing a new annotation widget.
 */
  export default {
    components: {
      pdf,
      VueFriendlyIframe
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
      userSettings: {
        type: Object,
        required: true,
      }
    },
    data() {
      return {
        msg: 'hello',
        casenumber: null,
        name: null,
        house: null,
        preDirection: null,
        streetName: null,
        street: null,
        postDirection: null,
        city: null,
        zip: null,
        filename: null,
        filePath: null,
        password: '',
        pdfData: '',
      };
    },
    watch: {
      userSettings() {
        this.getSource()
      }
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
        // var filename = path[4];
        // var newFilename = "";
        // console.log('filename is', filename)
        // for(var y = 0; y < filename.length; y++) {
        //   if(filename.charAt(y) == '_') {
        //     newFilename += '-';
        //   } else {
        //     newFilename += filename.charAt(y);
        //   }
        // }
        // this.filename = newFilename;
        this.county = path[1];
        this.state = path[0];
        this.year = path[2];
        var fileList = [];
        var filePath = "";
        var loading = true;
        console.log("before axios")
        var config = {
          headers: {'Authorization':"secret"}
        };
        var bodyParameters = {
          key: ""
        };
        // axios.defaults.headers.common['Authorization'] = 'secret';
        axios({
          method: 'get',
          url: `http://localhost:7886/${path[0]}/${path[1]}/${path[2]}/${newCasenumber}/files`,
          headers: {
            'Authorization': 'secret'
            
            }
          })
          .then((response) => {
            fileList = response.data.files;
            for(var i = 0; i < fileList.length; i++) {
              if(fileList[i].toUpperCase().includes('SUMMONS')) {
                this.filePath = `http://localhost:7886/`+ path[0] +'/'+ path[1] +'/'+ path[2] +'/'+ newCasenumber + '/' + `pdffile?name=`+ fileList[i];
                this.filename = fileList[i]
                console.log(this.filePath);
              }
            }
          });
          axios({
            method: 'get',
            url: `http://localhost:7886/${path[0]}/${path[1]}/${path[2]}/${newCasenumber}/address`,
            headers: {
            'Authorization': 'secret'
            }
          })
          .then((response) => {
            // fileList = response.data.files;
            // for(var i = 0; i < fileList.length; i++) {
            //   if(fileList[i].toUpperCase().includes('SUMMONS')) {
            //     this.filePath = `http://localhost:7886/`+ path[0] +'/'+ path[1] +'/'+ path[2] +'/'+ newCasenumber + '/' + `pdffile?name=`+ fileList[i];
            //     this.filename = fileList[i]
            //     console.log(this.filePath);
            //   }
            // }
            var address = response.data
            this.house = address.house,
            this.preDirection = address.preDirection,
            this.streetName = address.streetName,
            this.street = address.street,
            this.postDirection = address.postDirection,
            this.city = address.city,
            this.zip = address.zip
          });
      }
    },
    methods: {
      savePasswordToUserSettings() {
        console.log('we are here');
        const password = this.password;
        this.$emit('updateUserSettings', { password });
      },
      getSource() {
        console.log(this.password)
        axios({
          method: 'get',
          url: `http://localhost:7886/`,
          headers: {
          'Authorization': 'secret'
          }
        }).then((resp) => {
          this.pdfData = `data:text/html;charset=utf-8,${escape(resp.data)}`;
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
        this.$emit('widgetRating',
                    {name: this.name,
                     casenumber: this.casenumber,
                     streetName: this.streetName,
                     city: this.city,
                     year: this.year,
                     filename: this.filename,
                     house: this.house,
                     preDirection: this.preDirection,
                     street: this.street,
                     postDirection: this.postDirection,
                     zip: this.zip
                     });
        this.casenumber = null;
        this.name = null;
        this.house = null;
        this.streetName = null;
        this.city = null;
        this.year = null;
        this.filename = null;
        this.preDirection = null;
        this.street = null;
        this.postDirection = null;
        this.zip = null;
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
