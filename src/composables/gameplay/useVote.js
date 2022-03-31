import {
  getDatabase,
  ref,
  push,
  set,
  get,
  query,
  orderByChild,
  equalTo,
} from "firebase/database";

export default function useVote() {
  const db = getDatabase();
  const sendVote = vote => {
    const votesListRef = ref(db, "votes");
    const newVoteRef = push(votesListRef);
    set(newVoteRef, vote);
  };
  const getUserVotes = async userId => {
    const votesListRef = ref(db, "votes");
    const userVotesRef = query(
      votesListRef,
      orderByChild("userId"),
      equalTo(userId)
    );
    return await get(userVotesRef).then(snapshot => {
      return snapshot.val();
    });
  };
  return { sendVote, getUserVotes };
}
