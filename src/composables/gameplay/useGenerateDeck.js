import { shuffle } from "lodash";

export default function useGenerateDeck() {
  const generateRandomDeck = ({ allSamples, deckSize }) => {
    let newDeck = [];
    newDeck = shuffle(Object.keys(allSamples));
    if (deckSize) {
      return newDeck.slice(0, deckSize);
    }
    return newDeck;
  };

  const getTotalSeenCountMap = (sampleList, allSamples) => {
    const map = new Map();
    const sortedMap = new Map();
    sampleList.forEach(sample => {
      const totalSeenCount = allSamples[sample].totalSeenCount;

      if (map.has(totalSeenCount)) {
        map.set(totalSeenCount, [...map.get(totalSeenCount), sample]);
      } else {
        map.set(totalSeenCount, [sample]);
      }
    });
    [...map.keys()]
      .sort((a, b) => a - b)
      .forEach(key => {
        sortedMap.set(key, map.get(key));
      });

    return sortedMap;
  };

  const generateTotalLeastSeenDeck = ({ allSamples, sampleIds, deckSize }) => {
    const newDeck = [];
    const totalSeenCountMap = getTotalSeenCountMap(sampleIds, allSamples);
    for (const samples of totalSeenCountMap.values()) {
      newDeck.push(...shuffle(samples));
      if (newDeck.length >= deckSize) break;
    }

    return newDeck.slice(0, deckSize);
  };

  const getUserUnseenSamples = ({ sampleIds, userSeenSamples }) => {
    if (userSeenSamples.length === sampleIds.length) {
      return [];
    }
    return sampleIds.filter(sampleId => !userSeenSamples.includes(sampleId));
  };
  const generateLeastSeenDeck = ({ allSamples, userSeenSamples, deckSize }) => {
    const sampleIds = Object.keys(allSamples);
    const userUnseenSamples = getUserUnseenSamples({
      sampleIds,
      userSeenSamples,
    });

    const remainingDeckSize = deckSize - userUnseenSamples.length;
    if (remainingDeckSize <= 0) return userUnseenSamples.slice(0, deckSize);
    const remainingDeck = generateTotalLeastSeenDeck({
      allSamples,
      sampleIds: userSeenSamples,
      remainingDeckSize,
    });

    return [...userUnseenSamples, ...remainingDeck].slice(0, deckSize);
  };

  return {
    generateRandomDeck,
    getUserUnseenSamples,
    generateTotalLeastSeenDeck,
    generateLeastSeenDeck,
  };
}
