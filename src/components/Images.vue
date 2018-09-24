<template>
  <div id="images" class="">
    <div class="imgGrid pic" v-for="img in imageCount">
       <img class="lazy pic-image" v-lazy="getUrl(img['.key'])"/>
       <span class="pic-caption rotate-in" :style="getStyle(img)">
           <h4 class="pic-title">
             <p style="margin-bottom:10px;">{{img.ave_score |formatNumber}}
               <br>
               <small>Average Score</small>
             </p>

             <p>{{img.num_votes}}
                <br>
                <small>Number of Votes</small>
             </p>

           </h4>
           <b-button variant="success" @click="adminVote(img, 1)">
             <strong v-if="img.adminVote">Pass</strong>
             <span v-else>Pass</span>
           </b-button>
           <b-button variant="danger" @click="adminVote(img, 0)">
             <strong v-if="img.adminVote == 0">Fail</strong>
             <span v-else>Fail</span>
           </b-button>
       </span>
    </div>
  </div>
</template>

<style>

#images {
  background-color: black;
}

.lazy {
  width: 200px;
  height: 200px;
}

.imgGrid {
  /*display: inline*/
}

.pic {
    max-width: 200px;
    max-height: 200px;
    position: relative;
    overflow: hidden;
    display: inline-block;
    /*-webkit-animation: anima 2s;
    animation: anima 2s;*/
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
}

.pic-title h1 {
  font-size: 1em;
}

a, a:hover, .pic .pic-image, .pic-caption, .pic:hover .pic-caption, .pic:hover img {
    /*-webkit-transition: all 0.05s ease;
    transition: all 0.05s ease;*/
    opacity: 100;
}

.pic-caption {
    cursor: default;
    position: absolute;
    width: 100%;
    height: 100%;
    /*background: rgba(44,62,80,0.92);*/
    padding: 10px;
    text-align: center;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=($opacity * 100))";
    filter: alpha(opacity=0);
    -moz-opacity: 0;
    -khtml-opacity: 0;
    opacity: 0;
    color: white;
}

.rotate-in {
    -webkit-transform: rotate(90deg) scale(0.1);
    transform: rotate(90deg) scale(0.1);
    top: 0;
    left: 0;
}

.pic:hover .rotate-in {
    -webkit-transform: rotate(360deg) scale(1);
    transform: rotate(360deg) scale(1);
}

</style>

<script>

import _ from 'lodash';
import numeral from 'numeral';
import Vue from 'vue';
import VueLazyload from 'vue-lazyload';
import { db } from '../firebaseConfig';
import config from '../config';
// import '../assets/sass-compiled.css';
Vue.filter('formatNumber', value => numeral(value).format('0.0[0]'));

Vue.use(VueLazyload)

export default {
  name: 'images',
  data() {
    return {
      imageCount: [],
      imageBaseUrl: config.imageBaseUrl,
    };
  },
  methods: {
    getUrl(key) {
      return `${this.imageBaseUrl}/${key}.${config.imageExt}`;
    },
    getStyle(img) {
      const c = img.ave_score < 0.5 ? '#dc35457d' : '#28a74573';
      return { 'background-color': c };
    },
    adminVote(img, vote) {
      db.ref('imageCount').child(img['.key']).child('adminVote').set(vote).then((r) => {
        console.log('set', img['.key'], 'to', vote);
      });
    },
  },
  firebase: {
    imageCount: {
      source: db.ref('imageCount'), //.orderByChild('num_votes'),
      readyCallback() {
        // console.log(this.imageCount);

      },
    },
  },
};
</script>
