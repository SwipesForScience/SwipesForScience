import {
  getDatabase,
  ref,
  get,
  set,
  push,
  onValue,
  update,
} from "firebase/database";
import { ref as vueRef } from "vue";

export default function useCurrentGame() {
  const db = getDatabase();
  const currentGame = vueRef(null);
  const createNewGame = async (newDeck, userId) => {
    const gamesRef = ref(db, "games");
    const newGameRef = await push(gamesRef);
    const userRef = ref(db, `users/${userId}`);
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

  const watchCurrentGame = async gameId => {
    const currentGameRef = ref(db, `games/${gameId}`);
    currentGame.value = await get(currentGameRef).then(snapshot => {
      if (snapshot.exists()) {
        return snapshot.val();
      } // error handling if current game doesn't exist
    });
    return onValue(currentGameRef, snapshot => {
      currentGame.value = snapshot.val();
    });
  };
  return {
    currentGame,
    createNewGame,
    watchCurrentGame,
  };
}
