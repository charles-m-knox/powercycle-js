import { updatePower } from './power';

interface Test {
  w: number;
  next: number;
  base: number;
  expected: number;
}

const tests: Test[] = [
  {
    w: 2,
    base: 100,
    next: 0,
    expected: 2, // edge case that really doesn't matter that much
  },
  {
    w: 2,
    base: 10,
    next: 0,
    expected: 2, // edge case that really doesn't matter that much
  },
  {
    w: 2,
    base: 1,
    next: 0,
    expected: 0,
  },
  {
    w: -1,
    base: 100,
    next: 3,
    expected: 0,
  },
  {
    w: 0,
    base: 100,
    next: -1,
    expected: 0,
  },
  {
    w: 0,
    base: 100,
    next: 11,
    expected: 0,
  },
  {
    w: 1020,
    base: 100,
    next: 11,
    expected: 1020,
  },
  {
    w: 1020,
    base: 100,
    next: -31,
    expected: 1020,
  },
  {
    w: 999,
    base: 100,
    next: 0,
    expected: 1099,
  },
  {
    w: 999,
    base: 100,
    next: 3,
    expected: 399,
  },
  {
    w: 102302,
    base: 100,
    next: 3,
    expected: 102302,
  },
  {
    w: 102402,
    base: 100,
    next: 3,
    expected: 102302,
  },
  {
    w: 102403,
    base: 100,
    next: 5,
    expected: 102503,
  },
  {
    w: 102902,
    base: 100,
    next: 0,
    expected: 103002,
  },
  {
    w: 102002,
    base: 100,
    next: 9,
    expected: 101902,
  },
  {
    w: 192,
    base: 100,
    next: 3,
    expected: 392,
  },
  {
    w: 410,
    base: 100,
    next: 5,
    expected: 510,
  },
  {
    w: 210,
    base: 10,
    next: 0,
    expected: 200,
  },
  {
    w: 804,
    base: 10,
    next: 9,
    expected: 794,
  },
  {
    w: 9,
    base: 100,
    next: 1,
    expected: 109,
  },
  {
    w: 2,
    base: 100,
    next: 1,
    expected: 102,
  },
  {
    w: 2,
    base: 100,
    next: 1,
    expected: 102,
  },
  {
    w: 0,
    base: 100,
    next: 0,
    expected: 0,
  },
  {
    w: 0,
    base: 10,
    next: 0,
    expected: 0,
  },
  {
    w: 0,
    base: 1,
    next: 0,
    expected: 0,
  },
  {
    w: 452,
    base: 10,
    next: 7,
    expected: 472,
  },
  {
    w: 431,
    base: 10,
    next: 4,
    expected: 441,
  },
  {
    w: 794,
    base: 10,
    next: 8,
    expected: 784,
  },
  {
    w: 997,
    base: 10,
    next: 0,
    expected: 1007,
  },
  {
    w: 807,
    base: 10,
    next: 9,
    expected: 797,
  },
  {
    w: 1002,
    base: 100,
    next: 9,
    expected: 902,
  },
  {
    w: 2002,
    base: 100,
    next: 9,
    expected: 1902,
  },
  {
    w: 921041,
    base: 100,
    next: 9,
    expected: 920941,
  },
  {
    w: 3992,
    base: 100,
    next: 9,
    expected: 3992,
  },
  {
    w: 3992,
    base: 1,
    next: 1,
    expected: 3991,
  },
  {
    w: 3992,
    base: 1,
    next: 1,
    expected: 3991,
  },
  {
    w: 9,
    base: 1,
    next: 0,
    expected: 10,
  },
  {
    w: 99,
    base: 1,
    next: 0,
    expected: 100,
  },
  {
    w: 999,
    base: 1,
    next: 0,
    expected: 1000,
  },
];

describe('updatePower', () => {
  tests.map((test) => {
    it(`${test.w} set ${test.base} to ${test.next} equaling ${test.expected}`, () => {
      const actual = updatePower(test.w, test.next, test.base);
      expect(actual).toEqual(test.expected);
    });
  });
});
