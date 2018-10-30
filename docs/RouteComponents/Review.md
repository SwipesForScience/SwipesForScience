# review 

The review component shows the widget for a pointer to a sample in its route,
and lets the user discuss the sample in a chat-room type UI 

- **author** - Anisha Keshavan 
- **license** - Apache 2.0 

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

- `widgetPointer` 

**initial value:** `null` 

- `widgetSummary` 

**initial value:** `null` 

- `chatMessage` 

**initial value:** `''` 

- `chatHistory` 

**initial value:** `[object Object]` 

## computed properties 

- `chatOrder` 

   **dependencies:** `chatHistory` 

- `widgetType` 

   **dependencies:** `config` 

- `widgetProperties` 

   **dependencies:** `config` 


## methods 

- `sendChat(e)` 

- `unravelFirebaseListObject(inputObject)` 

- `setSampleInfo()` 

