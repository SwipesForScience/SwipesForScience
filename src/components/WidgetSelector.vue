<template>
  <div class="WidgetSelector">

    <Highlight v-if="widgetType=='Highlight'"
     ref="Highlight"
     :data="widgetPointer"
     :properties="widgetProperties"
     :summary="widgetSummary"
     v-on:widgetRating="widgetRating"
     :playMode="playMode"
     />

    <ImageSwipe
     v-else-if="widgetType=='ImageSwipe'"
     ref="ImageSwipe"
     :data="widgetPointer"
     :properties="widgetProperties"
     :summary="widgetSummary"
     v-on:widgetRating="widgetRating"
     :playMode="playMode"
     />

    <ImageSoundSwipe
     ref="ImageSoundSwipe"
     v-else-if="widgetType=='ImageSoundSwipe'"
     :data="widgetPointer"
     :properties="widgetProperties"
     :summary="widgetSummary"
     v-on:widgetRating="widgetRating"
     :playMode="playMode"
     />

    <NLP  v-else-if="widgetType=='NLP'"
     ref="NLP"
     :data="widgetPointer"
     :properties="widgetProperties"
     :summary="widgetSummary"
     v-on:widgetRating="widgetRating"
     :playMode="playMode"
    />

    <TemplateWidget v-else
    ref="TemplateWidget"
    :data="widgetPointer"
    :properties="widgetProperties"
    :summary="widgetSummary"
    v-on:widgetRating="widgetRating"
    :playMode="playMode"
    />

  </div>
</template>

<script>
  import Highlight from './Widgets/Highlight';
  import ImageSwipe from './Widgets/ImageSwipe';
  import ImageSoundSwipe from './Widgets/ImageSoundSwipe';
  import NLP from './Widgets/NLP';
  import TemplateWidget from './Widgets/TemplateWidget';

  export default {
    name: 'WidgetSelector',
    props: [
      'widgetType',
      'widgetPointer',
      'widgetProperties',
      'widgetSummary',
      'playMode',
    ],
    components: {
      Highlight,
      ImageSwipe,
      ImageSoundSwipe,
      NLP,
      TemplateWidget,
    },
    methods: {
      getFeedback(response) {
        return this.$refs[this.widgetType].getFeedback(response);
      },
      getScore(response) {
        return this.$refs[this.widgetType].getScore(response);
      },
      widgetRating(response) {
        this.$emit('widgetRating', response);
      },
    },
  };
</script>

<style>

</style>
