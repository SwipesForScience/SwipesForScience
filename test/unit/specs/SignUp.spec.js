import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import SignUp from '@/components/SignUp';
import router from '@/router';
/* eslint-disable no-unused-vars */
import MockFirebase from '../../MockFirebase';

Vue.use(BootstrapVue);

// eslint-enable
const Constructor = Vue.extend(SignUp);
const propsData = {
  config: {
    needsTutorial: true,
  },
};

describe('SignUp.vue', () => {
  it('should have correct title', () => {
    const vm = new Constructor({
      propsData,
      router,
    }).$mount();

    expect(vm.$el.querySelector('h1').textContent).to.equal(' Sign Up ');
  });

  it('should have link to login page', () => {
    const vm = new Constructor({
      propsData,
      router,
    }).$mount();

    expect(vm.$el.querySelector('p').textContent).to.equal('\n        Already have an account? Log In');
  });

  it('should have correct form', () => {
    const vm = new Constructor({
      propsData,
      router,
    }).$mount();
    const buttons = vm.$el.getElementsByTagName('button');

    expect(buttons[1].textContent).to.equal('I Consent');
    expect(buttons[2].textContent).to.equal(' Open Consent Form ');
    expect(buttons[3].textContent).to.equal('Submit');
    expect(vm.$el.getElementsByTagName('input').length).to.equal(4);
  });

  it('should have disabled submit button if form is not validated', () => {
    const vm = new Constructor({
      propsData,
      router,
    }).$mount();

    expect(vm.$el.getElementsByTagName('button')[3].disabled).to.equal(true);
  });

  it('should have submit button clickable if form is validated', async () => {
    const vm = new Constructor({
      propsData,
      router,
    }).$mount();

    vm.form = {
      consented: true,
      username: 'john',
      password: '12345678',
      password2: '12345678',
    };
    await vm.$nextTick();
    const button = vm.$el.getElementsByTagName('button')[2];
    expect(button.disabled).to.equal(false);

    const clickEvent = new window.Event('click');
    button.dispatchEvent(clickEvent);

    /* eslint-disable no-underscore-dangle */
    vm._watcher.run();
  });
});
