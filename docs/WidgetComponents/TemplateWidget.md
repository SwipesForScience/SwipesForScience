# template-widget 

This is a dummy widget template, for widget developers to use as a base to start
developing a new annotation widget. 

## props 

- `widget-pointer` ***String*** (*required*) 

  a sample ID to display 

- `widget-properties` ***Object*** (*required*) 

  properties of the widget, that are widget specific. the schema is up to you. 

- `widget-summary` ***Object*** (*optional*) 

  annotaion summary for the widget, the schema is up to you. 

- `user-settings` ***Object*** (*required*) 

  The user's settings on the widget. The schema is widget specific. 

- `play-mode` ***String*** (*optional*) 

  variable to note wheter the widget should be in "play mode"
  or "review mode" or "tutorial mode" 

- `tutorial-step` ***Number*** (*optional*) 

  variable to save the current tutorial step. Not used here. 

## events 

- `widgetRating` 

## methods 

- `getScore(response)` 

  all widgets should have a getScore method, based on the user's response 

- `getFeedback(response)` 

  all widgets should have a getFeedback method, based on the user's response.
  this is what the user will see once they respond. 

- `getSummary(response)` 

  all widgets should have a get summary method, that updates the sample's
  annotation summary based on the user's response. This can help you keep track
  or summarize the annotations so far, and help you score a user's response based on
  this summary. For example, if the summary keep track of a running average vote, then
  you can use this method to score the user
  (e.g if they don't agree with the running average). 

- `vote(val)` 

  all widgets should have a vote method, that emits a response to the parent component. 

- `getPropertiesSchema()` 

  This method should tell users how their widgetProperties configuration should be defined. 

- `test()` 

  Test all the lines of this widget. 

