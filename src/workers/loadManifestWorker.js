import _ from 'lodash';
import { db } from '../firebaseConfig';

// eslint-disable-next-line
onmessage = function(e) {
  const entries = e.data;
  const filtered = _.filter(entries[0], m => entries[1].indexOf(m) < 0);
  const target = filtered.length;
  let current = 0;
  _.map(filtered,
    (key) => {
      db.ref('sampleCounts').child(key).set(0, () => {
        current += 1;
        if (current === target) {
            // We then have treated all the objects
          postMessage('done');
        }
        postMessage('progress');
      });
    });
};
