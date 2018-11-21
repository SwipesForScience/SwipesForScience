import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import Terms from '@/components/Terms';

Vue.use(BootstrapVue);

// eslint-enable
const Constructor = Vue.extend(Terms);
const propsData = {};

describe('Terms.vue', () => {
  it('should have correct title', () => {
    const vm = new Constructor({
      propsData,
    }).$mount();

    expect(vm.$el.textContent).to.equal('\n  Input your terms and conditions (e.g. a consent form) here.\n');
  });
});
