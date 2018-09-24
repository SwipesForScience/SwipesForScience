<template>
  <div id="profile">
    <!-- Only show stuff is the user is authenticated -->
    <b-container fluid>
      <!-- userInfo is a prop that was passed in from App -->
      <h1>
        <b-img rounded="circle" width="75"
          height="75" blank-color="#777"
          alt="img" class="m-1"
          :src="currentLevel.img"
          v-if="currentLevel.img"
          />
        {{userInfo.displayName}}
      </h1>

      <p class="lead">
        You have {{userData.score}} points!
      </p>
      <hr>

      <h3>Level {{currentLevel.level}}</h3>
      <p class="lead">
        Keep playing to unlock the remaining animals!
      </p>

      <b-container fluid class="p-4">
        <b-row>
          <b-col v-for="lev in levels" v-if="lev.img" :key="lev.min">
            <div >
              <b-img fluid class="pokemon"
               :src="lev.img" alt="Thumbnail" v-if="lev.level <= currentLevel.level"/>
              <b-img fluid class="pokemon"
               :src="lev.img_grey" alt="Thumbnail" v-else/>
              <br>
              Level {{lev.level}}
              <br>
              <span v-if="lev.level > currentLevel.level">{{lev.min}} points</span>
            </div>
          </b-col>
        </b-row>
      </b-container>

      <hr>

      <div v-if="chats.length">
        <h2> Your Chats </h2>
        <p class="lead">
          Your discussions on specific samples
        </p>

        <div v-for="c in chats"  class="text-left" :key="c">
          <div v-if="chatInfo[c]">
            <b-alert :show="chatInfo[c].notify">
              <router-link :to="'/listen/' + c">{{c}}</router-link>:
              <b>{{chatInfo[c].username}}</b>
              {{chatInfo[c].message}}
            </b-alert>
            <b-alert :show="!chatInfo[c].notify" variant="light">
              <router-link :to="'/listen/' + c">{{c}}</router-link>:
              <b>{{chatInfo[c].username}}</b>
              {{chatInfo[c].message}}
            </b-alert>
          </div>
        </div>
      </div>
      <div v-else>
        <h2> Chats </h2>
        <p class="lead">
          You haven't said anything yet! When you're ready, join the discussion.
        </p>
        <img :src="blankImage" class="blankImage"/>
      </div>
    </b-container>

  </div>
</template>

<style>
  .pokemon{
    min-width: 25px;
    min-height: 25px;
    width: 100px;
    height: 100px;
  }

  #profile {
    min-height: 100vh;
  }
</style>

<script>

import { db } from '../firebaseConfig';
import config from '../config';

export default {
  name: 'profile',
  data() {
    return {
      selectedTheme: null,
      chats: [],
      chatInfo: {},
      blankImage: config.profile.blankImage,
    };
  },
  // the parent component feeds these vars to this component
  props: ['userInfo', 'userData', 'levels', 'currentLevel', 'themes'],
  mounted() {
    if (this.userData['.key']) {
      this.getUserChats();
    }
  },
  watch: {
    userData() {
      if (this.userData['.key']) {
        // console.log('user is', this.userData['.key']);
        this.getUserChats();
      }
    },
    chats() {
      this.chats.forEach((c) => {
        db.ref('imageChat').child(c).orderByKey().limitToLast(1)
          .on('value', (snap) => {
            const data = snap.val();
            this.chatInfo[c] = data[Object.keys(data)[0]];
            this.getNotifications(c);
            this.$forceUpdate();
          });
      });
    },
  },
  methods: {
    setTheme() {
      this.$emit('theme', this.selectedTheme);
    },
    getUserChats() {
      db.ref('userChat').child(this.userData['.key']).on('value', (snap) => {
        const data = snap.val();
        // console.log(data);
        if (data) {
          this.chats = Object.keys(data);
        }
        // console.log('this chats', this.chats);
      });
    },
    getNotifications(key) {
      db.ref('notifications')
        .child(this.userData['.key'])
        .child(key)
        .on('value', (snap) => {
          // console.log('notifications for', snap.val());
          if (snap.val()) {
            this.chatInfo[key].notify = true;
            this.$forceUpdate();
          }
        });
    },
  },
};
</script>
