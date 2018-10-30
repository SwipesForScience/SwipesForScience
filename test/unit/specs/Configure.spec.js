import Vue from 'vue';
import config from '@/config';
import Configure from '@/components/Configure';
// import router from '@/router/index';

describe('Configure.vue', () => {
  it('should have correct title', () => {
    const Constructor = Vue.extend(Configure);
    const vm = new Constructor({
//      router,
      propsData: {
        config,
        userInfo: {},
        db: {},
        configurationState: { step: 0 },
      },
    }).$mount();
    expect(vm.$el.querySelector('h3').textContent.indexOf('Swipes for Science')).to.equal(1);
  });
});
