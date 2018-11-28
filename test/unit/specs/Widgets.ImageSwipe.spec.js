import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import ImageSwipe from '@/components/Widgets/ImageSwipe';

Vue.use(BootstrapVue);

// eslint-enable
const Constructor = Vue.extend(ImageSwipe);
const propsData = {
  widgetPointer: '1000288',
  widgetProperties: {
    baseUrlTemplate: 'https://s3.amazonaws.com/hotdognothotdog/{0}.jpg',
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
  widgetPointer: '1000288',
  widgetProperties: {
    baseUrlTemplate: 'https://s3.amazonaws.com/hotdognothotdog/{0}.jpg',
    delimiter: '__',
    leftSwipeLabel: 'fail',
    rightSwipeLabel: 'pass',
  },
  userSettings: {},
  widgetSummary: {},
  playMode: '',
  tutorialStep: 0,
};

function createEvent(name = 'arrowleft') {
  const event = document.createEvent('HTMLEvents');
  event.initEvent(name, false, true);
  return event;
}

describe('widgets/ImageSwipe.vue', () => {
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
  it('should run all its tests in tutorial mode and return 1', () => {
    const vm = new Constructor({
      propsData: propsData1,
    }).$mount();

    expect(vm.test()).to.equal(1);
  });
});
