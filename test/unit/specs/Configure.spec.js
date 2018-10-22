import Vue from 'vue';
import config from '@/config';
import Configure from '@/components/Configure';

describe('Configure.vue', () => {
  it('should have correct title', () => {
    const Constructor = Vue.extend(Configure);
    const vm = new Constructor({ propsData: { config } }).$mount();
    expect(vm.$el.querySelector('h3').textContent.indexOf('Swipes for Science')).to.equal(1);
  });
});
