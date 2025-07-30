/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */

function getMax(arr) {
  let max = -Infinity;
  for (const val of arr) {
    if (val > max) {
      max = val;
    }
  }
  return max;
}

var minEatingSpeed = function (piles, h) {
  let left = 1;
  let right = getMax(piles);
  let k = right;
  while (left <= right) {
    let hours = 0;
    const mid = Math.floor((left + right) / 2);
    // const pilesCopy = [...piles];
    for (const pile of piles) {
      hours += Math.ceil(pile / mid);
    }
    if (hours <= h) {
      k = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return k;
};
