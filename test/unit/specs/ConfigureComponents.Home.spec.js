import Vue from 'vue';
import config from '@/config';
import Home from '@/components/ConfigureComponents/Home';

describe('ConfigureComponents/Home.vue', () => {
  it('should have correct title', () => {
    const Constructor = Vue.extend(Home);
    const vm = new Constructor({ propsData: { config } }).$mount();
    expect(vm.$el.querySelector('h5').textContent.indexOf('Home')).to.equal(0);
  });
});
