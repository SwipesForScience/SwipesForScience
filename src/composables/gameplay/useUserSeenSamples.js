import { getDatabase, ref, get } from "firebase/database";

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

  return {
    userSeenSamples,
    getUserSeenSamples,
  };
}
