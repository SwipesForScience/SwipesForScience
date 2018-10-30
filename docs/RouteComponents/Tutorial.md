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

**initial value:** `0` 

- `widgetSummary` 

**initial value:** `[object Object]` 

## computed properties 

- `widgetType` 

  TODO: fill this in. 

   **dependencies:** `config` 

- `widgetProperties` 

  TODO: fill this in. 

   **dependencies:** `config` 

- `steps` 

  TODO: fill this in. 

   **dependencies:** `config` 

- `backgroundAnimation` 

  TODO: fill this in. 

   **dependencies:** `config` 

- `bins` 

  TODO: fill this in. 

   **dependencies:** `steps`, `steps` 

- `currentBin` 

  TODO: fill this in. 

   **dependencies:** `bins`, `scrollPosition`, `scrollPosition` 

- `currentStage` 

  TODO: fill this in. 

   **dependencies:** `currentBin`, `steps`, `steps`, `currentBin`, `steps`, `currentBin`, `steps` 

- `nextStep` 

  TODO: fill this in. 

   **dependencies:** `currentBin`, `steps`, `currentBin`, `currentBin`, `steps` 


## events 

- `taken_tutorial` 

## methods 

- `tutorialComplete()` 

  TODO: fill this in. 

- `handleScroll()` 

  TODO: fill this in. 

