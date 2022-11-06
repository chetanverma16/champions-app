import { Character } from "../types";

export const calculateValue = (arr: Character[], ability: number) => {
  return Math.round(
    arr.reduce((acc, curr) => acc + curr.abilities[ability].abilityScore, 0) /
      arr.length
  );
};
