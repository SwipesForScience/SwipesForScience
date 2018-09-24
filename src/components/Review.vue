<template name="review">
  <div id="review" class="container">


    <div class="main">
      <WidgetSelector :widgetType="widgetType"
       :widgetPointer="widgetPointer"
       :widgetProperties="widgetProperties"
       :widgetSummary="widgetSummary"
       :playMode="false"
       ref="widget"
      />
    </div>

    <div class="chat container">
      <h3 class="mb-2">Chat</h3>
      <div class="chatHistory pl-3 pr-3 pt-3 pb-3 mb-3" v-if="chatOrder.length">
        <p v-for="msg in chatOrder" class="text-left" :key="msg.message">
          <b>{{msg.username}}</b>: {{msg.message}}
        </p>
      </div>
      <div v-else>
        <p>No one has said anything yet!</p>
      </div>
      <b-form @submit="sendChat">
        <b-form-group id="exampleInputGroup1"
                label="Enter chat message:"
                label-for="exampleInput1"
                description="">
          <b-form-input id="exampleInput1"
                        type="text"
                        v-model="chatMessage"
                        required
                        placeholder="Enter your message">
          </b-form-input>
          <b-button class="mt-2" variant="primary" @click="sendChat">Send</b-button>
        </b-form-group>
      </b-form>

    </div>

  </div>
</template>

<style>
  /*https://github.com/pudymody/tinderSwipe/blob/gh-pages/style.css*/

  .main {
    min-height: 80vh;
  }

  .chat {
    max-width: 600px;
  }

  .chatHistory {
    max-height: 200px;
    overflow: auto;
    border-style: solid;
    border-radius: 5px;
    border-width: thin;
    border-color: #17a2b8;
  }

</style>

<script>
  import _ from 'lodash';
  import { db } from '../firebaseConfig';
  import config from '../config';

  export default {
    name: 'review',
    firebase: {

    },
    props: ['userInfo', 'userData', 'levels', 'currentLevel'],
    data() {
      return {

      };
    },
    computed: {
      chatOrder() {
        const chats = [];
        _.mapValues(this.chatHistory, (v) => {
          chats.push(v);
        });
        chats.reverse();
        return chats;
      },
    },
    watch: {
      $route() {
        // console.log('changed route');
        this.setCurrentImage();
      },
    },
    mounted() {
      this.setCurrentImage();
    },
    components: { },
    directives: {

    },
    methods: {
      sendChat(e) {
        e.preventDefault();
        const key = this.$route.params.key;
        db.ref('sampleChats').child(key).push({
          username: this.userData['.key'],
          message: this.chatMessage,
          time: new Date().toISOString(),
        });
        db.ref('sampleChatIndex').child(key).set({ time: new Date().toISOString() });
        db.ref('userChat').child(this.userData['.key']).child(key).set({
          watch: 1,
        });
        this.chatMessage = '';
        // TODO: need to add a flag to all other users following this chat.
        const usersToNotify = [];
        this.chatOrder.forEach((v) => {
          if (usersToNotify.indexOf(v.username) < 0 && v.username !== this.userData['.key']) {
            usersToNotify.push(v.username);
          }
        });
        usersToNotify.forEach((u) => {
          db.ref('userNotifications').child(u).child(key).set(true);
        });
        // console.log('users to notify', usersToNotify);
      },
      setSampleInfo() {
        db.ref('sampleCounts').child(this.$route.params.key)
          .once('value')
          .then((snap) => {
            const data = snap.val();
            // console.log('snap si', data);
            const key = this.$route.params.key;
            data['.key'] = this.$route.params.key;
            // console.log('data snap is', data);
            this.currentImage = `${this.imageBaseUrl}/${key}.${config.imageExt}`;
            this.currentCount = data;
            // console.log(this.currentImage);
            this.startTime = new Date();
            this.status = 'ready';
            this.playSound();
            db.ref('votes')
              .orderByChild('image_id')
              .equalTo(key)
              .once('value')
              .then((snap1) => {
                const vdata = snap1.val();
                // console.log('votedata', vdata);
                if (vdata) {
                  let votes = 0;
                  let N = 0;
                  _.mapValues(vdata, (v) => {
                    // console.log(v);
                    votes += v.vote;
                    N += 1;
                  });
                  // console.log(votes, N);
                  this.stats.ave_vote = votes / N;
                  this.stats.num_votes = N;
                }
              });

            db.ref('imageChat').child(key)
              .on('value', (snap2) => {
                const chatData = snap2.val();
                this.chatHistory = chatData;
              });

            // TODO: only do this if this key is in the notifications/username tho
            db.ref('notifications')
              .child(this.userData['.key'])
              .child(key)
              .set(false);
          });
      },
    },
  };
</script>
