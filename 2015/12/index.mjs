import {
  flatMap, identity, isNumber, isPrimitive, solution, sum,
} from '../../utils';

const parse = input => JSON.parse(input);

const collect = (data, filter = identity) => {
  if (isNumber(data)) {
    return data;
  }

  if (isPrimitive(data)) {
    return 0;
  }

  if (data instanceof Array) {
    return flatMap(data, value => collect(value, filter));
  }

  const values = Object.values(data);
  if (!filter(values)) {
    return [];
  }
  return flatMap(values, value => collect(value, filter));
};

export const partOne = solution((input) => {
  const data = parse(input);
  return sum(collect(data));
});

export const partTwo = solution((input) => {
  const data = parse(input);
  return sum(collect(data, values => !values.includes('red')));
});
