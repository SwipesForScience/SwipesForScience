# braindr

> a firebase app for braindr: Tinder for brains

## Firebase setup

1. Create a firebase account
2. Click on "Web Setup" and copy paste your config into `src/firebaseConfig.js`
3. Go to the Authentication and click "Sign-In method" and enable Email/Password
4. Go to the Database tab and click "Rules" and copy paste the following:

```
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null",
    "users": {
      ".read": true,
      ".write": "auth != null",
    },
    "settings": {
      ".read": true,
      ".write": false,
    }
  }
}
```

5. run the app: `npm run dev` and open `localhost:8080`. Create a new account
6. Go to the Database tab in Firebase. Create key value pairs like this:

```
settings: {
  admins: {
    your_username: true,
  },
}

users: {
  your_username: {
    admin: true
  }
}

imageCount: 1
```
7. Click on imageCount. Import a JSON file w/ pointers to your images into here:
```
{
  imageFilename1: {
    ave_score: 0,
    num_votes: 0
  },
  ...
}
```
If you don't have this file, upload the `abide_images.json` file in this folder.

Your database should now look like:

![](braindr-databaseSetup.png)

8. Also host your images somewhere else (like S3), it will be cheaper to pull images from there instead of firebase. The images will be found at: `https://yourS3bucket/imageFilename1.jpg`
9. Edit the `imageBaseUrl` in `src/components/Play.vue` to point to your images. The url will have the image name appended to the end with the `.jpg` extension
10. go to `localhost:8080/images` to see all the images. Start rating them here, making sure to mark a few passes and fails (this is for the tutorial)
10. Start playing to test that it works

11. To deploy. make a firebase directory here:

```
mkdir firebase
cd firebase
firebase init
```

select all the options here *except firestore*. Then choose your project, and say yes to everything else. Then do:

```
cd ..
npm run build
cd firebase
cp -r ../dist/* public/
```

The `npm` step builds all your files into a single html file and a set of js files. Then we move them to the firebase `public` folder and then deploy:

```
firebase deploy
```

These instructions will probably change soon. The app is still being actively developed!

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
