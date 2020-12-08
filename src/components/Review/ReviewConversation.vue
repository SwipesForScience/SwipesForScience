<template name="review">
  <div>
    <div class="page__content-container review__header dashed-border">
      <slot name="button">
        <router-link to="/play">
          <button class="back-button">
            <i class="fa fa-angle-left"></i> Back to gameplay
          </button></router-link
        >
      </slot>
    </div>
    <div id="review" class="page-content grey-gradient-bg mobile-no-bg">
      <div class="page__content-container">
        <header class="dashed-border">
          <SampleAvatar />
          <h2>Conversation about {{ widgetPointer }}</h2>
          {{ chats }}
        </header>
        <div class="review-history" v-if="chatOrder.length > 0">
          <div
            v-for="msg in chatOrder"
            class="review-message"
            :key="msg.time"
            v-bind:class="{
              ['own-message']: msg.username === userInfo.displayName
            }"
          >
            <div class="review-message-date">{{ msg.formattedDate }}</div>
            <div class="review-message-text">
              <strong v-if="msg.username !== userInfo.displayName"
                >{{ msg.username }} : </strong
              >{{ msg.message }}
            </div>
          </div>
        </div>

        <div v-else>
          <p>No one has said anything yet!</p>
        </div>

        <form class="review-form" @submit="sendChat">
          <input
            v-model="chatMessage"
            type="text"
            placeholder="Type a message"
            required
          />
          <button @click="sendChat">
            <i class="fa fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import moment from "moment";
import SampleAvatar from "@/components/SampleAvatar";
/**
 * The review component shows the widget for a pointer to a sample in its route,
 * and lets the user discuss the sample in a chat-room type UI.
 */

export default {
  name: "ReviewConversation",
  props: {
    widgetPointer: {
      type: String,
      required: true
    },
    /**
     * the authenticated user object from firebase
     */
    userInfo: {
      type: Object,
      required: true
    },
    /**
     * the intialized firebase database
     */
    db: {
      type: Object,
      required: true
    },
    chats: {
      type: Object,
      required: false
    }
  },
  components: {
    SampleAvatar
  },
  data() {
    return {
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
     * Add human-readable dates to messages
     */
    chatOrder() {
      if (this.chatHistory) {
        return Object.values(this.chatHistory).map(message => ({
          formattedDate: moment(message.time).format("dddd, D MMM YYYY, LT"),
          ...message
        }));
      }
      return [];
    }
  },
  /**
   * When the component is mounted, set this components `widgetPointer`
   * to the route's `key` parameter. Also grab this sample's chats and its summary.
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
      this.db
        .ref("chats")
        .child("sampleChats")
        .child(this.widgetPointer)
        .push({
          username: this.userInfo.displayName,
          message: this.chatMessage,
          time: new Date().toISOString()
        });

      this.db
        .ref("chats")
        .child("sampleChatIndex")
        .child(this.widgetPointer)
        .set({
          time: new Date().toISOString()
        });

      this.db
        .ref("chats")
        .child("userChat")
        .child(this.userInfo.displayName)
        .child(this.widgetPointer)
        .set({
          watch: 1
        });

      this.chatMessage = "";

      // // add a flag to all other users following this chat.
      const usersToNotify = [];
      this.chatOrder.forEach(v => {
        if (
          usersToNotify.indexOf(v.username) < 0 &&
          v.username !== this.userInfo.displayName
        ) {
          usersToNotify.push(v.username);
        }
      });

      usersToNotify.forEach(u => {
        this.db
          .ref("chats")
          .child("userNotifications")
          .child(u)
          .child(this.widgetPointer)
          .set(true);
      });
    },
    /**
     * Take a firebase input object and make it a nice list.
     */
    unravelFirebaseListObject(inputObject) {
      const output = [];
      _.mapValues(inputObject, v => {
        output.push(v);
      });
      return output;
    },
    /**
     * Get the chat history for the current sample ID.
     */
    setSampleInfo() {
      // get the chat for this sample
      this.db
        .ref("chats")
        .child("sampleChats")
        .child(this.widgetPointer)
        .on("value", snap2 => {
          const chatData = snap2.val();
          this.chatHistory = chatData;
        });

      // get the user's settings for the widget.
      if (this.userInfo.displayName) {
        this.db
          .ref("userSettings")
          .child(this.userInfo.displayName)
          .once("value")
          .then(snap => {
            this.userSettings = snap.val() || {};
          });
      }

      // get the widget's summary info
      this.db
        .ref("sampleSummary")
        .child(this.widgetPointer)
        .on("value", snap => {
          this.widgetSummary = snap.val();
        });
    }
  },
  watch: {
    widgetPointer() {
      this.setSampleInfo();
    }
  }
};
</script>

<style scoped>
.page-content {
  min-height: calc(100vh - 32px);
}
header {
  padding-bottom: 24px;
}
.review__header {
  display: flex;
  justify-content: left;
  margin: 0 1.25em;
  padding: 1em 0;
  position: relative;
}
.back-button {
  width: auto;
  background-color: transparent;
  color: var(--color-purple);
  font-weight: 600;
  align-self: flex-start;
}

h2 {
  font-size: 12px;
  font-weight: 600;
  margin-top: 24px;
}
.page__content-container {
  background: transparent;
  min-height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.review-form {
  position: sticky;
  padding: 12px 0;
  bottom: 0;
  display: flex;
  align-items: center;
}
.review-form input {
  flex-grow: 1;
  background-color: var(--color-lavender);
  border-radius: var(--border-radius);
}
.review-form button {
  width: 40px;
  height: 40px;
  color: var(--color-white);
  font-size: 20px;
  border-radius: 50%;
  background-color: var(--color-purple);
  filter: drop-shadow(1px 1px 1px var(--color-purple));
  margin-left: 12px;
}

.review-form button i {
  transform: translate(-1px, 1px);
}

.review-message {
  display: flex;
  flex-direction: column;
  margin: 24px 0;
}
.review-message-date {
  font-weight: 600;
  font-size: 12px;
  margin-bottom: 12px;
}
.review-message-text {
  background-color: var(--color-yellow);
  width: 70%;
  font-size: 14px;
  line-height: 160%;
  text-align: left;
  padding: 12px;
}

.own-message .review-message-text {
  background-color: var(--color-lavender);
  border-radius: var(--border-radius);
  align-self: flex-end;
}
@media (min-width: 30em) {
  .review-form {
    position: static;
    background: transparent;
  }

  @media (min-width: 30em) {
    .review__header.dashed-border:after {
      display: none;
    }
  }
  @media (min-width: 65em) {
    .review__header {
      margin: 0 auto;
    }
  }
}
</style>
