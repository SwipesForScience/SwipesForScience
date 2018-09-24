<template>
  <b-container>
    <div v-if="imageChat.length">
      <h1>Chats</h1>
      <p class="lead">See which samples people are talking about</p>
      <p v-for="(c, index) in imageChat" :key="index">
        <b-alert show>
          <router-link :to="'/listen/' + c['.key']">{{c['.key']}}</router-link>
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
      imageChat: {
        source: db.ref('imageChatIndex').orderByChild('time'),
        readyCallback() {
          this.imageChat.reverse();
          this.imageChat.forEach((c) => {
            // console.log('c is', c);
            db.ref('imageChat').child(c['.key']).orderByKey().limitToLast(1)
              .on('value', (snap) => {
                const data = snap.val();
                this.chatInfo[c['.key']] = data[Object.keys(data)[0]];
                this.$forceUpdate();
              });
          });
        },
      }, // .limitToLast(25)
    },
    data() {
      return {
        chatInfo: {},
        blankChatImage: config.chats.blankImage,
      };
    },
    computed: {
      orderedPosts() {
        const chats = this.imageChat;
        chats.reverse();
        return chats;
      },
    },
  };
</script>

<style></style>
