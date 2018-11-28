# app 

This is the main entrypoint to the app. 

## data 

- `userInfo` 

  This is from firebase 

**initial value:** `[object Object]` 

- `db` 

  This is the firebase database object. 

**initial value:** `[object Object]` 

- `config` 

  This is the config object, it defines the look of the app 

**initial value:** `'config'` 

- `showConfig` 

  Whether or not to show the configuration panel 

**initial value:** `false` 

- `allUsers` 

  All the users in the /users document 

**initial value:** `[object Object]` 

- `configurationState` 

  The configuration state, keeping track of the step number only. 

**initial value:** `[object Object]` 

## computed properties 

- `firebaseKeys` 

  the firebase keys from the config file 

   **dependencies:** `config` 

- `brandName` 

  the brandname from the config file (home.title) 

   **dependencies:** `config` 

- `betaMode` 

  whether or not to show the "beta" ribbon, defined in the config. 

   **dependencies:** `config` 

- `needsTutorial` 

  whether or not the user is forced to take the tutorial. 

   **dependencies:** `config` 

- `navbarVariant` 

  color of the navbar, based on bootstrap4 color variants. 

   **dependencies:** `config`, `config` 

- `userData` 

  the current user's data, based on the userInfo from the firebase.auth.
  this matches the info in allUsers (/users) to the firebase.auth user info. 

   **dependencies:** `userInfo`, `userInfo`, `allUsers`, `userInfo` 

- `levels` 

  The levels are defined based on score bins. Each level also defines
  a character image that a user can "unlock" when the annotate enough samples.
  eventually, this should be abstracted out into the config variable. 

   **dependencies:** `config` 

- `currentLevel` 

  the current user's level. 

   **dependencies:** `levels`, `userData`, `userData` 

- `userIsDefined` 

  whether or not a user is authenticated and has a username. 

   **dependencies:** `userInfo`, `userInfo` 


## methods 

- `logout()` 

  log out of firebase 

- `setUser(user)` 

  set the userInfo attribute 

- `setTutorial(val)` 

  set the tutorial status of the current user 

- `openConfig()` 

  open the config panel 

- `closeConfig()` 

  close the config panel 

