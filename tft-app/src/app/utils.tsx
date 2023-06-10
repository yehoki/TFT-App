// Helper functions

export const elimDuplicateMatchIds = (matchArray: string[]): string[] => {
  // [id1, id2, id3]
  let matchHashMap = new Map<string, number>();
  let uniqueMatches: string[] = [];
  matchArray.forEach((match) => {
    if (!matchHashMap.has(match)) {
      matchHashMap.set(match, 1);
      uniqueMatches.push(match);
    }
  });
  return uniqueMatches;
};
