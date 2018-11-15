import Vue from 'vue';
import config from '@/config';
import Widget from '@/components/ConfigureComponents/Widget';
import router from '@/router';

describe('ConfigureComponents/Widget.vue', () => {
  it('should have correct title', () => {
    const Constructor = Vue.extend(Widget);
    const vm = new Constructor({
      propsData: {
        config,
      },
      router,
    }).$mount();
    expect(vm.$el.querySelector('h5').textContent.indexOf('Widget')).to.equal(0);
  });
});
