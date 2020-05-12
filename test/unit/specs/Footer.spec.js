import Vue from 'vue';
import Footer from '@/components/Footer';
import router from '@/router';

// eslint-enable
const Constructor = Vue.extend(Footer);

describe('Footer.vue', () => {
  it('should have correct footer content', () => {
    const vm = new Constructor({
      propsData: {
        config: {
          iconAttribute: {
            url: '',
            name: 'name',
          },
        },
      },
      router,
    }).$mount();
    const links = vm.$el.getElementsByTagName('a');

    expect(links).to.have.lengthOf(6);
    expect(links[0].textContent).to.equal('Home');
    expect(links[1].textContent).to.equal('Game');
    expect(links[2].textContent).to.equal('Chat');
    expect(links[3].textContent).to.equal('Leaderboard');
    expect(links[4].textContent).to.equal('About');
    expect(links[5].textContent).to.equal('Contact us');
  });
});
