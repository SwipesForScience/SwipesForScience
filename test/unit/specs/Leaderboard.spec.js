import Vue from 'vue';
import Leaderboard from '@/components/Leaderboard';

// eslint-enable
const Constructor = Vue.extend(Leaderboard);
const propsData = {
  levels: {
    sample_level: {
      img: 'http://www.domain.com/sample_image_url',
    },
  },
  allUsers: {
    item: {
      level: 'sample_level',
    },
  },
};

describe('Leaderboard.vue', () => {
  it('should have correct title', () => {
    const vm = new Constructor({
      propsData,
    }).$mount();

    expect(vm.$el.querySelector('h1').textContent).to.equal('Leaderboard');
  });

  it('should have correct image path', () => {
    const vm = new Constructor({
      propsData,
    }).$mount();

    expect(vm.$el.querySelector('img').src).to.equal(propsData.levels.sample_level.img);
  });
});
