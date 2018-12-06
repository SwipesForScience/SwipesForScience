<template>
  <div class="WidgetSelector">

    <ImageSwipe
     v-if="widgetType=='ImageSwipe'"
     ref="ImageSwipe"
     :widgetPointer="widgetPointer"
     :widgetProperties="widgetProperties"
     :widgetSummary="widgetSummary"
     :userSettings="userSettings"
     :tutorialStep="tutorialStep"
     v-on:widgetRating="widgetRating"
     v-on:updateUserSettings="updateUserSettings"
     :playMode="playMode"
     />

    <ImageSoundSwipe
     ref="ImageSoundSwipe"
     v-else-if="widgetType=='ImageSoundSwipe'"
     :widgetPointer="widgetPointer"
     :widgetProperties="widgetProperties"
     :userSettings="userSettings"
     :widgetSummary="widgetSummary"
     :tutorialStep="tutorialStep"
     v-on:widgetRating="widgetRating"
     v-on:updateUserSettings="updateUserSettings"
     :playMode="playMode"
     />

    <PubMedNLP  v-else-if="widgetType=='PubMedNLP'"
     ref="PubMedNLP"
     :widgetPointer="widgetPointer"
     :widgetProperties="widgetProperties"
     :userSettings="userSettings"
     :widgetSummary="widgetSummary"
     :tutorialStep="tutorialStep"
     v-on:widgetRating="widgetRating"
     v-on:updateUserSettings="updateUserSettings"
     :playMode="playMode"
     />

    <ImageSplat  v-else-if="widgetType=='ImageSplat'"
     ref="ImageSplat"
     :widgetPointer="widgetPointer"
     :widgetProperties="widgetProperties"
     :userSettings="userSettings"
     :widgetSummary="widgetSummary"
     :tutorialStep="tutorialStep"
     v-on:widgetRating="widgetRating"
     v-on:updateUserSettings="updateUserSettings"
     :playMode="playMode"
     />

    <TextTagger v-else-if="widgetType=='TextTagger'"
     ref="TextTagger"
     :widgetPointer="widgetPointer"
     :widgetProperties="widgetProperties"
     :userSettings="userSettings"
     :widgetSummary="widgetSummary"
     :tutorialStep="tutorialStep"
     v-on:widgetRating="widgetRating"
     v-on:updateUserSettings="updateUserSettings"
     :playMode="playMode"
     />

    <ImageSwipeChoices  v-else-if="widgetType=='ImageSwipeChoices'"
     ref="ImageSwipeChoices"
     :widgetPointer="widgetPointer"
     :widgetProperties="widgetProperties"
     :userSettings="userSettings"
     :widgetSummary="widgetSummary"
     :tutorialStep="tutorialStep"
     v-on:widgetRating="widgetRating"
     v-on:updateUserSettings="updateUserSettings"
     :playMode="playMode"
     />

    <BranchingTemplateWidget v-else-if="widgetType=='BranchingTemplateWidget'"
      ref="BranchingTemplateWidget"
      :widgetPointer="widgetPointer"
      :widgetProperties="widgetProperties"
      :userSettings="userSettings"
      :widgetSummary="widgetSummary"
      :tutorialStep="tutorialStep"
      v-on:widgetRating="widgetRating"
      v-on:updateUserSettings="updateUserSettings"
      :playMode="playMode"
      />

      <TextBinarySwipe v-else-if="widgetType=='TextBinarySwipe'"
        ref="TextBinarySwipe"
        :widgetPointer="widgetPointer"
        :widgetProperties="widgetProperties"
        :userSettings="userSettings"
        :widgetSummary="widgetSummary"
        :tutorialStep="tutorialStep"
        v-on:widgetRating="widgetRating"
        v-on:updateUserSettings="updateUserSettings"
        :playMode="playMode"
        />

    <TemplateWidget v-else
      ref="TemplateWidget"
      :widgetPointer="widgetPointer"
      :widgetProperties="widgetProperties"
      :userSettings="userSettings"
      :widgetSummary="widgetSummary"
      :tutorialStep="tutorialStep"
      v-on:widgetRating="widgetRating"
      v-on:updateUserSettings="updateUserSettings"
      :playMode="playMode"
      />

  </div>
</template>

<script>
/**
 * This a "switch" component, it displays whatever widget is
 * passed from the parent prop. It is also a proxy for any events emited from
 * the specific widget to the parent.
 */
  import ImageSwipe from './Widgets/ImageSwipe';
  import ImageSwipeChoices from './Widgets/ImageSwipeChoices';
  import ImageSoundSwipe from './Widgets/ImageSoundSwipe';
  import PubMedNLP from './Widgets/PubMedNLP';
  import TemplateWidget from './Widgets/TemplateWidget';
  import ImageSplat from './Widgets/ImageSplat';
  import TextTagger from './Widgets/TextTagger';
  import BranchingTemplateWidget from './Widgets/BranchingTemplateWidget';
  import TextBinarySwipe from './Widgets/TextBinarySwipe';

  export default {
    name: 'WidgetSelector',
    props: {
      /**
       * WidgetType is a string. It can be "ImageSwipe" for example.
       */
      widgetType: {
        type: String,
        required: true,
      },
       /**
        * The sample ID to tell the widget to display.
        */
      widgetPointer: {
        type: String,
        required: true,
      },
      /**
       * The widget-specific properties. The schema is widget specific.
       */
      widgetProperties: {
        type: Object,
        required: true,
      },
      /**
       * The user's settings on the widget. The schema is widget specific.
       */
      userSettings: {
        type: Object,
        required: true,
      },
      /**
       * The summary data for the widget.
       * This could keep track of the running average, for example.
       */
      widgetSummary: {
        type: Object,
        required: false,
      },
      /**
       * Tells the widget if it should be in a "play mode" or maybe a "review mode".
       */
      playMode: {
        type: String,
        required: false,
      },
      /**
       * Tells the widget to display a tutorial step.
       * Could be like highlighting a certain button.
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
      ImageSwipeChoices,
      TextTagger,
      BranchingTemplateWidget,
      TextBinarySwipe,
    },
    methods: {
      /**
       * proxy the widget's getFeedback method.
       */
      getFeedback(response) {
        return this.$refs[this.widgetType].getFeedback(response);
      },
      /**
       * proxy the widget's getScore method.
       */
      getScore(response) {
        return this.$refs[this.widgetType].getScore(response);
      },
      /**
       * proxy the widget's getSummary method.
       */
      getSummary(response) {
        return this.$refs[this.widgetType].getSummary(response);
      },
      /**
       * emit the widget's response to the parent.
       */
      widgetRating(response) {
        this.$emit('widgetRating', response);
      },
      /**
      * emit the widget's user settings to the parent
      */
      updateUserSettings(settings) {
        this.$emit('updateUserSettings', settings);
      },
    },
  };
</script>

<style>

</style>
