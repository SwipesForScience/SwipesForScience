<template>
  <div class="WidgetSelector">
    <Secret
      :userSettings="userSettings"
      :needsSecret="needsSecret"
      :serverSecret="serverSecret"
      v-on:updateUserSettings="updateUserSettings"
    >
      <ImageSwipe
        v-if="widgetType == 'ImageSwipe'"
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
      <TimedImageSwipe
        v-if="widgetType == 'TimedImageSwipe'"
        ref="TimedImageSwipe"
        :widgetPointer="widgetPointer"
        :widgetProperties="widgetProperties"
        :widgetSummary="widgetSummary"
        :userSettings="userSettings"
        :tutorialStep="tutorialStep"
        v-on:widgetRating="widgetRating"
        v-on:setStartTime="setStartTime"
        v-on:updateUserSettings="updateUserSettings"
        :playMode="playMode"
      />
      <TemplateWidget
        v-else
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
    </Secret>
  </div>
</template>

<script>
/**
 * This a "switch" component, it displays whatever widget is
 * passed from the parent prop. It is also a proxy for any events emited from
 * the specific widget to the parent.
 */
import ImageSwipe from "./Widgets/ImageSwipe";
import TimedImageSwipe from "./Widgets/TimedImageSwipe";
import TemplateWidget from "./Widgets/TemplateWidget";
import Secret from "./Widgets/Secret";

export default {
  name: "WidgetSelector",
  props: {
    /**
     * WidgetType is a string. It can be "ImageSwipe" for example.
     */
    widgetType: {
      type: String,
      required: true
    },
    /**
     * The sample ID to tell the widget to display.
     */
    widgetPointer: {
      type: String,
      required: true
    },
    /**
     * The widget-specific properties. The schema is widget specific.
     */
    widgetProperties: {
      type: Object,
      required: true
    },
    /**
     * The user's settings on the widget. The schema is widget specific.
     */
    userSettings: {
      type: Object,
      required: true
    },
    /**
     * The summary data for the widget.
     * This could keep track of the running average, for example.
     */
    widgetSummary: {
      type: Object,
      required: false
    },
    /**
     * Tells the widget if it should be in a "play mode" or maybe a "review mode".
     */
    playMode: {
      type: String,
      required: false
    },
    /**
     * Tells the widget to display a tutorial step.
     * Could be like highlighting a certain button.
     */
    tutorialStep: {
      type: Number,
      required: false
    },
    /**
     * whether or not the data needs a secret
     */
    needsSecret: {
      type: Boolean,
      required: false
    },
    /**
     * the secret, only used if needed.
     */
    serverSecret: {
      type: String,
      required: false
    }
  },
  components: {
    ImageSwipe,
    TimedImageSwipe,
    TemplateWidget,
    Secret
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
      this.$emit("widgetRating", response);
    },
    /**
     * emit the widget's response to the parent.
     */
    setStartTime(response) {
      this.$emit("setStartTime", response);
    },
    /**
     * emit the widget's user settings to the parent
     */
    updateUserSettings(settings) {
      this.$emit("updateUserSettings", settings);
    }
  }
};
</script>

<style></style>
