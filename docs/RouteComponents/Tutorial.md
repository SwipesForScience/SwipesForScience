# tutorial 

You can also pass in the default options 

## props 

- `levels` ***Object*** (*required*) 

  the various levels, the points need to reach the levels,
  and the badges (colored and greyed out) to display 

- `config` ***Object*** (*required*) 

  The config object that is loaded from src/config.js.
  It defines how the app is configured, including
  any content that needs to be displayed (app title, images, etc)
  and also the type of widget and where to update pointers to data 

## data 

- `scrollPosition` 

  The current scroll position 

**initial value:** `0` 

- `widgetSummary` 

  The sample IDs summary (not implemented yet) 

**initial value:** `[object Object]` 

- `userSettings` 

  User settings from firebase (not implemented yet) 

**initial value:** `[object Object]` 

## computed properties 

- `widgetType` 

  The widget type defined in config. 

   **dependencies:** `config` 

- `widgetProperties` 

  The widget properties defined in config. 

   **dependencies:** `config` 

- `steps` 

  The steps defined in config, with text and images to display. 

   **dependencies:** `config` 

- `backgroundAnimation` 

  The type of background animation to show. 

   **dependencies:** `config` 

- `bins` 

  The cutoffs of scrolling,
  to help map scroll position to the step of the tutorial 

   **dependencies:** `steps`, `steps` 

- `currentBin` 

  The current bin based on scroll position. 

   **dependencies:** `bins`, `scrollPosition`, `scrollPosition` 

- `currentStage` 

  The current stage, either the intro text stage,
  or the part that shows how the widget works. 

   **dependencies:** `currentBin`, `steps`, `steps`, `currentBin`, `steps`, `currentBin`, `steps` 

- `nextStep` 

  The next step that should be displayed. 

   **dependencies:** `currentBin`, `steps`, `currentBin`, `currentBin`, `steps` 


## events 

- `taken_tutorial` 

## methods 

- `tutorialComplete()` 

  When this method is run, we tell the parent component that the
  user has completed the tutorial. 

- `handleScroll()` 

  Keep track of the scroll position and save it to the scrollPosition variable. 

