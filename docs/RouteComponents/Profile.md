# profile 

The profile component that's shown on the /profile route.
It displays the number of points a user has earned
It shows the badges they've earned and greys out the ones they still need to earn
It shows a chats section, which are the discussions this user has participated in
if the user hasn't said anything, then it shows a blank image,
defined in config.profile.blankImage 

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

- `chats` 

  chats is filled with pointers to samples that the user has discussed
  from the firebase database. It is a list. 

**initial value:** `[object Object]` 

- `chatInfo` 

  chatInfo is filled from the firebase database. For each item in chats,
  get the most recent discussion point from that chat and store it here. 

**initial value:** `[object Object]` 

## computed properties 

- `blankImage` 

  an image to display if the user hasn't said anything. from config.profile.blankImage 

   **dependencies:** `config` 


## methods 

- `getUserChats()` 

  A method to read the firebase db ref /chats/<user_display_name> 

- `getNotifications(key)` 

  In theory this method should set a flag to tell the UI
  to highlight any chats that have been updated since that last time the user
  saw their chats. I don't think this method is even called yet. 

