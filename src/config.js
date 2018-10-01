export default {

  // if set to true, the user will be routed to /tutorial instead of /play if
  // they haven't taken a tutorial
  needsTutorial: false,

  // each time the app is run, it will check this manifest and update the firebase database
  // if new entries are there, they will be added, and entries that aren't in the manifest
  // but are in the firebase database will be *removed*
  manifestUrl: 'https://cdn.rawgit.com/SwipesForScience/testConfig/master/whaledrManifest.json',
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

  // Homepage configuration

  // your app's title and tagline
  home: {
    title: 'whaledr',
    tagline: 'Help oceanographers find whales',
    // background image on Homepage
    backgroundUrl: 'https://cdn.rawgit.com/SwipesForScience/testConfig/master/SwipesForScience.svg',
  },

  // Play configuration
  play: {
    blankImage: 'https://cdn.rawgit.com/SwipesForScience/testConfig/master/undraw_blank_canvas.svg',

  },

  // Chats configuration
  chats: {
    blankImage: 'https://cdn.rawgit.com/SwipesForScience/testConfig/master/undraw_no_data.svg',
  },

  // Profile configuration
  profile: {
    blankImage: 'https://cdn.rawgit.com/SwipesForScience/testConfig/master/undraw_chatting.svg',
  },
};
