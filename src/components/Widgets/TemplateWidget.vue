<template>
  <!-- This is a dummy Widget Template -->
  <div class="widgetTemplate">

    <p class="lead mb-3 pb-3 mt-3 pt-3">{{widgetPointer}}</p>

    <p v-if="!playMode" class="mb-3 pb-3 mt-3 pt-3">{{widgetSummary}}</p>

    <div class="row" v-if="playMode">
      <b-btn varient="danger" @click="vote(0)">Vote No</b-btn>
      <b-btn variant="success" @click="vote(1)">Vote Yes</b-btn>
    </div>

  </div>
</template>

<script>
  export default {
    props: ['widgetPointer', 'widgetProperties', 'widgetSummary', 'playMode'],
    data() {
      return {

      };
    },
    methods: {
      setSummary() {
        this.widgetSummaryPointer.once('value', (snap) => {
          this.widgetSummary = snap.val();
        });
      },
      getScore(response) {
        if (response) {
          return 1;
        }
        return 0;
      },
      getFeedback(response) {
        if (response) {
          return {
            show: true,
            variant: 'success',
            message: 'good job',
          };
        }

        return {
          show: true,
          variant: 'danger',
          message: 'bad job',
        };
      },
      vote(val) {
        this.$emit('widgetRating', val);
      },
    },
  };
</script>

<style>

</style>
