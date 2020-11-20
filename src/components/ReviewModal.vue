<template name="review">
  <b-modal
    :id="'reviewModal-' + widgetPointer"
    :ref="'reviewModal-' + widgetPointer"
    title="Chat"
    ok-only
  >
    <div id="review" class="container">
      <div class="chat container">
        <div class="chatHistory px-3 py-3 mb-3" v-if="chatOrder.length">
          <p v-for="msg in chatOrder" class="text-left mb-3" :key="msg.time">
            <b>{{ msg.username }}</b
            >: {{ msg.message }}
          </p>
        </div>
        <div class="mb-3" v-else>
          <p>No one has said anything yet!</p>
        </div>
        <b-form @submit="sendChat">
          <b-form-group
            id="exampleInputGroup1"
            label="Enter chat message:"
            label-for="exampleInput1"
            description=""
          >
            <b-form-input
              id="exampleInput1"
              type="text"
              v-model="chatMessage"
              required
              placeholder="Enter your message"
            >
            </b-form-input>
            <b-button class="mt-2 mx-1" variant="primary" @click="sendChat"
              >Send</b-button
            >
          </b-form-group>
        </b-form>
      </div>
    </div>
  </b-modal>
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
import _ from "lodash";
/**
 * The review component shows the widaget for a pointer to a sample in its route,
 * and lets the user discuss the sample in a chat-room type UI.
 */

export default {
  name: "ReviewModal",
  props: {
    /**
     * This sample ID to discuss.
     */
    widgetPointer: {
      type: String,
      required: false
    },
    /**
     * the authenticated user object from firebase
     */
    userInfo: {
      type: Object,
      required: true
    },
    /**
     * the computed user data object based on userInfo
     */
    userData: {
      type: Object,
      required: true
    },
    /**
     * the various levels, the points need to reach the levels,
     * and the badges (colored and greyed out) to display
     */
    levels: {
      type: Object,
      required: true
    },
    /**
     * the user's current level
     */
    currentLevel: {
      type: Object,
      required: true
    },
    /**
     * The config object that is loaded from src/config.js.
     * It defines how the app is configured, including
     * any content that needs to be displayed (app title, images, etc)
     * and also the type of widget and where to update pointers to data
     */
    config: {
      type: Object,
      required: true
    },
    /**
     * the intialized firebase database
     */
    db: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      /**
       * The summary of the sample ID
       */
      widgetSummary: {},
      /**
       * The user's settings from firebase
       */
      userSettings: {},
      /**
       * The chat message that the user types.
       */
      chatMessage: "",
      /**
       * This list of previous chat messages.
       */
      chatHistory: []
    };
  },
  computed: {
    /**
     * Chat history
     */
    chatOrder() {
      const chats = [];
      _.mapValues(this.chatHistory, v => {
        chats.push(v);
      });
      return chats;
    }
  },
  /**
   * When the component is mounted, set this components `widgetPointer`
   * also grab this sample's chats and its summary.
   */
  mounted() {
    this.setSampleInfo();
  },
  methods: {
    /**
     * Method to add a new chat message. Update
     * 1. push the username, message and timestamp to `chats/sampleChats`
     * 2. set the most recent chat time for this sample to `chats/sampleChatIndex`
     * 3. set that the user has sent a chat for this sample to `chats/userChat/<username>`
     * 4. **TODO**: set that other users following this chat have something new to see.
     */
    sendChat(e) {
      e.preventDefault();
      const key = this.widgetPointer;

      this.db
        .ref("chats")
        .child("sampleChats")
        .child(key)
        .push({
          username: this.userData[".key"],
          message: this.chatMessage,
          time: new Date().toISOString()
        });

      this.db
        .ref("chats")
        .child("sampleChatIndex")
        .child(key)
        .set({
          time: new Date().toISOString()
        });

      this.db
        .ref("chats")
        .child("userChat")
        .child(this.userData[".key"])
        .child(key)
        .set({
          watch: 1
        });

      this.chatMessage = "";

      // add a flag to all other users following this chat.
      const usersToNotify = [];
      const that = this;
      this.chatOrder.forEach(v => {
        if (
          usersToNotify.indexOf(v.username) < 0 &&
          v.username !== that.userData[".key"]
        ) {
          usersToNotify.push(v.username);
        }
      });

      usersToNotify.forEach(u => {
        that.db
          .ref("chats")
          .child("userNotifications")
          .child(u)
          .child(key)
          .set(true);
      });

      this.setSampleInfo();
    },
    /**
     * Get the chat history for the current sample ID.
     */
    setSampleInfo() {
      // get the chat for this sample
      const that = this;
      this.db
        .ref("chats")
        .child("sampleChats")
        .child(this.widgetPointer)
        .on("value", snap2 => {
          const chatData = snap2.val();
          that.chatHistory = chatData;
        });

      // get the user's settings for the widget.
      if (this.userInfo.displayName) {
        this.db
          .ref("userSettings")
          .child(this.userInfo.displayName)
          .once("value")
          .then(snap => {
            that.userSettings = snap.val() || {};
          });
      }

      // get the widget's summary info
      that.db
        .ref("sampleSummary")
        .child(that.widgetPointer)
        .on("value", snap => {
          that.widgetSummary = snap.val();
        });
    }
  }
};
</script>
