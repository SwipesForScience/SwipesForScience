# chats 

## props 

- `config` ***Object*** (*required*) 

  The config object that is loaded from src/config.js.
  It defines how the app is configured, including
  any content that needs to be displayed (app title, images, etc)
  and also the type of widget and where to update pointers to data 

- `db` ***Object*** (*required*) 

  the intialized firebase database 

## data 

- `chatInfo` 

**initial value:** `[object Object]` 

- `noData` 

**initial value:** `false` 

## computed properties 

- `orderedPosts` 

   **dependencies:** `sampleChat` 

- `blankChatImage` 

   **dependencies:** `config` 


