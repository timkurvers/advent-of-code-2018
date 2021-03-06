import { example, stripIndent } from '../../../utils';

export const partOne = [
  example(stripIndent`
    20
    15
    10
    5
    5
  `, 4, { total: 25 }),
];

export const partTwo = [
  example(partOne[0].input, 3, { total: 25 }),
];
