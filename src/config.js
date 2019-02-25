export default {
  /* eslint-disable */
  "needsTutorial": true,
  "manifestUrl": "https://s3-us-west-2.amazonaws.com/whaledr/megaptera/whalemanifest.json",
  "widgetType": "ImageSoundSwipe",
  "widgetProperties": {
    "baseUrlTemplate": "https://s3-us-west-2.amazonaws.com/whaledr/megaptera/{0}/{1}/{2}.jpg",
    "delimiter": "___",
    "leftSwipeLabel": "Fail",
    "rightSwipeLabel": "Whale",
    "soundUrlTemplate": "https://s3-us-west-2.amazonaws.com/whaledr/megaptera/{0}/{1}/{2}.wav"
  },
//   manifestType: 'S3',
//   manifestS3: {
//     bucket: 'whaledr',
//     prefix: 'megaptera',
//     delimiter: '.wav',
//     max_keys: 150000,
//   },
  "betaMode": false,
  "firebaseKeys": {
    apiKey: "AIzaSyD9CXyTSArnaseKwZw_aOr9BDnaRxRtaRc",
    authDomain: "megaptera-13ae9.firebaseapp.com",
    databaseURL: "https://megaptera-13ae9.firebaseio.com",
    projectId: "megaptera-13ae9",
    storageBucket: "megaptera-13ae9.appspot.com",
    messagingSenderId: "1007381802839"
  },
  "app": {
    "navbarVariant": "info"
  },
  "iconAttribute": {
    "name": "openmoji",
    "url": "http://openmoji.org"
  },
  "levels": {
    "0": {
      "level": 0,
      "min": 0,
      "max": 100,
      "character": null,
      "img": null,
      "img_grey": null
    },
    "1": {
      "level": 1,
      "min": 101,
      "max": 350,
      "character": "fish",
      "img": "https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/color/svg/1F41F.svg?sanitize=true",
      "img_grey": "https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/black/svg/1F41F.svg?sanitize=true"
    },
    "2": {
      "level": 2,
      "min": 351,
      "max": 750,
      "character": "frog",
      "img": "https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/color/svg/1F438.svg?sanitize=true",
      "img_grey": "https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/black/svg/1F438.svg?sanitize=true"
    },
    "3": {
      "level": 3,
      "min": 751,
      "max": 1000,
      "character": "duck",
      "img": "https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/color/svg/1F986.svg?sanitize=true",
      "img_grey": "https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/black/svg/1F986.svg?sanitize=true"
    },
    "4": {
      "level": 4,
      "min": 1001,
      "max": 1500,
      "character": "koala",
      "img": "https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/color/svg/1F428.svg?sanitize=true",
      "img_grey": "https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/black/svg/1F428.svg?sanitize=true"
    },
    "5": {
      "level": 5,
      "min": 1501,
      "max": 2000,
      "character": "cat",
      "img": "https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/color/svg/1F408.svg?sanitize=true",
      "img_grey": "https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/black/svg/1F408.svg?sanitize=true"
    },
    "6": {
      "level": 6,
      "min": 2001,
      "max": 2500,
      "character": "lion",
      "img": "https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/color/svg/1F981.svg?sanitize=true",
      "img_grey": "https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/black/svg/1F981.svg?sanitize=true"
    }
  },
  "home": {
    "title": "megaptera",
    "tagline": "Help us find whale sounds",
    "backgroundUrl": "https://raw.githubusercontent.com/SwipesForScience/testConfig/master/images/SwipesForScience.svg?sanitize=true"
  },
  "play": {
    "blankImage": "https://cdn.rawgit.com/SwipesForScience/testConfig/master/images/undraw_blank_canvas.svg"
  },
  "chats": {
    "blankImage": "https://cdn.rawgit.com/SwipesForScience/testConfig/master/images/undraw_no_data.svg"
  },
  "profile": {
    "blankImage": "https://cdn.rawgit.com/SwipesForScience/testConfig/master/images/undraw_chatting.svg"
  },
  "tutorial": {
    "customBackgroundAnimation": "Bubbles",
    "steps": {
      "intro": [
        {
          "text": "we want to learn about whales",
          "image": "https://upload.wikimedia.org/wikipedia/commons/8/8b/Humpback_whales_in_singing_position.jpg"
        },
        {
          "text": "there is a sound recorder in the ocean, \n its called a hydrophone \n and its always on",
          "image": "https://upload.wikimedia.org/wikipedia/commons/d/dd/Hydrophone_being_lowered_into_the_Atlantic.jpg"
        },
        {
          "text": "we can make a picture from the sound waves \n the vertical lines are from the hydrophone \n using ecolocation to hear ocean sounds",
          "image": "http://himatdata.s3.amazonaws.com/whaledr_renamed/OO_HYVM1__YDH_2017_10_06T05_16_45.jpg"
        },
        {
          "text": "most of the time you do not hear anything.",
          "image": "http://himatdata.s3.amazonaws.com/whaledr_renamed/OO_HYVM1__YDH_2017_10_06T21_55_05.jpg"
        },
        {
          "text": "but sometimes you hear a whale",
          "image": "http://himatdata.s3.amazonaws.com/whaledr_renamed/OO_HYVM1__YDH_2017_10_06T19_04_25.jpg"
        },
        {
          "text": "or dolphins",
          "image": "http://himatdata.s3.amazonaws.com/whaledr_renamed/OO_HYVM1__YDH_2017_10_06T01_50_25.jpg"
        },
        {
          "text": "we want to train a machine to recognize the whales and dolphins. \n For that we need your help.",
          "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Gnome-computer.svg/600px-Gnome-computer.svg.png"
        }
      ],
      "examples": [
        {
          "text": "swipe right when you hear/see a whale \n you can tap the image to hear it.",
          "pointer": "A3150912_09_1970_01_01T00_03_15_241455Z",
          "answer": 1,
          "tutorialStep": 0
        },
        {
          "text": "when it is not a whale \n swipe left",
          "pointer": "A3150919_08_1970_01_01T00_19_35_045654Z",
          "answer": 0,
          "tutorialStep": 1
        },
        {
          "text": "if you're not sure, click 'help' \n to discuss with scientists ",
          "pointer": "A3150912_09_1970_01_01T00_05_35_991333Z",
          "answer": 0,
          "tutorialStep": 2
        },
        {
          "text": "Are you ready to play?",
          "tutorialCompleted": true
        }
      ]
    }
  }
};