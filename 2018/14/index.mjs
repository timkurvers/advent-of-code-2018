/* eslint-disable no-param-reassign */

import { day } from '..';

import examples from './input/examples';
import puzzleInput from './input';

const initialize = () => ({
  first: 0,
  second: 1,
  recipes: [3, 7],
});

const create = (state) => {
  const { first, second, recipes } = state;
  const sum = recipes[first] + recipes[second];
  const numbers = sum.toString().split('').map(Number);
  recipes.push(...numbers);

  state.first = (first + 1 + recipes[first]) % recipes.length;
  state.second = (second + 1 + recipes[second]) % recipes.length;
};

const match = (recipes, start, seek) => {
  const { length } = seek;
  for (let i = 0; i < length; ++i) {
    if (recipes[start + i] !== seek[i]) {
      return false;
    }
  }
  return true;
};

day(14).part(1).test(examples).feed(puzzleInput).solution((input) => {
  const target = +input;

  const state = initialize();
  const { recipes } = state;

  const required = 10;
  while (recipes.length < target + required) {
    create(state);
  }
  return recipes.slice(target, target + required).join('');
});

day(14).part(2).test(examples).feed(puzzleInput).inefficient.solution((input) => {
  const state = initialize();
  const { recipes } = state;

  const seek = input.split('').map(Number);
  const { length } = seek;

  while (true) {
    create(state);

    const offset = recipes.length - length;
    if (match(recipes, offset, seek)) {
      return offset;
    }
    if (match(recipes, offset - 1, seek)) {
      return offset - 1;
    }
  }
});
