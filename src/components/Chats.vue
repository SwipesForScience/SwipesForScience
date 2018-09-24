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
  import { db } from '../firebaseConfig';
  import config from '../config';

  export default {
    firebase: {
      sampleChat: {
        source: db.ref('chats').child('sampleChatIndex').orderByChild('time'),
        readyCallback() {
          // this.sampleChat.reverse();
          this.sampleChat.forEach((c) => {
            // console.log('c is', c);
            db.ref('chats')
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
    },
    data() {
      return {
        chatInfo: {},
        noData: false,
        blankChatImage: config.chats.blankImage,
      };
    },
    computed: {
      orderedPosts() {
        const chats = this.sampleChat;
        return chats.reverse();
        // return chats;
      },
    },
  };
</script>

<style></style>
