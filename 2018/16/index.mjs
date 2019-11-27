import { day } from '..';

import Sample from './Sample';
import operations from './operations';
import puzzleInput from './input';

const parse = (input) => {
  const [sampling, program] = input.split('\n\n\n\n');
  const samples = sampling.split('\n\n').map(definition => new Sample(definition));
  return { program, samples };
};

day(16).part(1).feed(puzzleInput).solution((input) => {
  const { samples } = parse(input);
  return samples.filter(sample => (
    sample.probe().length >= 3
  )).length;
});

day(16).part(2).feed(puzzleInput).solution((input) => {
  const { program, samples } = parse(input);

  const remaining = new Set(samples);
  while (remaining.size) {
    for (const sample of remaining) {
      const candidates = sample.probe().filter(operation => (
        operation.opcode === undefined
      ));
      if (candidates.length === 1) {
        const [operation] = candidates;
        operation.opcode = sample.opcode;
      }
      if (candidates.length <= 1) {
        remaining.delete(sample);
      }
    }
  }

  const data = [0, 0, 0, 0];
  const lines = program.split('\n');
  for (const line of lines) {
    const [opcode, inputA, inputB, outputC] = line.match(/\d+/g).map(Number);
    const operation = operations.find(candidate => candidate.opcode === opcode);
    operation(data, inputA, inputB, outputC);
  }
  return data[0];
});
