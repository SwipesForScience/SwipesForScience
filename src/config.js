export default {

    // if set to true, the user will be routed to /tutorial instead of /play if
    // they haven't taken a tutorial
  needsTutorial: true,
    // each time the app is run, it will check this manifest and update the firebase database
    // if new entries are there, they will be added, and entries that aren't in the manifest
    // but are in the firebase database will be *removed*
  manifestUrl: 'https://raw.githubusercontent.com/SwipesForScience/exampleConfig/master/config.js',
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
    baseUrlTemplate: 'http://himatdata.s3.amazonaws.com/whaledr_renamed/{0}.jpg',
    soundUrlTemplate: 'http://himatdata.s3.amazonaws.com/whaledr_renamed/{0}.wav',
    delimiter: '%',
    leftSwipeLabel: 'Fail',
    rightSwipeLabel: 'Whale',
  },


    // this shows a 'beta' ribbon in the bottom right corner
  betaMode: false,

    // this comes from your firebase console
  firebaseKeys: {
    apiKey: 'AIzaSyBTvqFK1fjj3G708OSU4NTRDgnRT2hMnLM',
    authDomain: 'swipesforsciencedev.firebaseapp.com',
    databaseURL: 'https://swipesforsciencedev.firebaseio.com',
    projectId: 'swipesforsciencedev',
    storageBucket: '',
    messagingSenderId: '390175687447',
  },

  // app: {
  //   navbarVariant: 'info',
  // },

    // Homepage configuration
    // your app's title and tagline
  home: {
    title: 'whaledr',
    tagline: 'Help oceanographers find whales',
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
          text: 'we want to learn about whales',
          image: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Humpback_whales_in_singing_position.jpg',
        },
        {
            // use \n to linebreak the text
          text: 'there is a sound recorder in the ocean, \n its called a hydrophone \n and its always on',
          image: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Hydrophone_being_lowered_into_the_Atlantic.jpg',
        },
        {
          text: 'we can make a picture from the sound waves \n the vertical lines are from the hydrophone \n using ecolocation to hear ocean sounds',
          image: 'http://himatdata.s3.amazonaws.com/whaledr_renamed/OO_HYVM1__YDH_2017_10_06T05_16_45.jpg',
        },
        {
          text: 'most of the time you do not hear anything.',
          image: 'http://himatdata.s3.amazonaws.com/whaledr_renamed/OO_HYVM1__YDH_2017_10_06T21_55_05.jpg',
        },
        {
          text: 'but sometimes you hear a whale',
          image: 'http://himatdata.s3.amazonaws.com/whaledr_renamed/OO_HYVM1__YDH_2017_10_06T19_04_25.jpg',
        },
        {
          text: 'or dolphins',
          image: 'http://himatdata.s3.amazonaws.com/whaledr_renamed/OO_HYVM1__YDH_2017_10_06T01_50_25.jpg',
        },
        {
          text: 'we want to train a machine to recognize the whales and dolphins. \n For that we need your help.',
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Gnome-computer.svg/600px-Gnome-computer.svg.png',
        },
      ],
      examples: [
        {
            // fill these with examples with respect to the widget you're using
          text: 'swipe right when you hear/see a whale \n you can tap the image to hear it.',
          pointer: 'OO_HYVM1__YDH_2017_10_06T06_48_00',
          answer: 1,
          tutorialStep: 0,
        },
        {
          text: 'when it is not a whale \n swipe left',
          pointer: 'OO_HYVM1__YDH_2017_10_06T06_48_00',
          answer: 0,
          tutorialStep: 1,
        },
        {
          text: `if you're not sure, click 'help' \n to discuss with scientists ${''}`,
          pointer: 'OO4_HYVM1__YDH_2017_10_06T06_48_00',
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
