<template name="review">
  <div class="review-header">
    <ReviewConversation
      :widgetPointer="widgetPointer"
      :userInfo="userInfo"
      :db="db"
    />
  </div>
</template>

<script>
  import ReviewConversation from "@/components/Review/ReviewConversation";
  /**
   * The review component shows the widget for a pointer to a sample in its route,
   * and lets the user discuss the sample in a chat-room type UI.
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
    },
    components: {
      ReviewConversation
    },
    data() {
      return {
        /**
         * This sample ID to discuss.
         */
        widgetPointer: '',
      };
    },
    watch: {
      /**
       * When the route changes, set the current sample ID
       * (`widgetPointer`) to the `key` parameter from the route.
       */
      $route() {
        this.widgetPointer = this.$route.params.key;
      },
    },
    /**
     * When the component is mounted, set this components `widgetPointer`
     * to the route's `key` parameter. Also grab this sample's chats and its summary.
     */
    mounted() {
      this.widgetPointer = this.$route.params.key;
    },
  };
</script>
