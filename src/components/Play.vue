<template>
  <div>
    {{ userData.currentDeck }}
  </div>
</template>

<script>
import { getDatabase, ref, get, set, runTransaction } from "firebase/database";
import useSamples from "@/composables/gameplay/useSamples";
import useGenerateDack from "@/composables/gameplay/useGenerateDeck";
import { onMounted, ref as vueRef } from "vue";
import { shuffle } from "lodash";
export default {
  name: "Play",
  props: {
    currentUser: {
      type: Object,
    },
    userData: {
      type: Object,
    },
  },
  setup(props) {
    let { allSamples, getAllSamples } = useSamples();
    let { generateNewDeck } = useGenerateDack();
    const removeCard = () => {
      const userDeckRef = ref(
        db,
        `users/${props.currentUser.displayName}/currentDeck`
      );
      runTransaction(userDeckRef, userDeck => {
        if (userDeck) {
          userDeck.pop();
        }
        return userDeck;
      });
    };
    const db = getDatabase();

    const getRandomNewDeck = (samples, deckSize) => {
      return shuffle(samples).slice(0, deckSize + 1);
    };
    const setCurrentDeck = async () => {
      const currentDeckRef = ref(
        db,
        `users/${props.currentUser.displayName}/currentDeck`
      );
      const allSampleIds = Object.keys(allSamples.value);
      set(currentDeckRef, getRandomNewDeck(allSampleIds, 5));
    };
    onMounted(async () => {
      let newDeck;
      await getAllSamples();
      // if (
      //   !props.userData.currentDeck ||
      //   props.userData.currentDeck.length === 0
      // ) {
      newDeck = generateNewDeck(allSamples, "Random");
      console.log({ newDeck });
      // await setCurrentDeck();
      // }
    });
    return { allSamples, removeCard, setCurrentDeck };
  },
};
</script>

<style></style>
