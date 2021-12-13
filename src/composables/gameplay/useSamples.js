import {
  getDatabase,
  ref,
  orderByChild,
  query,
  onValue,
} from "firebase/database";
import { computed, ref as vueRef, toRaw } from "vue";

export default function useSamples() {
  const db = getDatabase();
  const allSamplesList = vueRef([]);
  const allSampleIds = computed(() => {
    return Object.keys(allSamples.value);
  });

  const getAllSamplesByLeastSeen = async () => {
    const mostSeenRef = query(
      ref(db, "samples"),
      orderByChild("totalSeenCount")
    );
    onValue(
      mostSeenRef,
      snapshot => {
        const allSamplesByLeastSeen = [];
        snapshot.forEach(child => {
          allSamplesByLeastSeen.push({ ...child.val(), sampleId: child.key });
        });
        allSamples.value = allSamplesByLeastSeen;
      },
      {
        onlyOnce: true,
      }
    );
  };
  const removeSampleIds = sampleIds => {
    toRaw(allSampleIds).filter(sampleId => !sampleIds.includes(sampleId));
  };
  return {
    allSamplesList,
    allSampleIds,
    getAllSamplesByLeastSeen,
    removeSampleIds,
  };
}
