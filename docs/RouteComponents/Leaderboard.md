# leaderboard 

The leaderboard component for the route `/leaderboard`. It displays the
rank, badge, player username, and score. You can sort based on the score. 

## props 

- `levels` ***Object*** (*required*) 

  the various levels, the points need to reach the levels,
  and the badges (colored and greyed out) to display 

- `all-users` ***Object*** (*required*) 

  This is an object that looks like:
  ```
  {
  username: {
  level:
  score:
  taken_tutorial:
  consent:
  admin:
  }
  }
  ```
  it comes directly from the `/users` document in Firebase. 

## data 

- `sortBy` 

  Tell the table component to sort by the score. 

**initial value:** `'score'` 

- `sortDesc` 

  Tell the table component to sort descending. 

**initial value:** `true` 

- `fields` 

  The fields specification for the table component. Tell the table
  how to display the column names, and whether or not the column can be
  sorted. 

**initial value:** `[object Object]` 

## computed properties 

- `allUsersList` 

  Convert the allUsers prop to a list from an Object. 

   **dependencies:** `allUsers` 


