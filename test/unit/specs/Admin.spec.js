import Vue from 'vue';
import Admin from '@/components/Admin';

const MockReference = require('firebase-mock/src/firebase');

const firebaseRef = new MockReference();
firebaseRef.push({
  sampleCounts: 5,
});
firebaseRef.autoFlush();

describe('Admin.vue', () => {
  it('should have correct title', () => {
    const Constructor = Vue.extend(Admin);
    const vm = new Constructor({
      propsData: {
        db: firebaseRef,
        config: {
          manifestUrl: '',
        },
        levels: {
        },
      },
    }).$mount();
    expect(vm.$el.querySelector('h1').textContent).to.equal(' Admin ');
  });
});
