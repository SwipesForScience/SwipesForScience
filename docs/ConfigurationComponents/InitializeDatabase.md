# initializer 

An interface that initializes an empty firebase realtime database
with a default schema, assuming that the firebase rules are in test mode
e.g (`{".read": true, ".write": true}`) 

## props 

- `config` ***Object*** (*required*) 

  The config object that is loaded from src/config.js.
  It defines how the app is configured, including
  any content that needs to be displayed (app title, images, etc)
  and also the type of widget and where to update pointers to data 

- `db` ***Object*** (*required*) 

  the intialized firebase database 

- `user-info` ***Object*** (*required*) 

  the authenticated user object from firebase 

## data 

- `admin` 

  whether or not the /settings/admins/<username> is initialized on firebase 

**initial value:** `false` 

- `sampleCounts` 

  whether or not the /sampleCounts is initialized on firebase 

**initial value:** `false` 

- `sampleSummary` 

  whether or not the /sampleSummary is initialized on firebase 

**initial value:** `false` 

- `chats` 

  whether or not the /chats is initialized on firebase 

**initial value:** `false` 

- `userSeenSamples` 

  whether or not the /userSeenSamples is initialized on firebase 

**initial value:** `false` 

- `userSettings` 

  whether or not the /userSettings is initialized on firebase 

**initial value:** `false` 

- `votes` 

  whether or not the /votes is initialized on firebase 

**initial value:** `false` 

## computed properties 

- `uid` 

  the logged in user's UID 

   **dependencies:** `userInfo` 

- `ready` 

  returns whether or not everything is inialized correctly. 

   **dependencies:** `admin`, `sampleCounts`, `sampleSummary`, `chats`, `userSeenSamples`, `votes`, `userSettings` 


## events 

- `next` 

## methods 

- `initAdmin()` 

  initialize the admin schema 

- `initSampleCounts()` 

  initialize /sampleCounts 

- `initSampleSummary()` 

  initialize /sampleSummary 

- `initChats()` 

  initialize /chats 

- `initUserSeenSamples()` 

  initialize /userSeenSamples 

- `initVotes()` 

  initialize /votes 

- `initUserSettings()` 

  initialize userSettings 

- `initAll()` 

  initialize all 

- `next()` 

  emit an event called "next" to the parent component. 

