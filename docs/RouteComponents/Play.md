# play 

TODO: fill this in. 

## props 

- `user-info` ***Object*** (*required*) 

  the authenticated user object from firebase 

- `user-data` ***Object*** (*required*) 

  the computed user data object based on userInfo 

- `levels` ***Object*** (*required*) 

  the various levels, the points need to reach the levels,
  and the badges (colored and greyed out) to display 

- `current-level` ***Object*** (*required*) 

  the user's current level 

- `config` ***Object*** (*required*) 

  The config object that is loaded from src/config.js.
  It defines how the app is configured, including
  any content that needs to be displayed (app title, images, etc)
  and also the type of widget and where to update pointers to data 

- `db` ***Object*** (*required*) 

  the intialized firebase database 

## data 

- `startTime` 

  keep track of the time a user took to vote on a sample 

**initial value:** `null` 

- `dismissSecs` 

  flags for the small toast that shows feedback 

**initial value:** `1` 

- `dismissCountDown` 

  flags for the small toast that shows feedback 

**initial value:** `0` 

- `feedback` 

  feedback will be filled by the widget component
  for now its initialized here 

**initial value:** `[object Object]` 

- `status` 

  status flag that is set to "complete" when the firebase keys are filled. 

**initial value:** `'loading'` 

- `sampleCounts` 

  these keys will be filled by firebase when the component is mounted 

**initial value:** `[object Object]` 

- `userSeenSamples` 

**initial value:** `[object Object]` 

- `noData` 

  if sampleCounts is empty after its fetched from the db, then noData
  flag is set to true. TODO: prompt the user to the setup instructions 

**initial value:** `false` 

- `widgetPointer` 

  widgetPointer is a pointer to the keys in sampleCounts, sampleSummary, and sampleChats 

**initial value:** `null` 

- `widgetSummary` 

  widget summary comes from firebase when the widget Pointer is set. 

**initial value:** `[object Object]` 

## computed properties 

- `samplePriority` 

  TODO: fill this in. 

   **dependencies:** `sampleCounts` 

- `blankImage` 

  if there is nothing in the database, display a blank image 

   **dependencies:** `config` 

- `widgetType` 

  type of widget, named exactly how it is in the Widgets folder 

   **dependencies:** `config` 

- `widgetProperties` 

  specific properties for a widget 

   **dependencies:** `config` 


## methods 

- `initSampleCounts()` 

  TODO: fill this in. 

- `initSeenSamples()` 

  TODO: fill this in. 

- `shuffle(array)` 

  TODO: fill this in. 

- `sampleUserPriority()` 

  TODO: fill this in. 

- `sendWidgetResponse(response)` 

  TODO: fill this in. 

- `setNextSampleId()` 

  TODO: fill this in. 

- `sendVote(response, time)` 

  TODO: fill this in. 

- `updateScore(scoreIncrement)` 

  TODO: fill this in. 

- `updateSummary(summary)` 

  TODO: fill this in. 

- `updateCount()` 

  TODO: fill this in. 

- `updateSeen()` 

  TODO: fill this in. 

- `countDownChanged(dismissCountDown)` 

  TODO: fill this in. 

- `showAlert()` 

  TODO: fill this in. 

