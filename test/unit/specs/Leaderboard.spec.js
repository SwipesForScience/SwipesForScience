import Vue from 'vue';
import Leaderboard from '@/components/Leaderboard';

// eslint-enable
const Constructor = Vue.extend(Leaderboard);
const propsData = {
  levels: {},
  allUsers: {
    key: 'key-1',
    item: {
      level: 'level-1',
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
});
