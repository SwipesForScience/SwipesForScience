import {
  getDatabase,
  ref,
  orderByChild,
  query,
  onValue,
  get,
  child,
} from "firebase/database";
import { computed, ref as vueRef, toRaw } from "vue";

export default function useSamples() {
  const db = getDatabase();
  const allSamples = vueRef([]);
  const leastSeenSamplesList = vueRef(null);
  const allSampleIds = computed(() => {
    return Object.keys(allSamples.value);
  });

  const getAllSamples = async () => {
    await get(child(ref(db), "samples")).then(snapshot => {
      if (snapshot.exists()) {
        allSamples.value = snapshot.val();
      }
    });
  };

  const getSampleListByLeastSeen = async () => {
    const mostSeenRef = query(
      ref(db, "samples"),
      orderByChild("totalSeenCount")
    );
    return new Promise(resolve => {
      onValue(
        mostSeenRef,
        snapshot => {
          const allSamplesByLeastSeen = [];
          snapshot.forEach(child => {
            allSamplesByLeastSeen.push({ ...child.val(), sampleId: child.key });
          });
          leastSeenSamplesList.value = allSamplesByLeastSeen;
          resolve();
        },
        {
          onlyOnce: true,
        }
      );
    });
  };
  const removeSampleIds = sampleIds => {
    toRaw(allSampleIds).filter(sampleId => !sampleIds.includes(sampleId));
  };
  return {
    allSamples,
    allSampleIds,
    getAllSamples,
    getSampleListByLeastSeen,
    leastSeenSamplesList,
    removeSampleIds,
  };
}
