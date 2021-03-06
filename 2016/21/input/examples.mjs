import { example } from '../../../utils';

export const partOne = [
  example(`swap position 4 with position 0
swap letter d with letter b
reverse positions 0 through 4
rotate left 1 step
move position 1 to position 4
move position 3 to position 0
rotate based on position of letter b
rotate based on position of letter d`, 'decab', { password: 'abcde' }),
];

export const partTwo = [
  example(partOne[0].input, 'abcde', { scrambled: 'decab' }),
];
