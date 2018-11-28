# review 

The review component shows the widget for a pointer to a sample in its route,
and lets the user discuss the sample in a chat-room type UI. 

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

  This sample ID to discuss. 

**initial value:** `''` 

- `widgetSummary` 

  The summary of the sample ID 

**initial value:** `[object Object]` 

- `userSettings` 

  The user's settings from firebase 

**initial value:** `[object Object]` 

- `chatMessage` 

  The chat message that the user types. 

**initial value:** `''` 

- `chatHistory` 

  This list of previous chat messages. 

**initial value:** `[object Object]` 

## computed properties 

- `chatOrder` 

  Reverse the order of the chats so that the latest is at the top. 

   **dependencies:** `chatHistory` 

- `widgetType` 

  The widgetType to display, based on the config value. 

   **dependencies:** `config` 

- `widgetProperties` 

  The properties of the widget, from the config. 

   **dependencies:** `config` 


## methods 

- `sendChat(e)` 

  Method to add a new chat message. Update
  1. push the username, message and timestamp to `chats/sampleChats`
  2. set the most recent chat time for this sample to `chats/sampleChatIndex`
  3. set that the user has sent a chat for this sample to `chats/userChat/<username>`
  4. **TODO**: set that other users following this chat have something new to see. 

- `unravelFirebaseListObject(inputObject)` 

  Take a firebase input object and make it a nice list. 

- `setSampleInfo()` 

  Get the chat history for the current sample ID. 

