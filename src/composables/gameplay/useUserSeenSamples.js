import { getDatabase, ref, get, runTransaction } from "firebase/database";

import { ref as vueRef } from "vue";

export default function useUserSeenSamples() {
  const db = getDatabase();
  const userSeenSamples = vueRef([]);
  const getUserSeenSamples = async uid => {
    await get(ref(db, `userSeensamples/${uid}`)).then(snapshot => {
      if (snapshot.exists()) {
        const userSeenSamplesMap = snapshot.val();
        userSeenSamples.value = Object.keys(userSeenSamplesMap);
      }
    });
  };
  const updateUserSeenSamples = async (uid, sampleId) => {
    const userSeenSamplesRef = ref(db, `userSeenSamples/${uid}`);
    await runTransaction(userSeenSamplesRef, userSeenSamplesMap => {
      if (userSeenSamplesMap) {
        if (userSeenSamplesMap[sampleId]) userSeenSamplesMap[sampleId]++;
        else userSeenSamplesMap[sampleId] = 1;
        return userSeenSamplesMap;
      }
      return {
        [sampleId]: 1,
      };
    });
  };

  return {
    userSeenSamples,
    getUserSeenSamples,
    updateUserSeenSamples,
  };
}
