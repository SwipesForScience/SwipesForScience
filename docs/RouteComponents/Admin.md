# admin 

Admin panel for the /admin route.
The admin panel syncs data from `config.manifestUrl`. Only people
that are authorized can see this page. Authorization comes from
/user/<username>/admin and from /settings/admins/<username>. Both need to be
true to see this page. 

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

  The loading status 

**initial value:** `'loading...'` 

- `progress` 

  Progress bar for the entries being synced to firebase 

**initial value:** `0` 

- `manifestEntries` 

  The list of items to put into /sampleCounts 

**initial value:** `[object Object]` 

- `sampleCounts` 

  the /sampleCounts document from Firebase. 

**initial value:** `[object Object]` 

## methods 

- `addFirebaseListener()` 

  This method keeps track of sampleCounts, but only loads it once. 

- `previewManifest()` 

  A method that fetches the manifest so the user can see what's in it.
  TODO: add a .catch event and display an error if something goes wrong
  with this request. 

- `refreshSamples()` 

  this method runs in a worker, to check each item in /sampleCounts and each
  item in manifestUrl. If the item is in manifestUrl but not in /sampleCounts,
  it is added. If its not in manifestUrl but is in sampleCounts, its removed. 

