import { getDatabase, ref, get } from "firebase/database";
import { shuffle } from "lodash";
import { ref as vueRef, toRaw } from "vue";

export default function useGenerateDeck() {
  const generateNewDeck = (allSamples, shufflingMethod, deckSize) => {
    let newDeck = [];
    if (shufflingMethod === "Random") {
      newDeck = shuffle(Object.keys(toRaw(allSamples.value)));
    }
    if (deckSize) {
      newDeck = newDeck.slice(0, deckSize);
    }
    return newDeck;
  };
  const getCurrentDeck = async userData => {};

  return { generateNewDeck };
}
