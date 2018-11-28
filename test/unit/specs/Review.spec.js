import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import Review from '@/components/Review';
import router from '@/router';
import MockFirebase from '../../MockFirebase';
import Util from '../../util';
import testData from '../../testDB.json';

Vue.use(BootstrapVue);

// eslint-enable
const propsData = {
  db: MockFirebase,
  config: {
    widgetType: 'Widget Type',
    widgetProperties: {
      type: 'Widget Property',
    },
  },
  userSettings: {},
  userInfo: {
    displayName: 'username',
  },
  userData: {
    '.key': 'key1',
  },
  currentLevel: {},
  levels: {
  },
};
const Constructor = Vue.extend(Review);

describe('Review.vue', () => {
  it('should have correct header', async () => {
    router.push({ name: 'Review', params: { key: '0' } });
    await Vue.nextTick();

    const vm = new Constructor({
      propsData,
      router,
    }).$mount();

    expect(vm.$el.querySelector('h3').textContent).to.equal('Chat');
  });

  it('should have correct input text & button', async () => {
    router.push({ name: 'Review', params: { key: '0' } });
    await Vue.nextTick();

    const vm = new Constructor({
      propsData,
      router,
    }).$mount();

    expect(vm.$el.getElementsByTagName('input').length).to.equal(1);
    expect(vm.$el.querySelector('button').textContent).to.equal('Send');
  });

  it('should have "No one has said anything yet!" if there is no chat', async () => {
    router.push({ name: 'Review', params: { key: '0' } });
    await Vue.nextTick();

    const vm = new Constructor({
      propsData,
      router,
    }).$mount();

    expect(vm.$el.querySelector('p').textContent).to.equal('No one has said anything yet!');
  });

  it('should have correct user name and message', async () => {
    router.push({ name: 'Review', params: { key: '0' } });
    await Vue.nextTick();

    const vm = new Constructor({
      propsData,
      router,
    }).$mount();

    await Util.timeout(1500);
    expect(vm.$el.getElementsByTagName('p')[0].textContent).to.equal(`${testData.chats.sampleChats[0][0].username}: ${testData.chats.sampleChats[0][0].message}\n      `);
  });
});
