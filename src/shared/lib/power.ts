/**
 * For a sequence of spinboxes, clicking up/down on each digit should increment
 * the `w` value. For the zero and nine values, these are meant to flip to the
 * next/previous increment, such as 99 -> 100.
 *
 * @param w Current power
 * @param next Next value for the given base. 0-9
 * @param base Whether to modify the ones, tens, hundreds, etc - pass in 1, 10,
 * 100
 */
export const updatePower = (w: number, next: number, base: number): number => {
  if (w < 0) return 0;
  if (next > 9 || next < 0) return w;
  if (w === 0 && next === 0) return 0;

  const calculate = () => {
    const nextBase = base * 10;

    if (next === 0 && w % nextBase >= 9 * base) {
      return w + base;
    } else if (next === 9 && w % nextBase < 1 * base) {
      return w - base;
    } else {
      return w + (next - Math.floor((w % nextBase) / base)) * base;
    }
  };

  return Math.max(calculate(), 0);
};
