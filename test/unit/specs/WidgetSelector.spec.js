import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import WidgetSelector from '@/components/WidgetSelector';
import router from '@/router';

Vue.use(BootstrapVue);

// eslint-enable
const propsData = {
  widgetPointer: 'Widget Pointer',
  widgetProperties: {
    type: 'Widget Property',
  },
  userSettings: {},
  widgetSummary: {},
  playMode: 'play',
  tutorialStep: 1,
};
const Constructor = Vue.extend(WidgetSelector);

describe('WidgetSelector.vue', () => {
  it('should have ImageSwipe if widget type is "ImageSwipe"', () => {
    propsData.widgetType = 'ImageSwipe';
    const vm = new Constructor({
      propsData,
      router,
    }).$mount();

    expect(vm.$el.getElementsByTagName('button').length).to.equal(2);
    expect(vm.$el.querySelector('a').textContent).to.equal('Help');
  });

  it('should have ImageSplat if widget type is "ImageSplat"', () => {
    propsData.widgetType = 'ImageSplat';
    const vm = new Constructor({
      propsData,
      router,
    }).$mount();

    expect(vm.$el.getElementsByTagName('button').length).to.equal(3);
    expect(vm.$el.getElementsByTagName('a')[1].textContent).to.equal('\n          Mask\n        ');
    expect(vm.$el.getElementsByTagName('a')[2].textContent).to.equal('\n          Contour\n        ');
  });

  it('should have ImageSwipeChoices if widget type is "ImageSwipeChoices"', () => {
    propsData.widgetType = 'ImageSwipeChoices';
    const vm = new Constructor({
      propsData,
      router,
    }).$mount();

    expect(vm.$el.getElementsByTagName('canvas').length).to.equal(1);
    expect(vm.$el.querySelector('a').textContent).to.equal('Help');
  });

  it('should have TemplateWidget', () => {
    propsData.widgetType = 'Widget Type';
    const vm = new Constructor({
      propsData,
      router,
    }).$mount();

    expect(vm.$el.querySelector('p').textContent).to.equal(propsData.widgetPointer);
    expect(vm.$el.querySelector('a').textContent).to.equal('Help');
    expect(vm.$el.getElementsByTagName('button')[0].textContent).to.equal('Vote No');
    expect(vm.$el.getElementsByTagName('button')[1].textContent).to.equal('Vote Yes');
  });
});
