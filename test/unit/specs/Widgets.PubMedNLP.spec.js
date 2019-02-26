import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import PubMedNLP from '@/components/Widgets/PubMedNLP';

Vue.use(BootstrapVue);

// eslint-enable
const Constructor = Vue.extend(PubMedNLP);
const propsData = {
  widgetPointer: '28365419',
  widgetProperties: {
    template: 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id={0}&tool=appstract&email=keshavan@berkeley.edu&retmode=xml',
  },
  userSettings: {},
  widgetSummary: {},
  playMode: 'play',
  tutorialStep: 0,
};
const propsData1 = {
  widgetPointer: '28365419',
  widgetProperties: {
    template: 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id={0}&tool=appstract&email=keshavan@berkeley.edu&retmode=xml',
  },
  userSettings: {},
  widgetSummary: {},
  playMode: '',
  tutorialStep: 0,
};

describe('widgets/PubMedNLP.vue', () => {
  it('should run all its tests and return 1', () => {
    const vm = new Constructor({
      propsData,
    }).$mount();

    expect(vm.test()).to.equal(1);
  });
  it('should run all its tests in tutorial mode and return 1', () => {
    const vm = new Constructor({
      propsData: propsData1,
    }).$mount();

    expect(vm.test()).to.equal(1);
  });
});
