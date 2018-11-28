# widget-selector 

This a "switch" component, it displays whatever widget is
passed from the parent prop. It is also a proxy for any events emited from
the specific widget to the parent. 

## props 

- `widget-type` ***String*** (*required*) 

  WidgetType is a string. It can be "ImageSwipe" for example. 

- `widget-pointer` ***String*** (*required*) 

  The sample ID to tell the widget to display. 

- `widget-properties` ***Object*** (*required*) 

  The widget-specific properties. The schema is widget specific. 

- `user-settings` ***Object*** (*required*) 

  The user's settings on the widget. The schema is widget specific. 

- `widget-summary` ***Object*** (*optional*) 

  The summary data for the widget.
  This could keep track of the running average, for example. 

- `play-mode` ***String*** (*optional*) 

  Tells the widget if it should be in a "play mode" or maybe a "review mode". 

- `tutorial-step` ***Number*** (*optional*) 

  Tells the widget to display a tutorial step.
  Could be like highlighting a certain button. 

## events 

- `widgetRating` 

- `updateUserSettings` 

## methods 

- `getFeedback(response)` 

  proxy the widget's getFeedback method. 

- `getScore(response)` 

  proxy the widget's getScore method. 

- `getSummary(response)` 

  proxy the widget's getSummary method. 

- `widgetRating(response)` 

  emit the widget's response to the parent. 

- `updateUserSettings(settings)` 

  emit the widget's user settings to the parent 

