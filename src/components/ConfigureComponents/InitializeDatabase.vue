<template>
  <div>
    <div class="text-left ml-3 pl-3">
      <p>Admin: {{admin}}</p>
      <p>sampleCounts: {{sampleCounts}}</p>
      <p>sampleSummary: {{sampleSummary}}</p>
      <p>chats: {{chats}}</p>
      <p>user seen samples: {{userSeenSamples}}</p>
      <p>votes: {{votes}}</p>
    </div>

    <b-btn v-if="ready" @click="next()">Next</b-btn>
  </div>
</template>

<script>
  /**
  * An interface that initializes an empty firebase realtime database
  * with a default schema, assuming that the firebase rules are in test mode
  * e.g (`{".read": true, ".write": true}`)
  */
  export default {
    name: 'Initializer',
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
      /**
       * the authenticated user object from firebase
       */
      userInfo: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        /**
        * whether or not the /settings/admins/<username> is initialized on firebase
        */
        admin: false,
        /**
        * whether or not the /sampleCounts is initialized on firebase
        */
        sampleCounts: false,
        /**
        * whether or not the /sampleSummary is initialized on firebase
        */
        sampleSummary: false,
        /**
        * whether or not the /chats is initialized on firebase
        */
        chats: false,
        /**
        * whether or not the /userSeenSamples is initialized on firebase
        */
        userSeenSamples: false,
        /**
        * whether or not the /userSettings is initialized on firebase
        */
        userSettings: false,
        /**
        * whether or not the /votes is initialized on firebase
        */
        votes: false,
      };
    },
    computed: {
      /**
      * the logged in user's UID
      */
      uid() {
        return this.userInfo.uid;
      },
      /**
      * returns whether or not everything is inialized correctly.
      */
      ready() {
        return this.admin && this.sampleCounts &&
        this.sampleSummary && this.chats &&
        this.userSeenSamples && this.votes && this.userSettings;
      },
    },
    watch: {
      /**
      * once its ready, go to the next step in configuration.
      */
      ready() {
        if (this.ready) {
          this.next();
        }
      },
    },
    /**
    * initialize all documents
    */
    mounted() {
      this.initAll();
    },
    methods: {
      /**
       * initialize the admin schema
       */
      initAdmin() {
        const displayName = this.userInfo.displayName;
        this.db.ref('settings')
          .child('admins')
          .child(displayName)
          .set(1);
        this.db.ref('users')
          .child(displayName)
          .child('admin')
          .set(true)
          .then(() => {
            this.admin = true;
          });
      },
      /**
       * initialize /sampleCounts
       */
      initSampleCounts() {
        this.db.ref('sampleCounts').once('value').then((snap) => {
          const val = snap.val();
          if (val === null) {
            this.db.ref('sampleCounts').set(0);
          }
        })
        .then(() => {
          this.sampleCounts = true;
        });
      },
      /**
       * initialize /sampleSummary
       */
      initSampleSummary() {
        this.db.ref('sampleSummary').once('value').then((snap) => {
          const val = snap.val();
          if (val === null) {
            this.db.ref('sampleSummary').set(0);
          }
        })
        .then(() => {
          this.sampleSummary = true;
        });
      },
      /**
       * initialize /chats
       */
      initChats() {
        this.db.ref('chats').once('value').then((snap) => {
          const val = snap.val();
          if (val === null) {
            this.db.ref('chats').set(0);
          }
        })
        .then(() => {
          this.chats = true;
        });
      },
      /**
       * initialize /userSeenSamples
       */
      initUserSeenSamples() {
        const displayName = this.userInfo.displayName;
        this.db.ref('userSeenSamples')
          .child(displayName)
          .once('value')
          .then((snap) => {
            const val = snap.val();
            if (val === null) {
              this.db.ref('userSeenSamples')
                .child(displayName)
                .set(0);
            }
          })
          .then(() => {
            this.userSeenSamples = true;
          });
      },
      /**
       * initialize /votes
       */
      initVotes() {
        this.db.ref('votes').once('value').then((snap) => {
          const val = snap.val();
          if (val === null) {
            this.db.ref('votes').set(0);
          }
        })
        .then(() => {
          this.votes = true;
        });
      },
      /**
      * initialize userSettings
      */
      initUserSettings() {
        this.db.ref('userSettings').once('value').then((snap) => {
          const val = snap.val();
          if (val === null) {
            this.db.ref('userSettings').set(0);
          }
        }).then(() => {
          this.userSettings = true;
        });
      },
      /**
       * initialize all
       */
      initAll() {
        this.initAdmin();
        this.initSampleCounts();
        this.initSampleSummary();
        this.initChats();
        this.initUserSeenSamples();
        this.initUserSettings();
        this.initVotes();
      },
      /**
       * emit an event called "next" to the parent component.
       */
      next() {
        this.$emit('next');
      },
    },
  };
</script>
<style></style>
