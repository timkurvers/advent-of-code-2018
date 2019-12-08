/* eslint-disable no-param-reassign */

import { Grid, flatMap, solution } from '../../utils';
import { knothash } from '../10/knothash';

import Region from './Region';

const keyToGrid = (key, size = 128) => {
  const grid = new Grid();
  for (let y = 0; y < size; ++y) {
    const hash = knothash(`${key}-${y}`);
    const bits = flatMap(hash, (byte => (
      byte.toString(2).padStart(8, '0').split('').map(Number)
    )));

    for (let x = 0; x < size; ++x) {
      grid.set(x, y, !!bits[x]);
    }
  }
  return grid;
};

export const partOne = solution.inefficient((input) => {
  const grid = keyToGrid(input);
  return grid.filter(point => point.value).length;
});

export const partTwo = solution.inefficient((input) => {
  const regions = new Set();
  const grid = keyToGrid(input);

  const merge = (a, b) => {
    for (const point of a.points) {
      point.region = b;
    }
    regions.delete(a);
  };

  grid.each((point) => {
    if (!point.value) {
      return;
    }

    const candidate = point.adjacentNeighbors.find(neighbor => neighbor.region);
    let region = candidate && candidate.region;
    if (!region) {
      region = new Region(grid, regions.size + 1);
      regions.add(region);
    }
    point.region = region;

    const { left, up } = point;
    if (up && up.region && up.region !== region) {
      merge(point.up.region, region);
    }
    if (left && left.region && left.region !== region) {
      merge(point.left.region, region);
    }
  });

  return regions.size;
});
