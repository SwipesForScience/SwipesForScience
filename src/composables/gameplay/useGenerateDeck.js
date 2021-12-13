import { shuffle, remove } from "lodash";

export default function useGenerateDeck() {
  const generateRandomDeck = (allSamples, deckSize) => {
    let newDeck = [];
    newDeck = shuffle(Object.keys(allSamples.value));
    if (deckSize) {
      return newDeck.slice(0, deckSize);
    }
    return newDeck;
  };

  const getTotalSeenCountMap = sampleList => {
    const map = new Map();
    const sortedMap = new Map();
    sampleList.forEach(sample => {
      const { totalSeenCount } = sample;
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

  const generateTotalLeastSeenDeck = (sampleList, deckSize) => {
    const newDeck = [];
    const totalSeenCountMap = getTotalSeenCountMap(sampleList);
    for (const samples of totalSeenCountMap.values()) {
      newDeck.push(...shuffle(samples));
      if (newDeck.length >= deckSize) break;
    }
    return newDeck.slice(0, deckSize);
  };

  const generateLeastSeenDeck = (allSamples, userSeenSamples, deckSize) => {
    const newDeck = [];
    const allSamplesList = Object.keys(allSamples.value).map(sampleId => ({
      sampleId: sampleId,
      ...allSamples.value[sampleId],
    }));
    if (userSeenSamples.length === allSamplesList.length) {
      return generateTotalLeastSeenDeck(allSamplesList, deckSize);
    }
    const seenSamplesList = [...allSamplesList];
    const unseenSamplesList = remove(
      seenSamplesList,
      ({ sampleId }) => !userSeenSamples.includes(sampleId)
    );
    // prioritize unseen samples
    newDeck.push(...shuffle(unseenSamplesList).slice(0, deckSize));
    const remainder = deckSize - newDeck.length;
    if (remainder > 0) {
      newDeck.push(...generateTotalLeastSeenDeck(seenSamplesList, remainder));
    }
    return newDeck.map(({ sampleId }) => sampleId);
  };
  return { generateRandomDeck, generateLeastSeenDeck };
}
