import Vue from 'vue';
import config from '@/config';
import Tutorial from '@/components/ConfigureComponents/Tutorial';
// import router from '@/router/index';

describe('ConfigureComponents/Tutorial.vue', () => {
  it('should have correct title', () => {
    const Constructor = Vue.extend(Tutorial);
    const vm = new Constructor({ propsData: { config, userInfo: {} } }).$mount();
    expect(vm.$el.querySelector('h5').textContent.indexOf('Tutorial')).to.equal(0);
  });
});
