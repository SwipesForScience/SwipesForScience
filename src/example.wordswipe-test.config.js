export default {
  firebaseKeys: {
    apiKey: "AIzaSyACOg0r9cGLp0AB_JXjoArf1gFQOhH9LcI",
    authDomain: "wordswipe-test.firebaseapp.com",
    databaseURL: "https://wordswipe-test-default-rtdb.firebaseio.com",
    projectId: "wordswipe-test",
    storageBucket: "wordswipe-test.appspot.com",
    messagingSenderId: "934860809801",
    appId: "1:934860809801:web:b59be557ac5a62105a4198",
    measurementId: "G-0MCHLFQVZ9",
  },
  home: {
    title: "Rapid Online Assessment of Reading",
    tagline: "Are the words real or fake?",
  },
  /* shufflingMethod: Determines the method of choosing samples in a deck from total pool of samples
  shufflingMethod: random Randomly picked
  leastSeen: Prioritize samples that the user has not seen, then priortize samples that have been least seen overall */
  // shufflingMethod: "random",
  shufflingMethod: "leastSeen",
  needsTutorial: false,
  manifestUrl: "",
  widgetType: "WordSwipe",
  /* mode: Determines how each vote is evaluated and scored. 
  Assessment: Verify vote against actualValue of sample
  "Data Annotation": Verify vote against average value of sample
  */
  //  mode: "Data Annotation"
  mode: "Assessment",
  deckSize: 10,
  widgetProperties: {
    baseUrlTemplate: "",
    delimiter: "__",
    showFixationCross: true,
    leftSwipe: {
      label: "Fake Word",
      value: -1,
    },
    rightSwipe: {
      label: "Real Word",
      value: 1,
    },
    timing: {
      stimulusDuration: 10_000,
      timeoutValue: 0,
      interStimuliDuration: 2000,
      stimulusFadeIn: false,
    },
  },
  iconAttribute: {
    name: "openmoji",
    url: "http://openmoji.org",
  },
  levelThresholds: [20, 50, 100, 150, 200, 2000],
  levels: {
    1: {
      level: 1,
      min: 20,
      max: 50,
      character: "fish",
      img: "https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/color/svg/1F41F.svg?sanitize=true",
      img_grey:
        "https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/black/svg/1F41F.svg?sanitize=true",
    },
    2: {
      level: 2,
      min: 51,
      max: 100,
      character: "frog",
      img: "https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/color/svg/1F438.svg?sanitize=true",
      img_grey:
        "https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/black/svg/1F438.svg?sanitize=true",
    },
    3: {
      level: 3,
      min: 101,
      max: 150,
      character: "duck",
      img: "https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/color/svg/1F986.svg?sanitize=true",
      img_grey:
        "https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/black/svg/1F986.svg?sanitize=true",
    },
    4: {
      level: 4,
      min: 151,
      max: 200,
      character: "koala",
      img: "https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/color/svg/1F428.svg?sanitize=true",
      img_grey:
        "https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/black/svg/1F428.svg?sanitize=true",
    },
    5: {
      level: 5,
      min: 201,
      max: 250,
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
  play: {
    question: "Are these words real or fake?",
    swipeRightLabel: "Swipe right for real words",
    swipeLeftLabel: "Swipe left for fake words",
  },
};
