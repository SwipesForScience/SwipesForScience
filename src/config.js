export default {

    // if set to true, the user will be routed to /tutorial instead of /play if
    // they haven't taken a tutorial
  needsTutorial: false,
    // each time the app is run, it will check this manifest and update the firebase database
    // if new entries are there, they will be added, and entries that aren't in the manifest
    // but are in the firebase database will be *removed*
  manifestUrl: 'https://raw.githubusercontent.com/SwipesForScience/exampleConfig/master/bsHbnManifest.json',

    // if manifestType = 'pubmed' then you should also include a manifestQuery key.
  manifestType: 'pubmed',
  manifestQuery: '(neuroimaging OR "Magnetic Resonance Imaging" OR "MRI") AND brain AND autism',

  widgetType: 'PubMedNLP',
  widgetProperties: {
    stages: [
      {
        id: 'relevant',
        dependOn: null,
        dependCriteria: {},
        question: 'Is this a study about a group of human participants with Autism and MRI brain scans?',
        bagOfWords: {},
        questionType: 'MultiChoice',
        questionConfig: {
          reponses: [
            {
              text: 'No',
              code: 0,
              variant: 'danger',
            },
            {
              text: 'Yes',
              code: 1,
              variant: 'success',
            },
          ],
        },
      },
      {
        id: 'numAutism',
        dependOn: 'relevant',
        dependCriteria: {
          statment: '==',
          value: 1,
        },
        question: 'How many participants with autism?',
        questionType: 'nlpNumber',
      },
      {
        id: 'numControl',
        dependOn: 'relevant',
        dependCriteria: {
          statment: '==',
          value: 1,
        },
        question: 'How many control participants?',
        questionType: 'nlpNumber',
      },
      {
        id: 'studyType',
        dependOn: 'relevant',
        dependCriteria: {
          statment: '==',
          value: 1,
        },
        question: 'Is this a cross sectional or longitudinal study?',
        questionType: 'MultiChoice',
        questionConfig: [
          {
            responses: [
              {
                text: 'cross sectional',
                code: 'cs',
                variant: 'warning',
              },
              {
                text: 'longitudinal',
                code: 'l',
                variant: 'info',
              },
            ],
          },
        ],
      },
      {
        id: 'modality',
        dependOn: 'relevant',
        dependCriteria: {
          statment: '==',
          value: 1,
        },
        question: 'What modalities are being analyzed?',
        questionType: 'MultiSelect',
        questionConfig: {
          reponses: [
            {
              text: 'T1w',
              code: 't1w',
            },
            {
              text: 'DWI',
              code: 'dwi',
            },
            {
              text: 'fMRI',
              code: 'fmri',
            },
            {
              text: 'Spectroscopy',
              code: 'nmr',
            },
            {
              text: 'Arterial Spin Labelling',
              code: 'asl',
            },
          ],
        },
      },
    ],
  },

  iconAttribute: {
    name: 'openmoji',
    url: 'http://openmoji.org',
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
      character: 'fish',
      img: 'https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/color/svg/1F41F.svg?sanitize=true',
      img_grey: 'https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/black/svg/1F41F.svg?sanitize=true',
    },
    2: {
      level: 2,
      min: 351,
      max: 750,
      character: 'frog',
      img: 'https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/color/svg/1F438.svg?sanitize=true',
      img_grey: 'https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/black/svg/1F438.svg?sanitize=true',
    },
    3: {
      level: 3,
      min: 751,
      max: 1000,
      character: 'duck',
      img: 'https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/color/svg/1F986.svg?sanitize=true',
      img_grey: 'https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/black/svg/1F986.svg?sanitize=true',
    },
    4: {
      level: 4,
      min: 1001,
      max: 1500,
      character: 'koala',
      img: 'https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/color/svg/1F428.svg?sanitize=true',
      img_grey: 'https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/black/svg/1F428.svg?sanitize=true',
    },
    5: {
      level: 5,
      min: 1501,
      max: 2000,
      character: 'cat',
      img: 'https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/color/svg/1F408.svg?sanitize=true',
      img_grey: 'https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/black/svg/1F408.svg?sanitize=true',
    },
    6: {
      level: 6,
      min: 2001,
      max: 2500,
      character: 'lion',
      img: 'https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/color/svg/1F981.svg?sanitize=true',
      img_grey: 'https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/black/svg/1F981.svg?sanitize=true',
    },
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
