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

**initial value:** `false` 

- `sampleCounts` 

**initial value:** `false` 

- `sampleSummary` 

**initial value:** `false` 

- `chats` 

**initial value:** `false` 

- `userSeenSamples` 

**initial value:** `false` 

- `votes` 

**initial value:** `false` 

## computed properties 

- `uid` 

   **dependencies:** `userInfo` 

- `ready` 

   **dependencies:** `admin`, `sampleCounts`, `sampleSummary`, `chats`, `userSeenSamples`, `votes` 


## events 

- `next` 

## methods 

- `initAdmin()` 

- `initSampleCounts()` 

- `initSampleSummary()` 

- `initChats()` 

- `initUserSeenSamples()` 

- `initVotes()` 

- `initAll()` 

- `next()` 

  emit an event called "next" to the parent component. 

