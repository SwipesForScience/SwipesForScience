import Vue from 'vue';
import About from '@/components/About';

// Here are some badges we set
import jelly from '../../../src/assets/badges/jelly.svg';
import dolphin from '../../../src/assets/badges/dolphin.svg';
import orca from '../../../src/assets/badges/orca.svg';
import narwhal from '../../../src/assets/badges/narwhal.svg';
import bluewhale from '../../../src/assets/badges/blueWhale_or_baleen.svg';

// Here are the grayed out versions of the badges
import jellyGrey from '../../../src/assets/badges/jelly_gray.svg';
import dolphinGrey from '../../../src/assets/badges/dolphin_gray.svg';
import orcaGrey from '../../../src/assets/badges/orca_gray.svg';
import narwhalGrey from '../../../src/assets/badges/narwhal_gray.svg';
import bluewhaleGrey from '../../../src/assets/badges/blueWhale_or_baleen_gray.svg';

function getRenderedHtml(Component, propsData) {
  const Constructor = Vue.extend(Component);
  const vm = new Constructor({ propsData }).$mount();
  return vm.$el;
}

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

  it('should render the levels correctly', () => {
    const levels = {
      0: {
        level: 0,
        min: 0,
        max: 100,
        character: null,
        img: null,
        img_grey: null,
      },
      1: {
        level: 1,
        min: 101,
        max: 750,
        character: 'jelly',
        img: jelly,
        img_grey: jellyGrey,
      },
    };
    const html = getRenderedHtml(About, { levels });
    expect(html.getElementsByClassName('row')[0].textContent).to.include(levels[1].min);
    expect(html.getElementsByClassName('row')[0].textContent).to.include(levels[1].level);
  });
});
