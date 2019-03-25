<template>

  <!-- This is a template for Washington Eviction Research -->
  <div class="widgetTemplate">

    <!-- User Authentication -->
    <div v-if="!userSettings">
      you are not allowed
      <input v-model="password" placeholder="Type password here">
      <b-button @click="savePasswordToUserSettings">Submit</b-button>
    </div>

    <!-- If user is verified, display information -->
    <div class="row" v-else-if="status==='ready'" style="margin-bottom:20px;">

        <!-- PDF Display -->
        <div class="col" style="width:800px;margin-left:0;padding-right:100px;">
          <iframe :src="pdfData" frameborder="0" style="position:relative;width:100%;height:100%;"></iframe>
        </div>

        <!-- Content Display -->
        <div class="col" style="margin-top: 100px;">

          <p v-if="!playMode" class="mb-3 pb-3 mt-3 pt-3">{{ widgetSummary }}</p>

          <!-- Data pointer: {{ widgetPointer }} -->
          <div class="lead">
            <span>{{house}}</span>
            <span>{{preDirection}}</span>
            <span>{{streetName}}</span>
            <span>{{street}}</span>
            <span>{{postDirection}}</span>
            <span>{{unit}}</span>
            <span>{{unitName}}</span>
            <br>
            <span>{{city}}</span>,
            <span>{{state}}</span>,
            <span>{{zip}}</span>
          </div>

          <!-- Response Display -->
          <div class="row">
            <div class="col">
              <!-- <div class="row mx-auto ml-4 mr-4" style="text-align:left; margin:20px;">
                <p v-b-tooltip.hover title="ex) John Smith" style="width:200px;">Person Name:</p>
                <input v-model="name" placeholder="type name here">
              </div> -->
              <div class=" row mx-auto ml-4 mr-4" style="text-align:left; margin:20px;">
                <p v-b-tooltip.hover title="house number ex) 1222" style="width:200px;">House Number:</p>
                <input v-model="house" placeholder="type house number here">
              </div>
              <div class=" row mx-auto ml-4 mr-4" style="text-align:left; margin:20px;">
                <p v-b-tooltip.hover title="direction that precedes the street name ex) N, north east" style="width:200px;">Pre Direction:</p>
                <input v-model="preDirection" placeholder="type street pre direction here">
              </div>
              <div class=" row mx-auto ml-4 mr-4" style="text-align:left; margin:20px;">
                <p v-b-tooltip.hover title="name of the street ex) 123rd" style="width:200px;">Street Name:</p>
                <input v-model="streetName" placeholder="type street name here">
              </div>
              <div class=" row mx-auto ml-4 mr-4" style="text-align:left; margin:20px;">
                <p v-b-tooltip.hover title="type of street ex) PKWY, AVE, RD" style="width:200px;">Street Type:</p>
                <input v-model="street" placeholder="type street name here">
              </div>
              <div class=" row mx-auto ml-4 mr-4" style="text-align:left; margin:20px;">
                <p v-b-tooltip.hover title="direction that follows the street name ex) north, N" style="width:200px;">Post Direction:</p>
                <input v-model="postDirection" placeholder="type street post direction here">
              </div>
              <!-- <div class=" row mx-auto ml-4 mr-4" style="text-align:left; margin:20px;">
                <p style="width:200px;">County: {{ this.county }}</p>
              </div>
              <div class=" row mx-auto ml-4 mr-4" style="text-align:left; margin:20px;">
                <p style="width:200px;">State: {{ this.state }}</p>
              </div> -->
            </div>
            <div class="col">
              <!-- <div class=" row mx-auto ml-4 mr-4" style="text-align:left; margin:20px;">
                <p v-b-tooltip.hover title="eventual court name in address ex) south" style="width:200px;">Court Name:</p>
                <input v-model="courtName" placeholder="type court name here">
              </div>
              <div class=" row mx-auto ml-4 mr-4" style="text-align:left; margin:20px;">
                <p v-b-tooltip.hover title="type of court ex) court, building" style="width:200px;">Court:</p>
                <input v-model="court" placeholder="type court here">
              </div> -->
              <div class=" row mx-auto ml-4 mr-4" style="text-align:left; margin:20px;">
                <p v-b-tooltip.hover title="type of unit ex) APT, UNIT, #" style="width:200px;">Unit Type:</p>
                <input v-model="unit" placeholder="type unit here">
              </div>

              <div class=" row mx-auto ml-4 mr-4" style="text-align:left; margin:20px;">
                <p v-b-tooltip.hover title="name of apartment of unit ex) A, 1" style="width:200px;">Unit Name/Number:</p>
                <input v-model="unitName" placeholder="type unit name here">
              </div>


              <div class=" row mx-auto ml-4 mr-4" style="text-align:left; margin:20px;">
                <p v-b-tooltip.hover title="name of the city ex) Seattle" style="width:200px;">City:</p>
                <input v-model="city" placeholder="type city here">
              </div>
              <div class=" row mx-auto ml-4 mr-4" style="text-align:left; margin:20px;">
                <p v-b-tooltip.hover title="zip code ex) 98005" style="width:200px;">zip:</p>
                <input v-model="zip" placeholder="type zip here">
              </div>
              <!-- <div class=" row mx-auto ml-4 mr-4" style="text-align:left; margin:20px;">
                <p style="width:200px;">Year: {{ this.year }}</p>
              </div>
              <div class=" row mx-auto ml-4 mr-4" style="text-align:left; margin:20px;">
                <p style="width:200px;">File: {{ this.fileName }}</p>
              </div> -->
            </div>
          </div>

          <div class="row" v-if="playMode">
            <b-btn variant="info" :to="'/review/' + widgetPointer" class="mx-auto ml-3 mr-3" >Discuss</b-btn>
            <b-btn variant="success" @click="vote" class="mx-auto ml-3 mr-3">Submit</b-btn>
          </div>
        </div>
    </div>

    <div v-else>
      <Bookshelf />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
  import pdf from 'vue-pdf';
  import axios from 'axios';
  import Bookshelf from '../Animations/Bookshelf';

  export default {
    components: {
      pdf,
      Bookshelf,
    },
    props: {
      widgetPointer: {
        type: String,
        required: true,
      },
      widgetProperties: {
        type: Object,
        required: true,
      },
      widgetSummary: {
        type: Object,
        required: false,
      },
      playMode: {
        type: String,
        required: false,
      },
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
        status: 'loading',
        casenumber: null,
        city: null,
        county: null,
        court: null,
        courtName: null,
        fileName: null,
        filePath: null,
        house: null,
        name: null,
        password: '',
        pdfData: '',
        postDirection: null,
        preDirection: null,
        state: null,
        street: null,
        streetName: null,
        unit: null,
        unitName: null,
        year: null,
        zip: null,
      };
    },
    watch: {
      userSettings() {
        this.getSource();
      },
      widgetPointer() {
        console.log('widget pointer changed');
        this.getPdf();
      }
    },
    mounted() {
      this.getPdf();
    },
    methods: {
      savePasswordToUserSettings() {
        const password = this.password;
        this.$emit('updateUserSettings', { password });
      },
      getPdf() {
        this.status = 'loading';
        const path = this.widgetPointer.split("__");
        const casenumber = path[3];
        let newCasenumber = "";
        for(let x = 0; x < casenumber.length; x += 1) {
          if(casenumber.charAt(x) == '_') {
            newCasenumber += '-';
          } else {
            newCasenumber += casenumber.charAt(x);
          }
        }
        this.state = path[0];
        this.county = path[1];
        this.year = path[2];
        var filePath = "";

        const bodyParameters = {
          key: ""
        };
        const token = this.userSettings.secret;

        // Identify path to Summons.pdf
        axios({
          method: 'get',
          url: `https://tesseract.csde.washington.edu:8080/swipes/${path[0]}/${path[1]}/${path[2]}/${newCasenumber}/files`,
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then((response) => {
          var fileList = response.data.files;
          for(var i = 0; i < fileList.length; i++) {
            if(fileList[i].toUpperCase().includes('SUMMONS')) {
              this.filePath = `https://tesseract.csde.washington.edu:8080/swipes/`+ path[0] +'/'+ path[1] +'/'+ path[2] +'/'+ newCasenumber + '/' + `pdffile64?name=`+ fileList[i];
              this.fileName = fileList[i]
            }
          }
        })
        .then(() => {
          // API Call to fetch pre-filled information
          axios({
            method: 'get',
            url: `https://tesseract.csde.washington.edu:8080/swipes/${path[0]}/${path[1]}/${path[2]}/${newCasenumber}/address`,
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          .then((response) => {
              const listFixed = item => _.isArray(item) ? item[0] : item;
              const address = response.data
              console.log('address', address)
              this.house = listFixed(address.house);
              this.preDirection = listFixed(address.preDirection);
              this.streetName = listFixed(address.streetName);
              this.street = listFixed(address.street);
              this.postDirection = listFixed(address.postDirection);
              this.courtName = listFixed(address.courtName);
              this.court = listFixed(address.court);
              this.unitName = listFixed(address.unitName);
              this.unit = listFixed(address.unit);
              this.city = listFixed(address.city);
              this.zip = listFixed(address.zip);
              this.getSource();
          });
        });
      },
      getSource() {
        // API Call to fetch PDF

        const token = this.userSettings.secret;
        axios({
          method: 'get',
          url: this.filePath,
          headers: {
            'Authorization': `Bearer ${token}`,
            'responseType' : 'blob'
          }
        })
        .then((resp) => {
          var binary = atob(resp.data.replace(/\s/g, ''));
          var len = binary.length;
          var buffer = new ArrayBuffer(len);
          var view = new Uint8Array(buffer);

          for (var i = 0; i < len; i++) {
            view[i] = binary.charCodeAt(i);
          }

          const blob = new Blob([view], {type: "application/pdf"});
          this.pdfData = window.URL.createObjectURL(blob);
          this.status = 'ready';
        });
      },
      getScore(response) {
        // if (response) {
          return 1;
        // }
        // return 0;
      },
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
      vote() {
        this.$emit('widgetRating',
                    {name: this.name,
                     casenumber: this.casenumber,
                     streetName: this.streetName,
                     city: this.city,
                     year: this.year,
                     fileName: this.fileName,
                     house: this.house,
                     preDirection: this.preDirection,
                     street: this.street,
                     postDirection: this.postDirection,
                     courtName: this.courtName,
                     court: this.court,
                     unitName: this.unitName,
                     unit: this.unit,
                     zip: this.zip
                     });
        this.casenumber = null;
        this.name = null;
        this.house = null;
        this.streetName = null;
        this.city = null;
        this.year = null;
        this.fileName = null;
        this.preDirection = null;
        this.street = null;
        this.postDirection = null;
        this.courtName = null;
        this.court = null;
        this.unitName = null;
        this.unit = null;
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
