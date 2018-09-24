<template>
  <b-container>
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
  </b-container>
</template>

<script>
  import { db } from '../firebaseConfig';

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
