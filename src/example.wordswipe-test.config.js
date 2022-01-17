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
  // Each value denotes the minimum amount of cumulative points needed to attain that level
  levels: [20, 50, 100, 150, 200, 300, 500, 800, 1200],
  tutorial: {},
  play: {
    question: "Are these words real or fake?",
    swipeRightLabel: "Swipe right for real words",
    swipeLeftLabel: "Swipe left for fake words",
  },
};
