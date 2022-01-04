import {
  getDatabase,
  ref,
  get,
  set,
  push,
  onValue,
  update,
} from "firebase/database";
import { ref as vueRef, toRaw } from "vue";
import useGenerateDeck from "@/composables/gameplay/useGenerateDeck";
import useUserSeenSamples from "@/composables/gameplay/useUserSeenSamples";
import useSamples from "@/composables/gameplay/useSamples";

export default function useCurrentGame(config) {
  const db = getDatabase();
  const currentGame = vueRef(null);
  const { generateLeastSeenDeck, generateRandomDeck } = useGenerateDeck();
  const { userSeenSamples, getUserSeenSamples } = useUserSeenSamples();
  const { getAllSamples, allSamples } = useSamples();

  const getGameById = async gameId => {
    const gameRef = ref(db, `games/${gameId}`);
    return await get(gameRef).then(snapshot => {
      if (snapshot.exists()) {
        return snapshot.val();
      }
    });
  };

  const watchCurrentGame = async gameId => {
    const currentGameRef = ref(db, `games/${gameId}`);
    currentGame.value = await get(currentGameRef).then(snapshot => {
      if (snapshot.exists()) {
        return snapshot.val();
      }
    });
    return onValue(currentGameRef, snapshot => {
      currentGame.value = snapshot.val();
    });
  };

  const createNewGame = async userId => {
    const gamesRef = ref(db, "games");
    const newGameRef = await push(gamesRef);
    const userRef = ref(db, `users/${userId}`);
    await getUserSeenSamples(userId);

    await getAllSamples();

    let newDeck = [];

    if (config.shufflingMethod === "leastSeen") {
      newDeck = await generateLeastSeenDeck({
        allSamples: toRaw(allSamples.value),
        userSeenSamples: toRaw(userSeenSamples.value),
        deckSize: config.deckSize,
      });
    } else {
      newDeck = await generateRandomDeck({
        allSamples: toRaw(allSamples.value),
        deckSize: config.deckSize,
      });
    }

    await set(newGameRef, {
      userId,
      sampleIds: newDeck,
      score: 0,
      currentSampleIndex: 0,
    });
    const updates = {};
    updates["/currentGameId"] = newGameRef.key;
    await update(userRef, updates);
  };

  const completeGame = async gameId => {
    const currentGameRef = ref(db, `games/${gameId}`);
    await update(currentGameRef, { completed: true });
  };

  return {
    currentGame,
    createNewGame,
    watchCurrentGame,
    completeGame,
    getGameById,
  };
}
