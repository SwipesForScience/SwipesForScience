import Vue from 'vue';
import ImageSplat from '@/components/Widgets/ImageSplat';

// eslint-enable
const Constructor = Vue.extend(ImageSplat);
const propsData = {
  widgetPointer: '1000288',
  widgetProperties: {
    baseUrlTemplate: 'https://s3.amazonaws.com/hotdognothotdog/{0}.jpg',
    maskUrlTemplate: 'https://s3.amazonaws.com/hotdognothotdog/{0}.jpg',
    contourUrlTemplate: 'https://s3.amazonaws.com/hotdognothotdog/{0}.jpg',
    delimiter: '__',
  },
  widgetSummary: {},
  playMode: 'play',
  tutorialStep: 0,
};
const propsData1 = {
  widgetPointer: '1000288',
  widgetProperties: {
    baseUrlTemplate: 'https://s3.amazonaws.com/hotdognothotdog/{0}.jpg',
    maskUrlTemplate: 'https://s3.amazonaws.com/hotdognothotdog/{0}.jpg',
    contourUrlTemplate: 'https://s3.amazonaws.com/hotdognothotdog/{0}.jpg',
    delimiter: '__',
  },
  widgetSummary: {},
  playMode: '',
  tutorialStep: 0,
};

describe('widgets/ImageSplat.vue', () => {
  it('should run all its tests and return 1', () => {
    const vm = new Constructor({
      propsData,
    }).$mount();

    expect(vm.test()).to.equal(1);
  });
  it('should run all its tests in tutorial mode and return 1', () => {
    const vm = new Constructor({
      propsData: propsData1,
    }).$mount();

    expect(vm.test()).to.equal(1);
  });
});
