import _ from 'lodash';
import firebase from 'firebase';

// eslint-disable-next-line
onmessage = function(e) {
  const entries = e.data;
  const firebaseKeys = entries[2];
  firebase.initializeApp(firebaseKeys);
  const db = firebase.database();
  const filtered = _.filter(entries[0], m => entries[1].indexOf(m) < 0);
  const target = filtered.length;
  let current = 0;
  if (!target) {
    postMessage('done');
  }
  _.map(filtered,
    (key) => {
      db.ref('sampleCounts').child(key).set(0).then(() => {
        current += 1;
        if (current === target) {
            // We then have treated all the objects
          postMessage('done');
        }
        postMessage('progress');
      })
      .catch(() => {
        postMessage('error');
      });
    });
};
