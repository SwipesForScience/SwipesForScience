<template>
  <div class="WidgetSelector">

    <Highlight v-if="widgetType=='Highlight'"
     ref="Highlight"
     :widgetPointer="widgetPointer"
     :widgetProperties="widgetProperties"
     :widgetSummary="widgetSummary"
     :tutorialStep="tutorialStep"
     v-on:widgetRating="widgetRating"
     :playMode="playMode"
     />

    <ImageSwipe
     v-else-if="widgetType=='ImageSwipe'"
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
  import Highlight from './Widgets/Highlight';
  import ImageSwipe from './Widgets/ImageSwipe';
  import ImageSoundSwipe from './Widgets/ImageSoundSwipe';
  import PubMedNLP from './Widgets/PubMedNLP';
  import TemplateWidget from './Widgets/TemplateWidget';
  import ImageSplat from './Widgets/ImageSplat';

  export default {
    name: 'WidgetSelector',
    props: [
      'widgetType',
      'widgetPointer',
      'widgetProperties',
      'widgetSummary',
      'playMode',
      'tutorialStep',
    ],
    components: {
      Highlight,
      ImageSwipe,
      ImageSoundSwipe,
      PubMedNLP,
      TemplateWidget,
      ImageSplat,
    },
    methods: {
      getFeedback(response) {
        return this.$refs[this.widgetType].getFeedback(response);
      },
      getScore(response) {
        return this.$refs[this.widgetType].getScore(response);
      },
      getSummary(response) {
        return this.$refs[this.widgetType].getSummary(response);
      },
      widgetRating(response) {
        this.$emit('widgetRating', response);
      },
    },
  };
</script>

<style>

</style>
