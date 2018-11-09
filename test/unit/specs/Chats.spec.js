import Vue from 'vue';
import VueFire from 'vuefire';
import Chats from '@/components/Chats';
import MockFirebase from './MockFirebase';
import testData from '../../testData.json';

Vue.use(VueFire);

// eslint-enable
const propsData = {
  db: MockFirebase,
  config: {
    chats: {
      blankImage: 'blank.png',
    },
  },
};
const Constructor = Vue.extend(Chats);

describe('Chats.vue', () => {
  it('should have correct title', () => {
    const vm = new Constructor({
      propsData,
    }).$mount();
    expect(vm.$el.querySelector('h1').textContent).to.equal('Chats');
  });

  it('should have correct content in paragraphs', () => {
    const vm = new Constructor({
      propsData,
    }).$mount();

    const paragraphs = vm.$el.getElementsByTagName('p');
    expect(paragraphs[0].textContent).to.equal('See which samples people are talking about');
  });

  it('should have correct data in span', (done) => {
    const vm = new Constructor({
      propsData,
    }).$mount();

    setTimeout(() => {
      const spans = vm.$el.getElementsByTagName('span');
      expect(spans[0].textContent).to.equal(`${testData.chats.sampleChats[0][0].username} : ${testData.chats.sampleChats[0][0].message}\n        `);
      done();
    }, 1800);
  });
});
