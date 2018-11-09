import Vue from 'vue';
import Admin from '@/components/Admin';
import MockFirebase from './MockFirebase';
import testData from '../../testData.json';

// eslint-enable
const manifestUrl = 'https://mydatasource.com';
const propsData = {
  db: MockFirebase,
  config: {
    manifestUrl,
    firebaseKeys: '',
  },
  levels: {
  },
};
const Constructor = Vue.extend(Admin);

describe('Admin.vue', () => {
  it('should have correct title', () => {
    const vm = new Constructor({
      propsData,
    }).$mount();
    expect(vm.$el.querySelector('h1').textContent).to.equal(' Admin ');
  });

  it('should have correct content in paragraphs', async () => {
    const vm = new Constructor({
      propsData,
    }).$mount();

    // we need some way to wait for the mounted method to complete...
    // these two lines are useless.
    // await flushPromises();
    // await vm.$nextTick();

    // so instead lets load sampleCounts ourselves and set the status.
    /* vm.sampleCounts = [1, 2, 3, 4, 5];
    vm.status = 'complete';
    await vm.$nextTick(); */

    await MockFirebase.ref('sampleCounts').once('value').then((snap) => {
      snap.val();
    });

    const paragraphs = vm.$el.getElementsByTagName('p');
    expect(paragraphs[0].textContent).to.equal(`You have ${Object.keys(testData.sampleCounts).length} items currently`);
    expect(paragraphs[1].textContent).to.equal(`Data Source: ${manifestUrl}`);
    expect(paragraphs[2].textContent).to.equal('Click the button below to sync your firebase database with your manifest.');
  });
});
