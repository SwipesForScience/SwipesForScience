import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import Unauthorized from '@/components/Unauthorized';

Vue.use(BootstrapVue);

// eslint-enable
const Constructor = Vue.extend(Unauthorized);
const propsData = {};

describe('Unauthorized.vue', () => {
  it('should have correct title', () => {
    const vm = new Constructor({
      propsData,
    }).$mount();

    expect(vm.$el.querySelector('h1').textContent).to.equal(' Oops! You are not authorized ');
  });

  it('should have correct message', () => {
    const vm = new Constructor({
      propsData,
    }).$mount();

    expect(vm.$el.querySelector('p').textContent).to.equal(' Please contact the sysadmin to get access to this page ');
  });
});
