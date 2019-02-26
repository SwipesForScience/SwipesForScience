# widget 

This is the UI to set up a widget during configuration. 

## props 

- `config` ***Object*** (*required*) 

  The config object that is loaded from src/config.js.
  It defines how the app is configured, including
  any content that needs to be displayed (app title, images, etc)
  and also the type of widget and where to update pointers to data 

## data 

- `widgetOptions` 

  The options that are allowed for widgetType. 

**initial value:** `[object Object]` 

## computed properties 

- `widgetSchema` 

  get the config widget's schema. 

   **dependencies:** `getWidgetSchema`, `config` 


## methods 

- `getWidgetSchema(widgetType)` 

