# image-sound-swipe 

The ImageSoundSwipe widget is based on the original, https://braindr.us Tinder-like widget
where you swipe left to "fail" an image, and swipe right to  "pass" it.
in this case, we also play a sound (it should be a short sound clip)
and the image should in some way correspond to the sound (a spectrogram for example)
this is for binary classification only. 

## props 

- `widget-pointer` ***String*** (*required*) 

  The sample ID to tell the widget to display. 

- `widget-properties` ***Object*** (*required*) 

  The widget-specific properties. The schema is widget specific. 

- `widget-summary` ***Object*** (*optional*) 

  The summary data for the widget.
  This one keeps track of the running average. 

- `play-mode` ***String*** (*optional*) 

  Tells the widget if it should be in a "play mode" or maybe a "review mode". 

- `user-settings` ***Object*** (*required*) 

  The user's settings on the widget. The schema is widget specific. 

- `tutorial-step` ***Number*** (*optional*) 

  Tells the widget to display a tutorial step.
  tutorialStep = 1 highlights/glows the pass button.
  tutorialStep = 2 highlights/glows the fail button.
  tutorialStep = 3 highlights/glows the help button. 

## data 

- `status` 

  the status of the image to load 

**initial value:** `'loading'` 

- `swipe` 

  save the swipe direction. 

**initial value:** `null` 

- `currentAudio` 

  the current audio clip that is playing. 

**initial value:** `null` 

## computed properties 

- `baseUrl` 

  Compute the baseURL based on baseUrlTemplate and delimiter of the widgetProperties,
  and the widgetPointer. For example a widgetPointer="contrast1__image1" could be
  mapped to https://base_url/contrast1/image1.jpg if
  baseUrlTemplate = 'https://base_url/{0}/{1}.jpg' and delimiter === '__'. 

   **dependencies:** `widgetProperties`, `widgetPointer`, `fillPropertyPattern`, `widgetProperties`, `widgetProperties` 

- `soundUrl` 

  Compute the soundURL based on soundUrlTemplate and delimiter of the widgetProperties,
  and the widgetPointer. For example a widgetPointer="contrast1__image1" could be
  mapped to https://base_url/contrast1/image1.wav if
  soundUrlTemplate = 'https://base_url/{0}/{1}.wav' and delimiter === '__'. 

   **dependencies:** `widgetProperties`, `widgetPointer`, `fillPropertyPattern`, `widgetProperties`, `widgetProperties` 


## events 

- `widgetRating` 

## methods 

- `showTutorialStep(stepNumber)` 

  Show a tutorial step 

- `fillPropertyPattern(pattern, delimiter)` 

  Fill a pattern by `this.widgetPointer` based on a delimiter. 

- `playSound()` 

  play the current audio sound, unless one is already playing, then pause it.
  and play the new sound. 

- `getScore(response)` 

  Get the score based on a user's response. 

- `getFeedback(response)` 

  Get the feedback based on a user's response. 

- `getSummary(response)` 

  get the widget's new summary based on a user's response.
  in this case its a running average. 

- `vote(val)` 

  emit an annotation to the parent. 

- `getPropertiesSchema()` 

  This method should tell users how their widgetProperties configuration should be defined. 

- `swipeLeft()` 

  Set the swipe-left animation and vote 0 

- `swipeRight()` 

  set the swipe-right animation and vote 1 

- `onSwipe(evt)` 

  set the swipe direction based on the mouse/touch event. 

- `setSwipe(sw)` 

  save the swipe direction variable. 

- `test()` 

  Test all the lines of this widget. 

