<template>
  <div class="page">
    <div class="page-title">
      <h1>Chats</h1>
    </div>
    <div class="page-content grey-gradient-bg">
      <div class="page__content-container">
        <div class="chat__placeholder" v-if="noData">
          <p>No one has said anything yet!</p>
          <img :src="blankChatImage" />
        </div>
        <div v-else>
          <router-link
            v-for="(c, index) in sampleChat"
            :key="index"
            :to="'/review/' + c['.key']"
            class="chat__card"
          >
            <div class="title">{{ c[".key"] }}</div>
            <div class="chat__message">
              <span class="username">{{ chatInfo[c[".key"]].username }}</span> :
              {{ chatInfo[c[".key"]].message }}
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * This is the component for the /chats route. It shows all the chat messages
 * for each sample.
 */

  export default {
    firebase() {
      return {
        /**
        * keep track of all the samples that have been discussed.
        */
        sampleChat: {
          source: this.db.ref('chats').child('sampleChatIndex').orderByChild('time'),
          readyCallback() {
            // this.sampleChat.reverse();
            this.sampleChat.forEach((c) => {
              // console.log('c is', c);
              this.db.ref('chats')
                .child('sampleChats')
                .child(c['.key'])
                .orderByKey()
                .limitToLast(1)
                .on('value', (snap) => {
                  const data = snap.val();
                  this.chatInfo[c['.key']] = data[Object.keys(data)[0]];
                  this.$forceUpdate();
                });
            });

            if (!this.sampleChat.length) {
              this.noData = true;
            }
          },
        },
      };
    },
    data() {
      return {
        /**
         *
         */
        chatInfo: {},
        /**
         * A flag to tell us if the /chats doc is empty on firebase.
         */
        noData: false,
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
       * Reverses the order of the chats.
       */
      orderedPosts() {
        const chats = this.sampleChat;
        return chats.reverse();
      },
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

