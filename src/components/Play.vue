<template>
  <div>
    {{ userData.currentDeck }}

    <button @click="upTheScore">Does this do the realtime binding?</button>
  </div>
</template>

<script>
import { getDatabase, ref, get, set, runTransaction } from "firebase/database";
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
    const upTheScore = () => {
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
    let allSamples = [];

    const getAllSamples = async () => {
      allSamples = await get(ref(db, "samples")).then(snapshot => {
        if (snapshot.exists()) {
          return snapshot.val();
        }
      });
    };
    const getRandomNewDeck = (samples, deckSize) => {
      // only card Id
      return shuffle(samples).slice(0, deckSize + 1);
    };
    const setCurrentDeck = async () => {
      const currentDeckRef = ref(
        db,
        `users/${props.currentUser.displayName}/currentDeck`
      );
      set(currentDeckRef, getRandomNewDeck(allSamples, 10));
    };
    onMounted(async () => {
      await getAllSamples();
      if (
        !props.userData.currentDeck ||
        props.userData.currentDeck.length === 0
      ) {
        setCurrentDeck();
      }
    });
    return { allSamples, upTheScore, setCurrentDeck };
  },
};
</script>

<style></style>
