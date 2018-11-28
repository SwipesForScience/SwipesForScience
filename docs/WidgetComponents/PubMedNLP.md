# pub-med-n-l-p 

This widget is still a **work in progress**, but is based off the
https://appstract.pub prototype to annotate sample size from text.
Right now, this is just a pass/fail annotation that displays the pubmed
abstract based on a pubmed ID 

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

- `xmlString` 

**initial value:** `''` 

- `status` 

**initial value:** `'loading'` 

## computed properties 

- `xml` 

  the parsed XML from pubmed 

   **dependencies:** `xmlString` 

- `abstract` 

  the pubmed abstract, extracted from the xml 

   **dependencies:** `xml`, `xml` 

- `title` 

  the pubmed title, extracted from the xml 

   **dependencies:** `xml`, `xml` 

- `authors` 

  the pubmed author, extracted from the xml 

   **dependencies:** `xml`, `xml` 

- `year` 

  the publication year, extracted from the XML 

   **dependencies:** `xml`, `xml`, `xml` 


## events 

- `widgetRating` 

## methods 

- `getPubmedData()` 

  fetch the data from pubmed 

- `getScore(response)` 

  get the score based on the user's response 

- `getFeedback(response)` 

  get feedback based on the user's response. **work in progress** 

- `getSummary(response)` 

  get the new summary based on the user's response. This is a running average. 

- `vote(val)` 

  tell the parent component the user's annotation, so it can be saved. 

- `getPropertiesSchema()` 

  This method should tell users how their widgetProperties configuration should be defined. 

- `test()` 

  Test all the lines of this widget. 

