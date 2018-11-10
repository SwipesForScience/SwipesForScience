import Vue from 'vue';
import Login from '@/components/Login';

// eslint-enable
const Constructor = Vue.extend(Login);

describe('Login.vue', () => {
  it('should have correct title', () => {
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('h1').textContent).to.equal(' Log In ');
  });

  it('should have link to signup page', () => {
    const vm = new Constructor().$mount();
    /* eslint-disable no-useless-escape */
    expect(vm.$el.querySelector('p').textContent).to.equal(`
      Don\'t have an account? Create one`);
  });
});
