# image-splat 

This widget is to annotate the X, Y coordinate of an image. It is still
a **work in progress** and not ready to be used yet. 

## props 

- `widget-pointer` ***String*** (*required*) 

  The sample ID to tell the widget to display. 

- `widget-properties` ***Object*** (*required*) 

  The widget-specific properties. The schema is widget specific. 

- `widget-summary` ***Object*** (*optional*) 

  The summary data for the widget.
  This one keeps track of the number of users who annotated points,
  and the number of points they annotated 

- `user-settings` ***Object*** (*required*) 

  The user's settings on the widget. The schema is widget specific. 

- `play-mode` ***String*** (*optional*) 

  Tells the widget if it should be in a "play mode" or maybe a "review mode". 

- `tutorial-step` ***Number*** (*optional*) 

  Tells the widget to display a tutorial step.
  **TODO**: this part is not implemented yet. 

## data 

- `overlayStyle` 

  how to display an overlay image. 

**initial value:** `[object Object]` 

- `visible` 

  whether the mask and contour image should be visible 

**initial value:** `[object Object]` 

- `brightness` 

  base image brightness, 0-100 

**initial value:** `50` 

- `contrast` 

  base image contrast, 0-100 

**initial value:** `50` 

- `brightnessOptions` 

  sliderbar options for both the brightness and contrast UI. 

**initial value:** `[object Object]` 

## computed properties 

- `maskUrl` 

  Compute the maskURL based on baseUrlTemplate and delimiter of the widgetProperties,
  and the widgetPointer. For example a widgetPointer="contrast1__image1" could be
  mapped to https://base_url/contrast1/image1.jpg if
  baseUrlTemplate = 'https://base_url/{0}/{1}.jpg' and delimiter === '__'. 

   **dependencies:** `widgetProperties`, `widgetPointer`, `fillPropertyPattern`, `widgetProperties`, `widgetProperties` 

- `baseUrl` 

  Compute the baseURL based on baseUrlTemplate and delimiter of the widgetProperties,
  and the widgetPointer. For example a widgetPointer="contrast1__image1" could be
  mapped to https://base_url/contrast1/image1.jpg if
  baseUrlTemplate = 'https://base_url/{0}/{1}.jpg' and delimiter === '__'. 

   **dependencies:** `widgetProperties`, `widgetPointer`, `fillPropertyPattern`, `widgetProperties`, `widgetProperties` 

- `contourUrl` 

  Compute the contourURL based on baseUrlTemplate and delimiter of the widgetProperties,
  and the widgetPointer. For example a widgetPointer="contrast1__image1" could be
  mapped to https://base_url/contrast1/image1.jpg if
  baseUrlTemplate = 'https://base_url/{0}/{1}.jpg' and delimiter === '__'. 

   **dependencies:** `widgetProperties`, `widgetPointer`, `fillPropertyPattern`, `widgetProperties`, `widgetProperties` 


## events 

- `updateUserSettings` 

- `widgetRating` 

## methods 

- `setUserSettings()` 

- `undo()` 

  undo the last annotation 

- `fillPropertyPattern(pattern, delimiter)` 

  Fill a pattern by `this.widgetPointer` based on a delimiter. 

- `getScore(response)` 

  get the score based on the user's response 

- `getFeedback(response)` 

  get feedback to show user based on the user's response 

- `getSummary(response)` 

  get the new widget's summary based on the user's response.
  here we keep track of the x,y coordatinates annotated 

- `getSplatPoints()` 

  get a list of the annotated coordinates in the form [{x:, y:}] 

- `vote()` 

  emit to the parent component the user's response. 

- `getPropertiesSchema()` 

  This method should tell users how their widgetProperties configuration should be defined. 

- `test()` 

  Test all the lines of this widget. 

