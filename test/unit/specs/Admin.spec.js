import Vue from 'vue';
import Admin from '@/components/Admin';
import flushPromises from 'flush-promises';
import firebase from 'firebase';

// const FirebaseServer = require('firebase-server');

// eslint-enable

describe('Admin.vue', () => {
  it('should have correct content in paragraphs', async () => {
    const Constructor = Vue.extend(Admin);
    const config = {
      databaseURL: 'ws://localhost:5000',
    };

    const app = firebase.initializeApp(config);
    const db = app.database();

    const vm = new Constructor({
      propsData: {
        db,
        config: {
          manifestUrl: 'https://mydatasource.com',
          firebaseKeys: config,
        },
        levels: {
        },
      },
    }).$mount();

    // we need some way to wait for the mounted method to complete...
    // these two lines are useless.
    // await flushPromises();
    // await vm.$nextTick();

    // so instead lets load sampleCounts ourselves and set the status.
    vm.sampleCounts = { a: 0, b: 0, c: 0 };
    vm.status = 'complete';
    // this doesn't work either...
    await vm.$nextTick();

    const paragraphs = vm.$el.getElementsByTagName('p');
    expect(paragraphs[0].textContent).to.equal('Data Source: https://mydatasource.com');
  });
});
