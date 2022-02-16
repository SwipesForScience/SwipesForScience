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
  // Each value denotes the minimum amount of cumulative points needed to attain that badge
  badgeUnlockScores: [20, 50, 100, 150, 200, 300, 500, 800, 1200],
  sampleUrlTemplate:
    "https://imageswipe-test.s3.us-west-1.amazonaws.com/_SAMPLE_ID_.jpeg",
  play: {
    question: "Is this a passing image?",
    swipeRightLabel: "Swipe right for Pass",
    swipeLeftLabel: "Swipe left for Fail",
  },
};
