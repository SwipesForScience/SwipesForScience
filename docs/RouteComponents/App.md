# app 

explicit installation required in module environments 

## data 

- `userInfo` 

**initial value:** `[object Object]` 

- `db` 

**initial value:** `[object Object]` 

- `config` 

**initial value:** `'config'` 

- `showConfig` 

**initial value:** `false` 

- `allUsers` 

**initial value:** `[object Object]` 

- `levels` 

**initial value:** `[object Object]` 

## computed properties 

- `firebaseKeys` 

   **dependencies:** `config` 

- `brandName` 

   **dependencies:** `config` 

- `betaMode` 

   **dependencies:** `config` 

- `needsTutorial` 

   **dependencies:** `config` 

- `navbarVariant` 

   **dependencies:** `config`, `config` 

- `userData` 

   **dependencies:** `userInfo`, `allUsers`, `userInfo` 

- `currentLevel` 

   **dependencies:** `levels`, `userData`, `userData` 


## methods 

- `logout()` 

  log out of firebase 

- `setUser(user)` 

  set the userInfo attribute 

- `setTutorial(val)` 

  set the tutorial status of the current user 

- `openConfig(e)` 

  open the config panel 

- `closeConfig()` 

  close the config panel 

