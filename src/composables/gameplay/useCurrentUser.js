import { getDatabase, ref, runTransaction, update } from "firebase/database";

export default function useCurrentUser() {
  const db = getDatabase();

  const updateUserCumulativeScore = async (userId, pointsEarned) => {
    if (pointsEarned === 0) return;
    const userRef = ref(db, `users/${userId}`);
    await runTransaction(userRef, currentUser => {
      if (currentUser && typeof currentUser.cumulativeScore === "number") {
        currentUser.cumulativeScore += pointsEarned;
      }
      return currentUser;
    });
  };
  const updateTutorialStatus = async userId => {
    const userRef = ref(db, `users/${userId}`);
    return update(userRef, { taken_tutorial: true });
  };

  return {
    updateUserCumulativeScore,
    updateTutorialStatus,
  };
}
