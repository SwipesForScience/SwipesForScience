<template name="review">
  <div id="review" class="container">

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
    <div>
      <WidgetSelector :widgetType="widgetType"
       :widgetPointer="widgetPointer"
       :widgetProperties="widgetProperties"
       :widgetSummary="widgetSummary"
       :playMode="''"
       ref="widget"
      />
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
  import WidgetSelector from './WidgetSelector';
  /**
   * The review component shows the widget for a pointer to a sample in its route,
   * and lets the user discuss the sample in a chat-room type UI
   *
   * @author Anisha Keshavan
   * @license Apache 2.0
   */

  export default {
    name: 'review',
    props: {
      /**
       * the authenticated user object from firebase
       */
      userInfo: {
        type: Object,
        required: true,
      },
      /**
       * the computed user data object based on userInfo
       */
      userData: {
        type: Object,
        required: true,
      },
      /**
       * the various levels, the points need to reach the levels,
       * and the badges (colored and greyed out) to display
       */
      levels: {
        type: Object,
        required: true,
      },
      /**
       * the user's current level
       */
      currentLevel: {
        type: Object,
        required: true,
      },
      /**
       * The config object that is loaded from src/config.js.
       * It defines how the app is configured, including
       * any content that needs to be displayed (app title, images, etc)
       * and also the type of widget and where to update pointers to data
       */
      config: {
        type: Object,
        required: true,
      },
      /**
       * the intialized firebase database
       */
      db: {
        type: Object,
        required: true,
      },
    }, // ['userInfo', 'userData', 'levels', 'currentLevel', 'config', 'db'],
    components: {
      WidgetSelector,
    },
    data() {
      return {
        /**
         *
         */
        widgetPointer: '',
        /**
         *
         */
        widgetSummary: {},
        /**
         *
         */
        chatMessage: '',
        /**
         *
         */
        chatHistory: [],
      };
    },
    computed: {
      /**
       *
       */
      chatOrder() {
        const chats = [];
        _.mapValues(this.chatHistory, (v) => {
          chats.push(v);
        });
        chats.reverse();
        return chats;
      },
      /**
       *
       */
      widgetType() {
        return this.config.widgetType;
      },
      /**
       *
       */
      widgetProperties() {
        return this.config.widgetProperties;
      },
    },
    watch: {
      /**
       *
       */
      $route() {
        this.widgetPointer = this.$route.params.key;
      },
    },
    /**
     *
     */
    mounted() {
      this.widgetPointer = this.$route.params.key;
      this.setSampleInfo();
    },
    methods: {
      /**
       *
       */
      sendChat(e) {
        e.preventDefault();
        const key = this.$route.params.key;

        this.db.ref('chats')
          .child('sampleChats')
          .child(key).push({
            username: this.userData['.key'],
            message: this.chatMessage,
            time: new Date().toISOString(),
          });

        this.db.ref('chats')
          .child('sampleChatIndex')
          .child(key).set({
            time: new Date().toISOString(),
          });

        this.db.ref('chats')
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
          this.db.ref('chats')
            .child('userNotifications')
            .child(u)
            .child(key)
            .set(true);
        });
      },
      /**
       *
       */
      unravelFirebaseListObject(inputObject) {
        const output = [];
        _.mapValues(inputObject, (v) => {
          output.push(v);
        });
        return output;
      },
      /**
       *
       */
      setSampleInfo() {
        // get the chat for this sample
        this.db.ref('chats')
          .child('sampleChats')
          .child(this.widgetPointer)
          .on('value', (snap2) => {
            const chatData = snap2.val();
            this.chatHistory = chatData;
          });

        // get the widget's summary info
        this.db.ref('sampleSummary')
          .child(this.widgetPointer)
          .on('value', (snap) => {
            this.widgetSummary = snap.val();
          });
      },
    },
  };
</script>
