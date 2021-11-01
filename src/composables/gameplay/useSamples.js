import { getDatabase, ref, get, onMounted } from "firebase/database";
import { ref as vueRef } from "vue";

export default function useSamples() {
  const db = getDatabase();
  const allSamples = vueRef([]);
  const getAllSamples = async () => {
    await get(ref(db, "samples")).then(snapshot => {
      if (snapshot.exists()) {
        allSamples.value = snapshot.val();
      }
    });
  };

  return {
    allSamples,
    getAllSamples,
  };
}
