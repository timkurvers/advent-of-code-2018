import { bisect, range } from '../../utils';

describe('search utilities', () => {
  describe('bisect()', () => {
    it('finds lowest value where given predicate is truthy', () => {
      const start = 0;
      const end = 10;
      const indices = range({ start, end });

      for (const index of indices) {
        expect(bisect({
          lower: start,
          upper: end,
          until: (x) => x >= index,
        })).toEqual(index);
      }
    });
  });
});