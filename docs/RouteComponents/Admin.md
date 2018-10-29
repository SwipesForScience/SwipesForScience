# admin 

eslint-disable-next-line 

## props 

- `levels` ***Object*** (*required*) 

  the various levels, the points need to reach the levels,
  and the badges (colored and greyed out) to display 

- `config` ***Object*** (*required*) 

  The config object that is loaded from src/config.js.
  It defines how the app is configured, including
  any content that needs to be displayed (app title, images, etc)
  and also the type of widget and where to update pointers to data 

- `db` ***Object*** (*required*) 

  the intialized firebase database 

## data 

- `status` 

**initial value:** `'loading...'` 

- `progress` 

**initial value:** `0` 

- `manifestEntries` 

**initial value:** `[object Object]` 

- `sampleCounts` 

**initial value:** `[object Object]` 

## methods 

- `addFirebaseListener()` 

- `previewManifest()` 

  A method that fetches the manifest so the user can see what's in it. 

- `refreshSamples()` 

