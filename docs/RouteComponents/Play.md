# play 

This is the component for the `/play` route. It's view depends on the
config property passed from the parent (`App.vue`). It displays the widget
based on config.widgetType. It also decides which sample will be presented
(`widgetPointer`) and passes the sample's summary (`widgetSummary`) to its
widget component (`WidgetSelector`).

This component is responsible for the following:
1. Deciding which sample to present by choosing an item in `/sampleCounts`
that has been seen the least number of times, but also making sure the user
hasn't seen that sample yet (by reading from `/userSeenSamples/<username>`).
2. sending the user's response from the widget. This includes:
1. getting feedback from the widget and displaying it.
2. saving the response and the time it took to make the response
(pushes to `/votes` in firebase)
3. Updating the user's score
4. Updating that sample's count
5. Updating that the user has seen the sample
6. Updating that sample's summary
7. And then loading the next sample to view. 

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

- `userSettings` 

  user settings comes from firebase. it can be set by the widget to save state for the user. 

**initial value:** `[object Object]` 

## computed properties 

- `samplePriority` 

  sort the sampleCounts from firebase by their value, where the lowest count is first. 

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

- `initUserSettings()` 

  the /userSettings/<username> from firebase is always in sync.
  this property saves the state of the widget, if it needs it. 

- `updateUserSettings(settings)` 

  update the /userSettings/<username> in firebase.
  this method is called when the widget emits the "udpateUserSettings" event. 

- `initSampleCounts()` 

  Ask Firebase for the sampleCounts document,
  but don't watch it in real time, just fetch the data once. 

- `initSeenSamples()` 

  Initialize the samples that the user has seen, by fetching the
  `/userSeenSamples/<username>` document from firebase, once. 

- `shuffle(array)` 

  A method to shuffle an array. 

- `sampleUserPriority()` 

  A method that returns an array of samples prioritized by
  the least seen overall and by the user 

- `sendWidgetResponse(response)` 

  this method is called from the child widget
  it will first get feedback from the child on the response
  next, it will send the user response to the db
  then it will update the user's score and the sample's view count
  last, it will set the next sample. 

- `setNextSampleId()` 

  method to get the next sample id to show in the widget
  view time gets reset first, then the new sample is found and set. 

- `sendVote(response, time)` 

  the user's response for the sample is sent to the db
  along with their user displayName and the time they took to respond. 

- `updateScore(scoreIncrement)` 

  this method update's the user's score by scoreIncrement; 

- `updateSummary(summary)` 

  Update the summary of a given widgetPointer 

- `updateCount()` 

  Update the sampleCount of the current widgetPointer. 

- `updateSeen()` 

  Update that the user has seen this sample, incrementing by 1. 

- `countDownChanged(dismissCountDown)` 

  This is for the toast component that shows feedback, to keep track of time. 

- `showAlert()` 

  This is to show the toast alert component, for widget feedback. 

