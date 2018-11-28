import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import TemplateWidget from '@/components/Widgets/TemplateWidget';

Vue.use(BootstrapVue);

// eslint-enable
const Constructor = Vue.extend(TemplateWidget);
const propsData = {
  widgetPointer: 'a',
  widgetProperties: {},
  widgetSummary: {},
  userSettings: {},
  playMode: 'play',
  tutorialStep: 0,
};
const propsData1 = {
  widgetPointer: 'a',
  widgetProperties: {},
  widgetSummary: {},
  userSettings: {},
  playMode: '',
  tutorialStep: 0,
};

describe('widgets/TemplateWidget.vue', () => {
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
