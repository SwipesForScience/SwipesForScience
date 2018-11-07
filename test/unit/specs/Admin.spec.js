import Vue from 'vue';
import Admin from '@/components/Admin';
import Database from '../DatabaseMock';

const data = [{
  key: 1,
}, {
  key: 2,
}];
const db = new Database(data);
const manifestUrl = 'dummy_manifest_url';
const propsData = {
  db,
  config: {
    manifestUrl,
  },
  levels: {
  },
};

describe('Admin.vue', () => {
  it('should have correct title', () => {
    const Constructor = Vue.extend(Admin);
    const vm = new Constructor({
      propsData,
    }).$mount();
    expect(vm.$el.querySelector('h1').textContent).to.equal(' Admin ');
  });

  it('should have correct content in paragraphs', (done) => {
    const Constructor = Vue.extend(Admin);
    const vm = new Constructor({
      propsData,
    }).$mount();
    setTimeout(() => {
      const paragraphs = vm.$el.getElementsByTagName('p');
      expect(paragraphs[0].textContent).to.equal(`You have ${data.length} items currently`);
      expect(paragraphs[1].textContent).to.equal(`Data Source: ${manifestUrl}`);
      expect(paragraphs[2].textContent).to.equal('Click the button below to sync your firebase database with your manifest.');
      done();
    }, 500);
  });
});
