# login 

The login component for the `/login` route. 

## data 

- `form` 

  Elements for the form, with an email and password field. 

**initial value:** `[object Object]` 

- `errors` 

  Variable to store errors and their messages. 

**initial value:** `[object Object]` 

## events 

- `login` 

  console.log('user', user); 

## methods 

- `onSubmit(e)` 

  When the user hits submit, we log in with firebase.
  If its succesful, route the user to the `/play` route.
  If there is an error, show the message. 

