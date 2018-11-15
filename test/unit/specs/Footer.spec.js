import Vue from 'vue';
import Footer from '@/components/Footer';
import router from '@/router';

// eslint-enable
const Constructor = Vue.extend(Footer);

describe('Footer.vue', () => {
  it('should have correct table content', () => {
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
    const tds = vm.$el.getElementsByTagName('td');

    expect(tds).to.have.lengthOf(2);
    expect(tds[0].textContent).to.equal('About ');
    expect(tds[1].textContent).to.equal('\n          icons on this site are from name\n          and illustrations are from undraw.co');
  });
});
