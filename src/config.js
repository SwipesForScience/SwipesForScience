export default {

    // if set to true, the user will be routed to /tutorial instead of /play if
    // they haven't taken a tutorial
  needsTutorial: false,
    // each time the app is run, it will check this manifest and update the firebase database
    // if new entries are there, they will be added, and entries that aren't in the manifest
    // but are in the firebase database will be *removed*
  manifestUrl: 'https://raw.githubusercontent.com/SwipesForScience/exampleConfig/master/bsHbnManifest.json',
    // 'https://cdn.rawgit.com/SwipesForScience/testConfig/master/bsHbnManifest.json',
    // 'https://cdn.rawgit.com/SwipesForScience/testConfig/master/textWidgetManifest.json',

    // set the type of widget and its properties here.
    // widgetType: 'ImageSplat',
    // widgetProperties: {
    //   baseUrlTemplate: 'https://s3-us-west-2.amazonaws.com/akeshavan-mindcontrol/hbnSplat/{0}/tiles/base_{1}.png',
    //   maskUrlTemplate: 'https://s3-us-west-2.amazonaws.com/akeshavan-mindcontrol/hbnSplat/{0}/tiles/mask_{1}.png',
    //   contourUrlTemplate: 'https://s3-us-west-2.amazonaws.com/akeshavan-mindcontrol/hbnSplat/{0}/tiles/contour_{1}.png',
    //   delimiter: '__',
    // },

  widgetType: 'ImageSwipe',
  widgetProperties: {
    baseUrlTemplate: 'https://s3-us-west-2.amazonaws.com/akeshavan-mindcontrol/hbnSplat/{0}/tiles/base_{1}.png',
    delimiter: '__',
    leftSwipeLabel: 'Fail',
    rightSwipeLabel: 'Pass',
  },


    // this shows a 'beta' ribbon in the bottom right corner
  betaMode: false,

    // this comes from your firebase console
  firebaseKeys: {
    apiKey: 'AIzaSyBLr1HyCf7tXGwnppkfjlIb6I0XSkJgybY',
    authDomain: 'swipesforsciencedev1.firebaseapp.com',
    databaseURL: 'https://swipesforsciencedev1.firebaseio.com',
    projectId: 'swipesforsciencedev1',
    storageBucket: 'swipesforsciencedev1.appspot.com',
    messagingSenderId: '380364880642',
  },

  app: {
    navbarVariant: 'info',
  },

    // Homepage configuration
    // your app's title and tagline
  home: {
    title: 'Swipes for Science',
    tagline: 'A citizen science game template',
      // background image on Homepage
    backgroundUrl: 'https://raw.githubusercontent.com/SwipesForScience/testConfig/master/images/SwipesForScience.svg?sanitize=true',
  },

    // Play configuration
  play: {
    blankImage: 'https://raw.githubusercontent.com/SwipesForScience/testConfig/master/images/undraw_blank_canvas.svg?sanitize=true',

  },

    // Chats configuration
  chats: {
    blankImage: 'https://raw.githubusercontent.com/SwipesForScience/testConfig/master/images/undraw_no_data.svg?sanitize=true',
  },

    // Profile configuration
  profile: {
    blankImage: 'https://raw.githubusercontent.com/SwipesForScience/testConfig/master/images/undraw_chatting.svg?sanitize=true',
  },

    // your app's tutorial page
    // describe your problem and the way you want people to annotate
  tutorial: {
      // there is only 1 available custom animiation right now, and its 'Bubbles'
    customBackgroundAnimation: 'Bubbles',
      // steps have 2 parts, the intro and examples. In the intro you provide
      // text and images. In the examples, you provide text, data pointers, and tutorial steps
      // that the widget will display
    steps: {
      intro: [
        {
            // keep the text really short
          text: 'here is an example tutorial step',
          image: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Humpback_whales_in_singing_position.jpg',
        },
        {
            // use \n to linebreak the text
          text: 'here is another one.',
          image: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Hydrophone_being_lowered_into_the_Atlantic.jpg',
        },
      ],
      examples: [
        {
            // fill these with examples with respect to the widget you're using
          text: 'swipe right when the image is good quality',
          pointer: 'sub-NDARYX806FL1__cor_184',
          answer: 1,
          tutorialStep: 0,
        },
        {
          text: 'swipe left when its bad',
          pointer: 'sub-NDAREG590BNY__sag_201',
          answer: 0,
          tutorialStep: 1,
        },
        {
          text: `if you're not sure, click 'help' \n to discuss with scientists ${''}`,
          pointer: 'sub-NDAREW671HZW__ax_86',
          answer: 0,
          tutorialStep: 2,
        },
        {
          text: 'Are you ready to play?',
          tutorialCompleted: true,
        },
      ],
    },
  },

};
