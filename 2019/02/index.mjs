/* eslint-disable consistent-return */

import { range, solution } from '../../utils';

import Program from './Program';

export const partOne = solution((input, isExample) => {
  const program = Program.from(input);
  if (!isExample) {
    program.override({ noun: 12, verb: 2 });
  }
  program.run();
  return program.memory[0];
});

export const partTwo = solution((input) => {
  const program = Program.from(input);
  for (const noun of range({ end: 99 })) {
    for (const verb of range({ end: 99 })) {
      program.override({ noun, verb });
      program.run();
      if (program.memory[0] === 19690720) {
        return 100 * noun + verb;
      }
    }
  }
});
