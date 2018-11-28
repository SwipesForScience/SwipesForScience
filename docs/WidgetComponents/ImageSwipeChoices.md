# image-swipe-choices 

## props 

- `widget-pointer` ***String*** (*required*) 

  the sample ID to display. In this case it should be a pubmed id. 

- `widget-properties` ***Object*** (*required*) 

  the properties of the widget, that are widget specific. 

- `widget-summary` ***Object*** (*optional*) 

  the summary data of the widget. 

- `user-settings` ***Object*** (*required*) 

  The user's settings on the widget. The schema is widget specific. 

- `play-mode` ***String*** (*optional*) 

  whether the widget should render in play mode, or review mode, or tutorial mode. 

- `tutorial-step` ***Number*** (*optional*) 

  this is not implemented yet, but will be used to keep track of and show off
  the annotation features of this widget. 

## data 

- `status` 

**initial value:** `'loading'` 

- `swipe` 

**initial value:** `null` 

## computed properties 

- `baseUrl` 

   **dependencies:** `widgetProperties`, `widgetPointer`, `fillPropertyPattern`, `widgetProperties`, `widgetProperties` 


## events 

- `widgetRating` 

## methods 

- `showTutorialStep(stepNumber)` 

- `fillPropertyPattern(pattern, delimiter)` 

- `getScore(response)` 

- `getFeedback(response)` 

- `getSummary(response)` 

- `vote(val)` 

- `getPropertiesSchema()` 

  This method should tell users how their widgetProperties configuration should be defined. 

- `test()` 

  Test all the lines of this widget. 

