<template name="tutorial">
  <div class="tutorial">
    <p>
      The code for the tutorial will go here.

      Until then, click the button to play.
    </p>
    <b-button @click="tutorialComplete">Done</b-button>
  </div>
</template>

<style>

</style>

<script>

export default {
  name: 'tutorial',
  firebase: {

  },
  data() {
    return {

    };
  },
  computed: {
  },
  components: { },
  props: ['levels'],
  watch: {
  },
  methods: {
    tutorialComplete() {
      this.$emit('taken_tutorial', true);
    },
  },
};
</script>
