import _ from 'lodash';
import config from '@/config';

describe('config.js', () => {
  const requiredKeys = ['needsTutorial',
    'manifestUrl',
    'widgetType',
    'widgetProperties',
    'betaMode',
    'levels',
    'iconAttribute',
    'firebaseKeys',
    'home',
    'play',
    'chats',
    'profile',
    'tutorial',
    'app'];
  const keys = Object.keys(config);
  _.map(requiredKeys, (k) => {
    it(`should have the ${k} key`, () => {
      const inList = keys.indexOf(k) > -1;
      expect(inList).to.equal(true);
    });
  });

  it('widgetType should be a valid widget', () => {
    const widgetKeys = ['ImageSplat', 'ImageSwipe',
      'ImageSoundSwipe', 'PubMedNLP', 'TemplateWidget',
      'ImageSwipeChoices', 'TextTagger',
      'BranchingTemplateWidget'];
    const inList = widgetKeys.indexOf(config.widgetType) > -1;
    expect(inList).to.equal(true);
  });

  it('manifestUrl must start with http', () => {
    expect(config.manifestUrl.startsWith('http')).to.equal(true);
  });

  it('manifestUrl must end with json', () => {
    // phantomJS doesn't support endsWith for whatever reason
    // maybe https://github.com/mattkrick/cashay/issues/136 ?
    expect(config.manifestUrl.indexOf('.json')).to.equal(config.manifestUrl.length - 5);
  });
});
