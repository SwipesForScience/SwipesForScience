import Vue from 'vue';
import ImageSoundSwipe from '@/components/Widgets/ImageSoundSwipe';

// eslint-enable
const Constructor = Vue.extend(ImageSoundSwipe);
const propsData1 = {
  widgetPointer: 'OO_HYVM1__YDH_2017_10_06T20_35_50',
  widgetProperties: {
    baseUrlTemplate: 'http://himatdata.s3.amazonaws.com/whaledr_renamed/{0}.jpg',
    soundUrlTemplate: 'http://himatdata.s3.amazonaws.com/whaledr_renamed/{0}.wav',
    delimiter: '__',
    leftSwipeLabel: 'fail',
    rightSwipeLabel: 'pass',
  },
  widgetSummary: {},
  playMode: '',
  tutorialStep: 0,
};

function createEvent(name = 'arrowleft') {
  const event = document.createEvent('HTMLEvents');
  event.initEvent(name, false, true);
  return event;
}

describe('widgets/ImageSoundSwipe.vue', () => {
  let audioOriginal;
  let audioMock;

  beforeEach(() => {
    audioOriginal = window.Audio;
    audioMock = {
      play() {

      },
      pause() {

      },
    };
    window.Audio = function audio() { return audioMock; };
  });

  afterEach(() => {
    window.Audio = audioOriginal;
  });

  it('should run all its tests and return 1', () => {
    createEvent('arrowleft');
    createEvent('arrowright');
    const vm = new Constructor({
      propsData: propsData1,
    }).$mount();
    vm.swipe = 'swipe-left';
    // expect(vm.widgetPointer).to.equal(propsData.widgetPointer);
    expect(vm.test()).to.equal(1);
  });
});
