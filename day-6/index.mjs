#!/usr/bin/env node --experimental-modules --no-warnings

import Coordinate from './Coordinate';
import Location from './Location';
import input from './input';
import { day } from '../utils';

const coords = input.map(pair => new Coordinate(...pair));

const cols = Math.max(...coords.map(coord => coord.x)) + 1;
const rows = Math.max(...coords.map(coord => coord.y)) + 1;

const grid = new Array(cols * rows);

for (let y = 0; y < rows; ++y) {
  for (let x = 0; x < cols; ++x) {
    const index = y * rows + x;

    const location = new Location(x, y, coords);
    grid[index] = location;

    const winner = location.closestCoord;
    if (winner) {
      ++winner.area;

      if (x === 0 || x === cols - 1 || y === 0 || y === rows - 1) {
        winner.infinite = true;
      }
    }
  }
}

day(6).part(1).solution(() => {
  const finites = coords.filter(coord => !coord.infinite);
  return finites.sort((a, b) => b.area - a.area)[0].area;
});

day(6).part(2).solution(() => {
  const target = input.example ? 32 : 10000;
  return grid.filter(location => location.totalDistanceToAllCoords < target).length;
});