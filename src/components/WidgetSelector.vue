<template>
  <div class="WidgetSelector">

    <ImageSwipe
     v-if="widgetType=='ImageSwipe'"
     ref="ImageSwipe"
     :widgetPointer="widgetPointer"
     :widgetProperties="widgetProperties"
     :widgetSummary="widgetSummary"
     :tutorialStep="tutorialStep"
     v-on:widgetRating="widgetRating"
     :playMode="playMode"
     />

    <ImageSoundSwipe
     ref="ImageSoundSwipe"
     v-else-if="widgetType=='ImageSoundSwipe'"
     :widgetPointer="widgetPointer"
     :widgetProperties="widgetProperties"
     :widgetSummary="widgetSummary"
     :tutorialStep="tutorialStep"
     v-on:widgetRating="widgetRating"
     :playMode="playMode"
     />

    <PubMedNLP  v-else-if="widgetType=='PubMedNLP'"
     ref="PubMedNLP"
     :widgetPointer="widgetPointer"
     :widgetProperties="widgetProperties"
     :widgetSummary="widgetSummary"
     :tutorialStep="tutorialStep"
     v-on:widgetRating="widgetRating"
     :playMode="playMode"
    />

    <ImageSplat  v-else-if="widgetType=='ImageSplat'"
     ref="ImageSplat"
     :widgetPointer="widgetPointer"
     :widgetProperties="widgetProperties"
     :widgetSummary="widgetSummary"
     :tutorialStep="tutorialStep"
     v-on:widgetRating="widgetRating"
     :playMode="playMode"
    />

    <TemplateWidget v-else
    ref="TemplateWidget"
    :widgetPointer="widgetPointer"
    :widgetProperties="widgetProperties"
    :widgetSummary="widgetSummary"
    :tutorialStep="tutorialStep"
    v-on:widgetRating="widgetRating"
    :playMode="playMode"
    />

  </div>
</template>

<script>
/**
 * TODO: fill this in.
 */
  import ImageSwipe from './Widgets/ImageSwipe';
  import ImageSoundSwipe from './Widgets/ImageSoundSwipe';
  import PubMedNLP from './Widgets/PubMedNLP';
  import TemplateWidget from './Widgets/TemplateWidget';
  import ImageSplat from './Widgets/ImageSplat';

  export default {
    name: 'WidgetSelector',
    props: {
      /**
       * TODO: fill this in.
       */
      widgetType: {
        type: String,
        required: true,
      },
       /**
        * TODO: fill this in.
        */
      widgetPointer: {
        type: String,
        required: true,
      },
      /**
       * TODO: fill this in.
       */
      widgetProperties: {
        type: Object,
        required: true,
      },
      /**
       * TODO: fill this in.
       */
      widgetSummary: {
        type: Object,
        required: false,
      },
      /**
       * TODO: fill this in.
       */
      playMode: {
        type: String,
        required: false,
      },
      /**
       * TODO: fill this in.
       */
      tutorialStep: {
        type: Number,
        required: false,
      },
    },
    components: {
      ImageSwipe,
      ImageSoundSwipe,
      PubMedNLP,
      TemplateWidget,
      ImageSplat,
    },
    methods: {
      /**
       * TODO: fill this in.
       */
      getFeedback(response) {
        return this.$refs[this.widgetType].getFeedback(response);
      },
      /**
       * TODO: fill this in.
       */
      getScore(response) {
        return this.$refs[this.widgetType].getScore(response);
      },
      /**
       * TODO: fill this in.
       */
      getSummary(response) {
        return this.$refs[this.widgetType].getSummary(response);
      },
      /**
       * TODO: fill this in.
       */
      widgetRating(response) {
        this.$emit('widgetRating', response);
      },
    },
  };
</script>

<style>

</style>
