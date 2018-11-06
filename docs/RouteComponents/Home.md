# home 

The landing page, on the route `/`. This component displays a title, tagline,
and background image splash page that's defined on the config property. 

## props 

- `config` ***Object*** (*required*) 

  The config object that is loaded from src/config.js.
  It defines how the app is configured, including
  any content that needs to be displayed (app title, images, etc)
  and also the type of widget and where to update pointers to data 

## computed properties 

- `title` 

  The title to display. Defined in `config.home.title` 

   **dependencies:** `config` 

- `tagline` 

  The tagline to display. Defined in `config.home.tagline` 

   **dependencies:** `config` 

- `landingStyle` 

  The background image to display. Defined in `config.home.backgroundUrl` 

   **dependencies:** `config` 


