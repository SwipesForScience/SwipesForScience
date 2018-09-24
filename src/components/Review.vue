<template name="review">
  <div id="review" class="container">


    <div>
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
        <p v-for="msg in chatOrder" class="text-left" :key="msg.time">
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
  import WidgetSelector from './WidgetSelector';

  export default {
    name: 'review',
    firebase: {

    },
    props: ['userInfo', 'userData', 'levels', 'currentLevel'],
    components: {
      WidgetSelector,
    },
    data() {
      return {
        widgetType: config.widgetType,
        widgetProperties: config.widgetProperties,
        widgetPointer: null,
        widgetSummary: null,
        chatMessage: '',
        chatHistory: [],
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
        this.widgetPointer = this.$route.params.key;
      },
    },
    mounted() {
      this.widgetPointer = this.$route.params.key;
      this.setSampleInfo();
    },
    directives: {

    },
    methods: {
      sendChat(e) {
        e.preventDefault();
        const key = this.$route.params.key;

        db.ref('chats')
          .child('sampleChats')
          .child(key).push({
            username: this.userData['.key'],
            message: this.chatMessage,
            time: new Date().toISOString(),
          });

        db.ref('chats')
          .child('sampleChatIndex')
          .child(key).set({
            time: new Date().toISOString(),
          });

        db.ref('chats')
          .child('userChat')
          .child(this.userData['.key'])
          .child(key)
          .set({
            watch: 1,
          });

        this.chatMessage = '';

        // add a flag to all other users following this chat.
        const usersToNotify = [];
        this.chatOrder.forEach((v) => {
          if (usersToNotify.indexOf(v.username) < 0 && v.username !== this.userData['.key']) {
            usersToNotify.push(v.username);
          }
        });

        usersToNotify.forEach((u) => {
          db.ref('chats')
            .child('userNotifications')
            .child(u)
            .child(key)
            .set(true);
        });
      },
      unravelFirebaseListObject(inputObject) {
        const output = [];
        _.mapValues(inputObject, (v) => {
          output.push(v);
        });
        return output;
      },
      setSampleInfo() {
        db.ref('chats')
          .child('sampleChats')
          .child(this.widgetPointer)
          .on('value', (snap2) => {
            const chatData = snap2.val();
            this.chatHistory = chatData;
          });
      },
    },
  };
</script>
