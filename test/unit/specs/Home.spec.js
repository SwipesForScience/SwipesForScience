import Vue from 'vue';
import Home from '@/components/Home';

// eslint-enable
const Constructor = Vue.extend(Home);
const propsData = {
  config: {
    home: {
      title: 'sample title',
      tagline: 'sample tagline',
    },
  },
};

describe('Home.vue', () => {
  it('should have correct title', () => {
    const vm = new Constructor({
      propsData,
    }).$mount();
    expect(vm.$el.querySelector('h1').textContent).to.equal(propsData.config.home.title);
  });

  it('should have correct tagline', () => {
    const vm = new Constructor({
      propsData,
    }).$mount();
    const paragraphs = vm.$el.getElementsByTagName('p');
    expect(paragraphs[0].textContent).to.equal(`\n      ${propsData.config.home.tagline}\n    `);
  });
});
