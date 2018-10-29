import Vue from 'vue';
import config from '@/config';
import App from '@/components/ConfigureComponents/App';
// import router from '@/router/index';


describe('ConfigureComponents/App.vue', () => {
  it('should have correct title', () => {
    const Constructor = Vue.extend(App);
    const vm = new Constructor({ propsData: { config } }).$mount();
    expect(vm.$el.querySelector('h5').textContent.indexOf('App')).to.equal(0);
  });
});
