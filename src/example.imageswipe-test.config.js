export default {
  firebaseKeys: {
    apiKey: "AIzaSyDehfi0tvGWSnFMoDREdLQfpBRGMwScNv8",
    authDomain: "imageswipe-test.firebaseapp.com",
    databaseURL: "https://imageswipe-test-default-rtdb.firebaseio.com/",
    projectId: "imageswipe-test",
  },
  home: {
    title: "Braindr",
    tagline:
      "Any similarities to the Tinder dating app are completely coincidental",
    disclaimer:
      "Some little disclaimer here that this game was brought to you by your school or educational institution!",
  },
  tutorial: {
    needsTutorial: true,
    introduction: {
      slides: [
        {
          title: "01 - Introduction",
          text: 'Your objective is to classify these slices as "Pass" or "Fail" by swiping right or left - swipe right for Passing Images, swipe left for Failing Images! On a desktop, use the arrow keys instead.',
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
      title: "05 Identifying a Passing Image",
      card: {
        sampleId: "braindrPass.15676b8",
        img: {
          url: "https://braindr.us/static/img/braindrIntro.9230f64.png",
        },
      },
      text: "Swipe Right (or press right arrow) to Pass this image",
    },
    left: {
      title: "06 - Identifying a Failing Image",
      card: {
        sampleId: "braindrFail.2c2eceb",
        img: {
          url: "https://braindr.us/static/img/braindrFail.2c2eceb.png",
        },
      },
      text: "Swipe Left (or press left arrow) to Fail this image",
    },
    training: {
      title: "07 - Training",
      text: "Swipe all cards correctly to pass the tutorial.",
      trainingCards: [
        {
          sampleId: "sub-NDARMJ334ZK3_T1w__ax_65",
          value: -1,
        },
        { sampleId: "sub-NDARLN778RYN_T1w__ax_170", value: -1 },
        { sampleId: "sub-NDARLZ104NDT_T1w__ax_109", value: 1 },
        { sampleId: "sub-NDARME656MTN_T1w__ax_111", value: -1 },
        { sampleId: "sub-NDARMG196KV4_T1w__ax_163", value: -1 },
      ],
    },
    summary: {
      title: "08 - Conclusion",
      buttonText: "Let's play!",
      text: "So that covers how to play the Braindr!\nPlaying through the rounds will unlock achievements.\nPlaying through the rounds will unlock achievements and rank you on a leaderboard.",
    },
  },
  shufflingMethod: "leastSeen",
  deckSize: 10,
  widgetType: "ImageSwipe",
  widgetProperties: {
    question: "Is this a passing image?",
    sampleUrlTemplate:
      "https://imageswipe-test.s3.us-west-1.amazonaws.com/_SAMPLE_ID_.jpeg",
    leftSwipe: {
      label: "Swipe left for Fail",
      value: -1,
    },
    rightSwipe: {
      label: "Swipe right for Pass",
      value: 1,
    },
  },
  // Each value denotes the minimum amount of cumulative points needed to attain that badge
  badgeUnlockScores: [20, 50, 100, 150, 200, 300, 500, 800, 1200],
};
