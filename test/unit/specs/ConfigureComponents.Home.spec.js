import Vue from 'vue';
import config from '@/config';
import Home from '@/components/ConfigureComponents/Home';
// import router from '@/router/index';

describe('ConfigureComponents/Home.vue', () => {
  it('should have correct title', () => {
    const Constructor = Vue.extend(Home);
    const vm = new Constructor({ propsData: { config, userInfo: {} } }).$mount();
    expect(vm.$el.querySelector('h5').textContent.indexOf('Home')).to.equal(0);
  });
});
