<template>
  <div class="page">
    <div class="page-title">
      <h1>Chats</h1>
    </div>
    <div class="page__content grey-gradient-bg">
      <div class="page__content-container">
        <div
          class="chat__placeholder"
          v-if="lastUpdatedSampleChats.length === 0"
        >
          <p>No one has said anything yet!</p>

          <img :src="blankChatImage" />
        </div>
        <div v-else>
          <router-link
            v-for="{ sampleId, lastMessage } in lastUpdatedSampleChats"
            :key="sampleId"
            :to="'/review/' + sampleId"
            class="chat__card"
          >
            <div class="title">{{ sampleId }}</div>
            <div class="chat__message">
              <span class="username">{{ lastMessage.username }}</span> :
              {{ lastMessage.message }}
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { ref, onValue } from "firebase/database";
/**
 * This is the component for the /chats route. It shows all the chat messages
 * for each sample.
 */
export default {
  created() {
    const chatsRef = ref(this.db, "chats");
    const unsubscribe = onValue(chatsRef, snapshot => {
      let lastUpdatedSampleChats = [];
      if (snapshot.exists()) {
        const chats = snapshot.val();
        const sampleChatIndex = _.get(chats, "sampleChatIndex");
        const fullSampleChats = _.get(chats, "sampleChats");
        lastUpdatedSampleChats = Object.keys(sampleChatIndex)
          .map(sampleId => ({
            sampleId,
            time: new Date(sampleChatIndex[sampleId].time).getTime(),
          }))
          .sort((a, b) => {
            return b.time - a.time;
          })
          .map(({ sampleId }) => {
            return {
              sampleId,
              lastMessage: _.last(Object.values(fullSampleChats[sampleId])),
            };
          });
      }
      this.lastUpdatedSampleChats = lastUpdatedSampleChats;
    });
    this.unsubscribeChats = unsubscribe;
  },
  beforeDestroy() {
    this.unsubscribeChats();
  },
  data() {
    return {
      lastUpdatedSampleChats: [],
      unsubscribeChats: () => {},
    };
  },
  props: {
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
  },
  computed: {
    /**
     * A blank image from the config file. If this.noData is true, this image is rendered.
     */
    blankChatImage() {
      return this.config.chats.blankImage;
    },
  },
};
</script>

<style scoped>
.chat__placeholder img {
  max-width: 500px;
}
.chat__card {
  display: block;
  padding: 1.5em;
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  transition: all 0.1s ease;
  margin-bottom: 2em;
}
.chat__card:hover {
  transform: translate(-2px, -2px);
}
.chat__card .title {
  display: block;
  color: var(--color-purple);
  font-weight: bold;
  margin-bottom: 12px;
}
.chat__message {
  color: var(--color-steel);
}
.chat__message .username {
  font-weight: bold;
}
</style>
