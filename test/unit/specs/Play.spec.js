import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import Play from '@/components/Play';
import MockFirebase from '../../MockFirebase';

Vue.use(BootstrapVue);

// eslint-enable
const propsData = {
  db: MockFirebase,
  config: {
    play: {
      blankImage: 'http://www.domain.com/image_url',
    },
    widgetType: 'Widget Type',
    widgetProperties: {
      type: 'Widget Property',
    },
  },
  userInfo: {
    displayName: 'john',
  },
  userSettings: {},
  userData: {
    score: 5,
  },
  currentLevel: {
    level: 5,
    img: 'http://www.domain.com/image_url',
    character: 'A',
    min: 3,
  },
  levels: {
  },
};
const Constructor = Vue.extend(Play);

describe('Play.vue', () => {
  it('should have correct level', () => {
    const vm = new Constructor({
      propsData,
    }).$mount();

    expect(vm.$el.querySelector('h3').textContent).to.equal(`Level ${propsData.currentLevel.level}`);
  });

  it('should have correct level image', () => {
    const vm = new Constructor({
      propsData,
    }).$mount();

    expect(vm.$el.querySelector('img').src).to.equal(propsData.currentLevel.img);
  });

  it('should have correct paragraphs', () => {
    const vm = new Constructor({
      propsData,
    }).$mount();

    const paragraphs = vm.$el.getElementsByTagName('p');
    expect(paragraphs[0].textContent).to.equal(`You've unlocked: ${propsData.currentLevel.character}`);
    expect(paragraphs[1].textContent).to.equal('loading...');
  });

  it('should have correct message & correct blank image if there is no data', async () => {
    const vm = new Constructor({
      propsData,
    }).$mount();

    vm.noData = true;
    await vm.$nextTick();

    expect(vm.$el.querySelector('h1').textContent).to.equal('There is no data in your database!');
    expect(vm.$el.getElementsByTagName('img')[1].src).to.equal(propsData.config.play.blankImage);
  });
});
