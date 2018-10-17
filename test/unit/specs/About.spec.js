import Vue from 'vue';
import About from '@/components/About';

describe('About.vue', () => {
  it('should have correct title', () => {
    const Constructor = Vue.extend(About);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('h1').textContent).to.equal(' About ');
  });

  it('should have correct number of paragraphs', () => {
    const Constructor = Vue.extend(About);
    const vm = new Constructor().$mount();
    expect(vm.$el.getElementsByTagName('p')).to.have.lengthOf(2);
  });

  it('should have correct content in paragraphs', () => {
    const Constructor = Vue.extend(About);
    const vm = new Constructor().$mount();
    const paragraphs = vm.$el.getElementsByTagName('p');
    expect(paragraphs[0].textContent).to.equal('\n      You get points for each sample you annotate.\n    ');
    expect(paragraphs[1].textContent).to.equal('\n      You can unlock the following animals based on the number of points you have:\n    ');
  });

  it('should have correct default data', () => {
    const defaultData = About.data();
    expect(defaultData.count).to.equal(1);
  });
});
