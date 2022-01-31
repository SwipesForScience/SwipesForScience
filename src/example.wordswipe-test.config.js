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
  needsTutorial: true,
  /* shufflingMethod: Determines the method of choosing samples in a deck from total pool of samples
  shufflingMethod: random Randomly picked
  leastSeen: Prioritize samples that the user has not seen, then priortize samples that have been least seen overall */
  // shufflingMethod: "random",
  shufflingMethod: "leastSeen",

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
  // Each value denotes the minimum amount of cumulative points needed to attain that badge
  badgeUnlockScores: [20, 50, 100, 150, 200, 300, 500, 800, 1200],
  tutorial: {
    introduction: {
      slides: [
        {
          title: "01 - Introduction",
          text: "Test your reading reflexes and identify which words are real and which are fake!\nCompete against your classmates, or work to improve your reading ability, all while unlocking trophies!\nPlaying is simple - swipe right for real words, swipe left for fake ones! On a desktop, use the arrow keys instead.",
        },
        {
          title: "02 - Types of Brain Matter",
          text: "There are two types of brain tissue: Gray matter and White matter",
          img: {
            url: "https://braindr.us/static/img/braindrIntro.9230f64.png",
            caption: "Gray and White matter",
          },
        },
        {
          title: "03 - Passing Images",
          text: "In a passing image, you can clearly see the two tissue types",
          img: {
            url: "https://braindr.us/static/img/braindrPass.15676b8.png",
            caption: "Example of a passing image",
          },
        },
        {
          title: "04 - Failing Images",
          text: 'In a failing image, you cannot distinguish the tissue types. It looks like there are "bands" or blurriness',
          img: {
            url: "https://braindr.us/static/img/braindrFail.2c2eceb.png",
            caption: 'A failing image has motion "bands" or is blurry',
          },
        },
      ],
      buttonText: "Ready to train?",
    },
    right: {
      title: "05 Real words",
      card: {
        sampleId: "sun",
      },
      text: "When you come across a word that exists in the English language, swipe to the right.\nSun is a real word, so you’d swipe right.",
    },
    left: {
      card: {
        sampleId: "bulbet",
      },
      title: "06 - Fake words",
      text: "When you come across a word that is made up, swipe to the left.\nBulbet is not a real word, so you’d go ahead and swipe left.",
    },
    training: {
      title: "07 - Training",
      text: "Swipe all cards correctly to pass the tutorial.",
      trainingCards: [
        {
          sampleId: "jasmine",
          value: 1,
        },
        { sampleId: "bulbet", value: 0 },
        { sampleId: "sun", value: 1 },
        { sampleId: "ecoline", value: 0 },
        { sampleId: "dylly", value: 0 },
      ],
    },
    summary: {
      title: "08 - Conclusion",
      buttonText: "Let's play!",
      text: "So that covers how to play the ROAR game!\nPlaying through the rounds will unlock achievements.\nPlaying through the rounds will unlock achievements and rank you on a leaderboard.",
    },
  },
  play: {
    question: "Are these words real or fake?",
    swipeRightLabel: "Swipe right for real words",
    swipeLeftLabel: "Swipe left for fake words",
  },
};
