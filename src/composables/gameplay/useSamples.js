import { getDatabase, ref, get, child } from "firebase/database";
import { computed, ref as vueRef, toRaw } from "vue";

export default function useSamples() {
  const db = getDatabase();
  const allSamples = vueRef([]);

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

  const removeSampleIds = sampleIds => {
    toRaw(allSampleIds).filter(sampleId => !sampleIds.includes(sampleId));
  };

  return {
    allSamples,
    allSampleIds,
    getAllSamples,
    removeSampleIds,
  };
}
