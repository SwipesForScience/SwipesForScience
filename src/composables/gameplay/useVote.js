import { getDatabase, ref, push, set } from "firebase/database";

export default function useVote() {
  const db = getDatabase();
  const sendVote = vote => {
    const votesListRef = ref(db, "votes");
    const newVoteRef = push(votesListRef);
    set(newVoteRef, vote);
  };
  return { sendVote };
}
