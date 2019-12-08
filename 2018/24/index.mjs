import { bisect, solution } from '../../utils';

import Reindeer from './Reindeer';

export const partOne = solution((input) => {
  const reindeer = new Reindeer(input);

  let winner;
  do {
    winner = reindeer.step();
  } while (!winner);

  return winner.units;
});

export const partTwo = solution((input) => {
  const outcomes = new Map();

  const optimalBonusDamage = bisect(0, 10000, 1, (bonusDamage) => {
    const reindeer = new Reindeer(input);
    reindeer.immuneSystem.bonusDamage = bonusDamage;

    let winner;
    do {
      winner = reindeer.step();
    } while (!winner);

    outcomes.set(bonusDamage, winner);
    return winner === reindeer.immuneSystem;
  });
  return outcomes.get(optimalBonusDamage + 1).units;
});
