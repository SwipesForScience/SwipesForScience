import Vue from 'vue';
import Admin from '@/components/Admin';

const MockReference = require('firebase-mock/src/firebase');

// const firebaseRef = new MockReference();
// firebaseRef.set({
//   sampleCounts: 5,
// });
// firebaseRef.flush();

describe('Admin.vue', () => {
  let firebaseRef;
  beforeEach(() => {
    firebaseRef = new MockReference();
    firebaseRef.set({
      sampleCounts: 5,
    });
    firebaseRef.autoFlush();
  });

  it('should have correct content in paragraphs', () => {
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
    const paragraphs = vm.$el.getElementsByTagName('p');
    expect(paragraphs[0].textContent).to.equal('You have 5 items currently');
  });
});
