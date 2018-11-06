# configuration 

Configuration side panel. This panel lets you modify the main config file,
So you can build your own app. 

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

  set the resizing flag to true, because the user has mousedown'd on the border. 

- `resize(e)` 

  Set this.width to e.clientX 

- `endResize()` 

  Set the resizing flag to false to signal that we stopped resizing. 

- `close()` 

  Tell the parent component that this config panel should be closed. 

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

  Download the completed config file. 

