# chats 

This is the component for the /chats route. It shows all the chat messages
for each sample. 

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

  A flag to tell us if the /chats doc is empty on firebase. 

**initial value:** `false` 

## computed properties 

- `orderedPosts` 

  Reverses the order of the chats. 

   **dependencies:** `sampleChat` 

- `blankChatImage` 

  A blank image from the config file. If this.noData is true, this image is rendered. 

   **dependencies:** `config` 


