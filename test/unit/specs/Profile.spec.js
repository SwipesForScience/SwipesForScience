import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import Profile from '@/components/Profile';
import router from '@/router';
import Util from '../../util';
import MockFirebase from '../../MockFirebase';
import testData from '../../testDB.json';

Vue.use(BootstrapVue);

// eslint-enable
const propsData = {
  db: MockFirebase,
  config: {
    profile: {
      blankImage: 'http://www.domain.com/image_url',
    },
  },
  userInfo: {
    displayName: 'john',
  },
  userData: {
    score: 5,
    '.key': 'key1',
  },
  currentLevel: {
    level: 5,
    img: 'http://www.domain.com/image_url',
  },
  levels: {
  },
};
const Constructor = Vue.extend(Profile);

describe('Profile.vue', () => {
  it('should have correct user name', () => {
    const vm = new Constructor({
      propsData,
      router,
    }).$mount();

    expect(vm.$el.querySelector('h1').textContent).to.equal(`\n      ${propsData.userInfo.displayName}\n    `);
  });

  it('should have correct user score', () => {
    const vm = new Constructor({
      propsData,
      router,
    }).$mount();

    expect(vm.$el.getElementsByTagName('p')[0].textContent).to.equal(`\n      You have ${propsData.userData.score} points!\n    `);
  });

  it('should have correct user score', () => {
    const vm = new Constructor({
      propsData,
      router,
    }).$mount();

    expect(vm.$el.querySelector('h3').textContent).to.equal(`Level ${propsData.currentLevel.level}`);
  });

  it('should have blank image if there is no chat data', () => {
    const vm = new Constructor({
      propsData,
      router,
    }).$mount();

    expect(vm.$el.getElementsByTagName('img')[1].src).to.equal(propsData.config.profile.blankImage);
  });

  it('should have username if there is chat data', async () => {
    const vm = new Constructor({
      propsData,
      router,
    }).$mount();

    await Util.timeout(1800);
    expect(vm.$el.querySelector('b').textContent).to.equal(testData.chats.sampleChats[0][0].username);
  });
});
