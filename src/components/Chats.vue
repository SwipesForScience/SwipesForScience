<template>
  <b-container>
    <div v-if="!noData">
      <h1>Chats</h1>
      <p class="lead">See which samples people are talking about</p>
      <p v-for="(c, index) in sampleChat" :key="index">
        <b-alert show>
          <router-link :to="'/review/' + c['.key']">{{c['.key']}}</router-link>
          <br>
          <span v-if="chatInfo[c['.key']]">
            <b>{{chatInfo[c['.key']].username}}</b> : {{chatInfo[c['.key']].message}}
          </span>
        </b-alert>
      </p>
    </div>
    <div v-else>
      <h1>Chats</h1>
      <p class="lead">No one has said anything yet!</p>
      <img :src="blankChatImage" class="blankImage"/>
    </div>
  </b-container>
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

<style>
  .blankImage {
    max-width: 500px;
  }
</style>
