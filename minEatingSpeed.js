/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}

k = 1
[30,11,23,4,20] h = 6
[29,11,23,4,20] h = 5
[29,10,23,4,20] h = 4
[29,10,22,4,20] h = 3
[29,10,22,3,20] h = 2
[29,10,22,3,19] h = 1
[28,10,22,3,19] h = 0

 */
var minEatingSpeed = function (piles, h) {
  let k = 1;
  let remainingHours = h;
  let pilesCopy = [...piles];
  while (!pilesCopy.every((item) => item === 0)) {
    while (remainingHours > 0) {
      for (let i = 0; i < pilesCopy.length; i += 1) {
        if (remainingHours === 0) break;
        if (pilesCopy[i] === 0) continue;
        pilesCopy[i] = Math.max(0, pilesCopy[i] - k);
        remainingHours -= 1;
      }
    }
    if (pilesCopy.every((item) => item === 0)) {
      return k;
    } else {
      k += 1;
      remainingHours = h;
      pilesCopy = [...piles];
    }
  }
  return k;
};
