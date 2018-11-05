# signup 

The component for the `/signup` route. 

## props 

- `config` ***Object*** (*required*) 

  The config object that is loaded from src/config.js.
  It defines how the app is configured, including
  any content that needs to be displayed (app title, images, etc)
  and also the type of widget and where to update pointers to data 

## data 

- `form` 

  This object holds the variables that the user inputs to the sign up form. 

**initial value:** `[object Object]` 

- `show` 

  **TODO**: I'm not sure this is used anywhere. Check this. 

**initial value:** `true` 

- `errors` 

  A variable to keep track of errors, whether to show it and the error message. 

**initial value:** `[object Object]` 

## computed properties 

- `validated` 

  The form is validated if the user types the same password twice. 

   **dependencies:** `form`, `form` 

- `consentFormLabel` 

  Return a message based on whether or not the user has consented. 

   **dependencies:** `form` 


## methods 

- `onSubmit(e)` 

  Register a new user to firebase.
  Make sure the username isn't already taken. 

- `saveConsent(e)` 

  Save that the user has consented. 

- `openConsentModal()` 

  Open the consent form modal. 

- `createAccount()` 

  A method that creates the firebase account and shows an error if there is one. 

- `insertUser(user)` 

  A method to insert a new user into the `/users` document of firebase.
  This initializes the user's score, level, whether or not they've consented.
  and when they consented.
  **TODO**: set an error message if something goes wrong here. 

- `updateProfile(user)` 

  Update the user's profile with their username
  (in the displayName field of an authenticated user.) 

