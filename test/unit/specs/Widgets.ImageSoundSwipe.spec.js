import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import ImageSoundSwipe from '@/components/Widgets/ImageSoundSwipe';
import Util from '../../util';

Vue.use(BootstrapVue);

// eslint-enable
const Constructor = Vue.extend(ImageSoundSwipe);
const propsData = {
  widgetPointer: 'OO_HYVM1__YDH_2017_10_06T20_35_50',
  widgetProperties: {
    baseUrlTemplate: 'http://himatdata.s3.amazonaws.com/whaledr_renamed/{0}.jpg',
    soundUrlTemplate: 'http://himatdata.s3.amazonaws.com/whaledr_renamed/{0}.wav',
    delimiter: '__',
    leftSwipeLabel: 'fail',
    rightSwipeLabel: 'pass',
  },
  userSettings: {},
  widgetSummary: {},
  playMode: 'play',
  tutorialStep: 0,
};
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
  userSettings: {},
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

  before(() => {
    audioOriginal = window.Audio;
    audioMock = {
      play() {

      },
      pause() {

      },
    };
    window.Audio = function Audio(url) {
      this.url = url;

      return audioMock;
    };
  });

  after(() => {
    window.Audio = audioOriginal;
  });

  it('should run all its tests and return 1', () => {
    createEvent('arrowleft');
    createEvent('arrowright');
    const vm = new Constructor({
      propsData,
    }).$mount();
    vm.swipe = 'swipe-left';
    // expect(vm.widgetPointer).to.equal(propsData.widgetPointer);
    expect(vm.test()).to.equal(1);
  });

  it('should run all its tests and return 1', async () => {
    createEvent('arrowleft');
    createEvent('arrowright');
    const vm = new Constructor({
      propsData: propsData1,
    }).$mount();
    vm.swipe = 'swipe-left';
    // expect(vm.widgetPointer).to.equal(propsData.widgetPointer);
    expect(vm.test()).to.equal(1);
    await Util.timeout(1800);
  });
});
