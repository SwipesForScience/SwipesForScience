import Vue from 'vue';
import _ from 'lodash';
import BootstrapVue from 'bootstrap-vue';
import config from '@/config';
import FirebaseKeys from '@/components/ConfigureComponents/FirebaseKeys';
// import router from '@/router/index';
Vue.use(BootstrapVue);

describe('ConfigureComponents/FirebaseKeys.vue', () => {
  it('should have correct title', () => {
    const Constructor = Vue.extend(FirebaseKeys);
    const vm = new Constructor({ propsData: { config } }).$mount();
    expect(vm.$el.querySelector('h5').textContent.indexOf('Setting up your database')).to.equal(0);
  });

  const Constructor = Vue.extend(FirebaseKeys);
  const vm = new Constructor({ propsData: { config } }).$mount();
  vm.fkeys = `
  <script src="https://www.gstatic.com/firebasejs/5.5.5/firebase.js"></script>
  <script>
    // Initialize Firebase
    var config = {
      apiKey: "something",
      authDomain: "somethinglese",
      databaseURL: "https://somethingfirebaseio.com",
      projectId: "something",
      storageBucket: "something.appspot.com",
      messagingSenderId: "123456789"
    };
    firebase.initializeApp(config);
  </script>
  `;

  const firebaseKeys = {
    apiKey: 'something',
    authDomain: 'somethinglese',
    databaseURL: 'https://somethingfirebaseio.com',
    projectId: 'something',
    storageBucket: 'something.appspot.com',
    messagingSenderId: '123456789',
  };

  _.map(firebaseKeys, (val, key) => {
    it(`should parse firebase key: ${key} correctly`, () => {
      const parsedKeys = vm.parseFirebaseKeys();
      expect(parsedKeys[key]).to.equal(val);
    });
  });
});
