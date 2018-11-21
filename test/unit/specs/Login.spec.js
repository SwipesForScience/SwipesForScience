import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import Login from '@/components/Login';
import router from '@/router';
/* eslint-disable no-unused-vars */
import MockFirebase from '../../MockFirebase';

Vue.use(BootstrapVue);

// eslint-enable
const Constructor = Vue.extend(Login);

describe('Login.vue', () => {
  it('should have correct title', () => {
    const vm = new Constructor({
      router,
    }).$mount();

    expect(vm.$el.querySelector('h1').textContent).to.equal(' Log In ');
  });

  it('should have link to signup page', () => {
    const vm = new Constructor({
      router,
    }).$mount();
    /* eslint-disable no-useless-escape */
    expect(vm.$el.querySelector('p').textContent).to.equal(`
      Don\'t have an account? Create one`);
  });

  it('should have login button', async () => {
    const vm = new Constructor({
      router,
    }).$mount();

    vm.form = {
      email: 'user@gmail.com',
      password: '12345678',
    };
    await vm.$nextTick();
    expect(vm.$el.querySelector('button').textContent).to.equal('Submit');

    const button = vm.$el.querySelector('button');
    const clickEvent = new window.Event('click');
    button.dispatchEvent(clickEvent);

    /* eslint-disable no-underscore-dangle */
    vm._watcher.run();
  });
});
