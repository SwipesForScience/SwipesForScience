export default {
  firebaseKeys: {
    apiKey: "AIzaSyDehfi0tvGWSnFMoDREdLQfpBRGMwScNv8",
    authDomain: "imageswipe-test.firebaseapp.com",
    databaseURL: "https://imageswipe-test-default-rtdb.firebaseio.com/",
    projectId: "imageswipe-test",
    storageBucket: "imageswipe-test.appspot.com",
  },
  home: {
    title: "Braindr",
    tagline:
      "Any similarities to the Tinder dating app are completely coincidental",
  },
  needsTutorial: true,
  manifestUrl:
    "https://raw.githubusercontent.com/SwipesForScience/exampleConfig/master/bsHbnManifest.json",
  widgetType: "ImageSwipe",
  widgetProperties: {
    baseUrlTemplate:
      "https://s3-us-west-2.amazonaws.com/akeshavan-mindcontrol/hbnSplat/{0}/tiles/base_{1}.png",
    delimiter: "__",
    showFixationCross: false,
    leftSwipe: {
      label: "Fail",
      value: -1,
    },
    rightSwipe: {
      label: "Pass",
      value: 1,
    },
  },
  iconAttribute: {
    name: "openmoji",
    url: "http://openmoji.org",
  },
  levels: {
    0: {
      level: 0,
      min: 0,
      max: 100,
      character: null,
      img: null,
      img_grey: null,
    },
    1: {
      level: 1,
      min: 101,
      max: 350,
      character: "fish",
      img: "https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/color/svg/1F41F.svg?sanitize=true",
      img_grey:
        "https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/black/svg/1F41F.svg?sanitize=true",
    },
    2: {
      level: 2,
      min: 351,
      max: 750,
      character: "frog",
      img: "https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/color/svg/1F438.svg?sanitize=true",
      img_grey:
        "https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/black/svg/1F438.svg?sanitize=true",
    },
    3: {
      level: 3,
      min: 751,
      max: 1000,
      character: "duck",
      img: "https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/color/svg/1F986.svg?sanitize=true",
      img_grey:
        "https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/black/svg/1F986.svg?sanitize=true",
    },
    4: {
      level: 4,
      min: 1001,
      max: 1500,
      character: "koala",
      img: "https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/color/svg/1F428.svg?sanitize=true",
      img_grey:
        "https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/black/svg/1F428.svg?sanitize=true",
    },
    5: {
      level: 5,
      min: 1501,
      max: 2000,
      character: "cat",
      img: "https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/color/svg/1F408.svg?sanitize=true",
      img_grey:
        "https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/black/svg/1F408.svg?sanitize=true",
    },
    6: {
      level: 6,
      min: 2001,
      max: 2500,
      character: "lion",
      img: "https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/color/svg/1F981.svg?sanitize=true",
      img_grey:
        "https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/black/svg/1F981.svg?sanitize=true",
    },
  },
  tutorial: {},
};
