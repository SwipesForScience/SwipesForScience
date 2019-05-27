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
    <div class="row" v-else-if="status==='ready'" style="margin-bottom:20px;height:90vh;">
      <!-- PDF Display -->
      <div class="col">
          <div style="display:block;width:100%;height:85vh;margin-bottom:10px;">
            <iframe :src="pdfData" frameborder="0" style="width:100%;height:100%;" ></iframe>
          </div>
          <b-button id="tooltip-button-1" variant="primary" style="margin-top: 10px">More Files</b-button>
          <b-tooltip class="tool" :show.sync="show" data-container="body" target="tooltip-button-1" placement="righttop" trigger="click">
            <ul>
              <li v-for="file in fileOption" @click="getSource(file)" :key="file" style="list-style-type: none; text-align: left;">
                {{file}}
              </li>
            </ul>
          </b-tooltip>
      </div>
        <!-- Content Display -->
        <!-- <div class="col" style="margin-top: 100px;"> -->
        <div class="col" >
          <p v-if="!playMode" class="mb-3 pb-3 mt-3 pt-3">{{ widgetSummary }}</p>
          <!-- Data pointer: {{ widgetPointer }} -->
          <div style="height:95vh;">
          <div class="lead">
            <span v-if="name!=null">{{name}}</span>
            <br>
            <span>{{house}}</span>
            <span>{{preDirection}}</span>
            <span>{{streetName}}</span>
            <span>{{street}}</span>
            <span>{{postDirection}}</span>
            <span>{{court}}</span>
            <span>{{courtName}}</span>
            <span>{{unit}}</span>
            <span>{{unitName}}</span>
            <br>
            <span>{{city}}</span>,
            <span>{{state}}</span>,
            <span>{{zip}}</span>
          </div>

          <!-- Response Display -->
          <div style="overflow-y:scroll; overflow-x:hidden; height:80%;" >
          <div class="row">
            <div class="col">
              <div class=" row mx-auto ml-4 mr-4" style="text-align:left; margin:20px;">
                <div class = "address" style="margin:0;">
                  <p style="margin:0;"> House Number: </p>
                  <p class="description"> house number ex) 1222 </p>
                  <input v-model="house" placeholder="Enter house number here">
                </div>
              </div>
              <div class=" row mx-auto ml-4 mr-4" style="text-align:left; margin:20px;">
                <div class = "address" style="margin:0;">
                  <p style="margin:0;"> Pre Direction: </p>
                  <p class="description"> direction that precedes the street name ex) N, north east </p>
                  <input v-model="preDirection" placeholder="Enter street pre direction here">
                </div>
              </div>
              <div class=" row mx-auto ml-4 mr-4" style="text-align:left; margin:20px;">
                <div class = "address" style="margin:0;">
                  <p style="margin:0;"> Street Name: </p>
                  <p class="description"> name of the street ex) 123rd </p>
                  <input v-model="streetName" placeholder="Enter street name here">
                </div>
              </div>
              <div class=" row mx-auto ml-4 mr-4" style="text-align:left; margin:20px;">
                <div class = "address" style="margin:0;">
                  <p style="margin:0;"> Street Type: </p>
                  <p class="description"> type of street ex) PKWY, AVE, RD </p>
                  <input v-model="street" placeholder="Enter street type here">
                </div>
              </div>
              <div class=" row mx-auto ml-4 mr-4" style="text-align:left; margin:20px;">
                <div class = "address" style="margin:0;">
                  <p style="margin:0;"> Post Direction: </p>
                  <p class="description"> direction that follows th street name ex) north, N </p>
                  <input v-model="postDirection" placeholder="Enter street post direction here">
                </div>
              </div>
            </div>
            <div class="col">
              <div class=" row mx-auto ml-4 mr-4" style="text-align:left; margin:20px;">
                <div class = "address" style="margin:0;">
                  <p style="margin:0;"> Unit Type: </p>
                  <p class="description"> type of unit ex) APT, UNIT, # </p>
                  <input v-model="unit" placeholder="Enter unit here">
                </div>
              </div>
              <div class=" row mx-auto ml-4 mr-4" style="text-align:left; margin:20px;">
                <div class = "address" style="margin:0;">
                  <p style="margin:0;"> Unit Name: </p>
                  <p class="description"> name of unit ex) A, 1 </p>
                  <input v-model="unitName" placeholder="Enter unit name here">
                </div>
              </div>
              <div class=" row mx-auto ml-4 mr-4" style="text-align:left; margin:20px;">
                <div class = "address" style="margin:0;">
                  <p style="margin:0;"> City: </p>
                  <p class="description"> name of the city ex) Seattle </p>
                  <input v-model="city" placeholder="Enter city here">
                </div>
              </div>
              <div class=" row mx-auto ml-4 mr-4" style="text-align:left; margin:20px;">
                <div class = "address" style="margin:0;">
                  <p style="margin:0;"> Zip: </p>
                  <p class="description"> zip code ex) 98005 </p>
                  <input v-model="zip" placeholder="Enter zip here">
                </div>
              </div>
              <div class=" row mx-auto ml-4 mr-4" style="text-align:left; margin:20px;">
                <p style="margin:0;"> State: {{state}} </p>
              </div>
              <div v-if="!hideInfo">
                <div class=" row mx-auto ml-4 mr-4" style="text-align:left; margin:20px;">
                  <div class = "address" style="margin:0;">
                    <p style="margin:0;"> Court: </p>
                    <p class="description"> name of the court ex) Seattle </p>
                    <input v-model="court" placeholder="Enter court here">
                  </div>
                </div>
                <div class=" row mx-auto ml-4 mr-4" style="text-align:left; margin:20px;">
                  <div class = "address" style="margin:0;">
                    <p style="margin:0;"> Court Name: </p>
                    <p class="description"> name of the court name ex) Seattle </p>
                    <input v-model="courtName" placeholder="Enter court name here">
                  </div>
                </div>
                <div class=" row mx-auto ml-4 mr-4" style="text-align:left; margin:20px;">
                  <div class = "address" style="margin:0;">
                    <p style="margin:0;"> Name: </p>
                    <p class="description"> name ex) John Doe </p>
                    <input v-model="name" placeholder="Enter name here">
                  </div>
                </div>
              </div>
             <b-btn v-if="hideInfo" @click="hideInfo = !hideInfo" class="mx-auto ml-3 mr-3" >More Info.</b-btn>
             <b-btn v-if="!hideInfo" @click="hideInfo = !hideInfo" class="mx-auto ml-3 mr-3" >Hide Info.</b-btn>
            </div>
          </div>
      </div>
      <div class="row" v-if="playMode">
        <b-btn variant="info" :to="'/review/' + widgetPointer" class="mx-auto ml-3 mr-3" >Discuss</b-btn>
        <b-btn variant="success" @click="vote" class="mx-auto ml-3 mr-3">Submit</b-btn>
      </div>
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
        fileOption: [],
        hideInfo: true,
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

        const bodyParameters = {
          key: ""
        };
        const token = this.userSettings.secret;

        // Identify path to Summons.pdf
        axios({
          method: 'get',
          url: `https://tesseract.csde.washington.edu:8080/swipes/${this.widgetPointer}/files`,
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then((response) => {
          var fileList = response.data.files;
          this.fileOption = fileList;
          for(var i = 0; i < fileList.length; i++) {
            if(fileList[i].toUpperCase().includes('SUMMONS')) {
              // this.filePath = `https://tesseract.csde.washington.edu:8080/swipes/`+ path[0] +'/'+ path[1] +'/'+ path[2] +'/'+ newCasenumber + '/' + `pdffile64?name=`+ fileList[i];
              this.filePath = `https://tesseract.csde.washington.edu:8080/swipes/${this.widgetPointer}/` + `pdffile64?name=`+ fileList[i];
              this.fileName = fileList[i]
            }
          }
        })
        .then(() => {
          // API Call to fetch pre-filled information
          axios({
            method: 'get',
            url: `https://tesseract.csde.washington.edu:8080/swipes/${this.widgetPointer}/address`,
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
              this.state = listFixed(address.stateName);
              this.getSource(this.fileName);
          }).catch(error => {
            if(error.response.status == 401) {
              alert("You are not authorized");
              window.location.href="/";
            } else {
              alert("Failed to load the file");
              window.location.reload();
            }
          });
        }).catch(error => {
          if(error.response.status == 401) {
            alert("You are not authorized");
            window.location.href="/";
          } else {
            alert("Failed to load the file");
            window.location.reload();
          }
      });
      },
      getSource(file) {
        // API Call to fetch PDF
        const token = this.userSettings.secret;
        file = encodeURIComponent(file)
        var fileUrl = `https://tesseract.csde.washington.edu:8080/swipes/${this.widgetPointer}/` + `pdffile64?name=`+ file;
        axios({
          method: 'get',
          url: fileUrl,
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
        })
        .catch(error => {
          if(error.response.status == 401) {
            alert("You are not authorized");
            window.location.href="/";
          } else {
            alert("Failed to load the file");
            window.location.reload();
          }
      });
      },  
      getFileList(file) {
        // var fDiv = document.getElementById("fileOption");
        // var fList = document.createElement("ul");
        // console.log(fDiv);
        // console.log(this.fileOption);
        // for (var i = 0; i < this.fileOption.length; i++) {
        //   var fElement = document.createElement("li");
        //   fElement.innerHTML = this.fileOption[i];
        //   fList.appendChild(fElement);
        // }
        // fDiv.appendChild(fList);
        console.log(file)
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
                     zip: this.zip,
                     state: this.state
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
        this.state = null;
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

.tooltip-inner {
  max-width: 100% !important;
}

.description {
  font-size:9pt;
  margin-top:0;
  margin-bottom:0;
  color:gray;
}

.address {
  float:left;
  margin-bottom: 0;
}

.tooltip-inner {
  max-width: 100% !important;
  padding-top: 20px;
  padding-right: 40px;
}

</style>
