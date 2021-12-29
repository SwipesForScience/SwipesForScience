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

export default function useCurrentGame() {
  const db = getDatabase();
  const currentGame = vueRef(null);
  const { generateLeastSeenDeck } = useGenerateDeck();
  const { userSeenSamples, getUserSeenSamples } = useUserSeenSamples();
  const { getSampleListByLeastSeen, leastSeenSamplesList } = useSamples();

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
    await getSampleListByLeastSeen();
    const newDeck = await generateLeastSeenDeck(
      leastSeenSamplesList,
      toRaw(userSeenSamples.value),
      10
    );
    await set(newGameRef, {
      userId,
      sampleIds: newDeck,
      score: 0,
      currentSampleIndex: 0,
      completed: false,
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
