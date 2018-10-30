# configuration 

Function to download a text file from
https://stackoverflow.com/questions/3665115/create-a-file-in-memory-for-user-to-download-not-through-server 

## props 

- `config` ***Object*** (*required*) 

  The config object that is loaded from src/config.js.
  It defines how the app is configured, including
  any content that needs to be displayed (app title, images, etc)
  and also the type of widget and where to update pointers to data 

- `user-info` ***Object*** (*required*) 

  the authenticated user object from firebase 

- `db` ***Object*** (*required*) 

  the intialized firebase database 

- `configuration-state` ***Object*** (*required*) 

  the intialized firebase database 

## data 

- `fkeys` 

**initial value:** `null` 

- `width` 

**initial value:** `300` 

- `resizing` 

**initial value:** `false` 

- `configURL` 

  placeholder for the user's uploaded config file. 

**initial value:** `''` 

## computed properties 

- `styleContent` 

   **dependencies:** `width` 

- `styleResize` 

   **dependencies:** `width` 

- `step` 

   **dependencies:** `configurationState` 

- `rules` 

   **dependencies:** `userInfo`, `userInfo` 


## events 

- `closeConfig` 

## methods 

- `update()` 

- `startResize()` 

- `resize(e)` 

- `endResize()` 

- `close()` 

- `setNewFirebaseKeys(fkeys)` 

  Set the firebase keys in the config
  this launches a watcher on the parent that reinitializes
  a new firebase database.
  Also we set the step counter to 1. 

- `next()` 

  increment this.step by 1 

- `prev()` 

  decrement this.step by 1 

- `downloadConfig()` 

