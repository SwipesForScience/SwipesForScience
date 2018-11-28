import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import Tutorial from '@/components/Tutorial';
import router from '@/router';

Vue.use(BootstrapVue);

// eslint-enable
const propsData = {
  config: {
    widgetType: 'Widget Type',
    widgetProperties: {
      type: 'Widget Property',
    },
    userSettings: {},
    tutorial: {
      steps: {
        intro: [{
          text: 'Step 1',
          image: 'http://www.domain.com/image',
        }],
        examples: [{
          text: 'Step 2',
          pointer: false,
          tutorialCompleted: true,
        }],
      },
      customBackgroundAnimation: 'Bubbles',
    },
  },
  levels: {
  },
};
const Constructor = Vue.extend(Tutorial);

describe('Tutorial.vue', () => {
  it('should have correct header', () => {
    const vm = new Constructor({
      propsData,
      router,
    }).$mount();

    expect(vm.$el.querySelector('h1').textContent).to.equal('Tutorial');
  });

  it('should have correct introduction step', () => {
    const vm = new Constructor({
      propsData,
      router,
    }).$mount();

    expect(vm.$el.getElementsByClassName('invisible')[0].textContent).to.equal(propsData.config.tutorial.steps.intro[0].text);
    expect(vm.$el.querySelector('img').src).to.equal(propsData.config.tutorial.steps.intro[0].image);
  });

  it('should have correct example step', () => {
    const vm = new Constructor({
      propsData,
      router,
    }).$mount();

    expect(vm.$el.getElementsByClassName('invisible')[1].textContent).to.equal(propsData.config.tutorial.steps.examples[0].text);
  });

  it('should have play now button', () => {
    const vm = new Constructor({
      propsData,
      router,
    }).$mount();

    expect(vm.$el.querySelector('button').textContent).to.equal('Play now');
  });
});
