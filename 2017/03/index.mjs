#!/usr/bin/env node --experimental-modules --no-warnings

import { Grid, sum } from '../../utils';
import { day } from '..';

import examples from './input/examples';
import puzzleInput from './input';

const spiral = (until) => {
  const grid = new Grid();

  const create = (nr, x, y) => {
    const neighbors = [
      grid.get(x - 1, y - 1), grid.get(x, y - 1), grid.get(x + 1, y - 1),
      grid.get(x - 1, y), grid.get(x + 1, y),
      grid.get(x - 1, y + 1), grid.get(x, y + 1), grid.get(x + 1, y + 1),
    ].filter(Boolean);

    const entry = {
      nr,
      x,
      y,
      distance: Math.abs(x) + Math.abs(y),
      value: nr === 1 ? nr : sum(neighbors.map(neighbor => neighbor.value)),
    };

    grid.set(x, y, entry);
    return entry;
  };

  let size = 1;
  let target = size * size;
  let current = create(1, 0, 0);
  let dx;
  let dy;

  let i = 2;
  while (!until(current)) {
    if (i > target) {
      size += 2;
      target = size * size;
      dx = 1;
      dy = 0;
    }
    current = create(i, current.x + dx, current.y + dy);
    const edge = Math.floor(size / 2);
    if (current.x === edge) {
      dx = 0;
      dy = -1;
    }
    if (current.y === -edge) {
      dx = -1;
      dy = 0;
    }
    if (current.x === -edge) {
      dx = 0;
      dy = 1;
    }
    if (current.y === edge) {
      dx = 1;
      dy = 0;
    }
    ++i;
  }

  return {
    square: current,
  };
};

day(3).part(1).test(examples).feed(puzzleInput).solution((input) => {
  const target = +input;
  const { square } = spiral(until => until.nr === target);
  return square.distance;
});

day(3).part(2).test(examples).feed(puzzleInput).solution((input) => {
  const target = +input;
  const { square } = spiral(until => until.value > target);
  return square.value;
});
