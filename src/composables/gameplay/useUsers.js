import { getDatabase, ref, runTransaction } from "firebase/database";

export default function useUserScore() {
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

  return {
    updateUserCumulativeScore,
  };
}
