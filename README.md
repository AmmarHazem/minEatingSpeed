# 875. Koko Eating Bananas

## Problem Description

Koko loves to eat bananas. There are `n` piles of bananas, the `i-th` pile has `piles[i]` bananas. The guards have gone and will come back in `h` hours.

Koko can decide her bananas-per-hour eating speed of `k`. Each hour, she chooses some pile of bananas and eats `k` bananas from that pile. If the pile has less than `k` bananas, she eats all of them instead and will not eat from any more bananas during this hour.

Koko likes to eat slowly but still wants to finish eating all the bananas before the guards come back.

Return the minimum integer `k` such that she can eat all the bananas within `h` hours.

## Examples

### Example 1:
```
Input: piles = [3,6,7,11], h = 8
Output: 4
```
**Explanation:**
- If k = 1, it takes 3+6+7+11 = 27 hours
- If k = 2, it takes 2+3+4+6 = 15 hours  
- If k = 3, it takes 1+2+3+4 = 10 hours
- If k = 4, it takes 1+2+2+3 = 8 hours
- If k = 5, it takes 1+2+2+3 = 8 hours
- The minimum k is 4.

### Example 2:
```
Input: piles = [30,11,23,4,20], h = 5
Output: 30
```

### Example 3:
```
Input: piles = [30,11,23,4,20], h = 6
Output: 23
```

## Solution Approach

The solution uses a **binary search** approach to find the minimum eating speed `k`:

1. **Search Space**: The minimum possible speed is 1, and the maximum is the largest pile size (since eating faster than the largest pile doesn't help).

2. **Binary Search**: For each mid-point speed, calculate the total hours needed to eat all bananas.

3. **Feasibility Check**: For a given speed `k`, calculate hours needed for each pile using `Math.ceil(pile / k)`.

4. **Decision**: 
   - If total hours ≤ `h`, the speed is feasible, try a lower speed
   - If total hours > `h`, the speed is too slow, try a higher speed

## Algorithm

```javascript
function minEatingSpeed(piles, h) {
    let left = 1;
    let right = Math.max(...piles);
    let result = right;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        let hours = 0;
        
        for (const pile of piles) {
            hours += Math.ceil(pile / mid);
        }
        
        if (hours <= h) {
            result = mid;
            right = mid - 1;  // Try a lower speed
        } else {
            left = mid + 1;   // Try a higher speed
        }
    }
    
    return result;
}
```

## Time and Space Complexity

- **Time Complexity**: O(n × log M)
  - `n` = number of piles
  - `M` = maximum pile size
  - Binary search takes O(log M) iterations
  - Each iteration calculates hours for all piles in O(n) time

- **Space Complexity**: O(1)
  - Only uses a constant amount of extra space

## Key Insights

1. **Monotonic Property**: If speed `k` works, any speed > `k` will also work. If speed `k` doesn't work, any speed < `k` won't work either.

2. **Upper Bound**: The maximum speed needed is the largest pile size, as eating faster than that doesn't provide any benefit.

3. **Ceiling Function**: Using `Math.ceil(pile / k)` correctly handles the case where a pile has fewer bananas than the eating speed.

## Usage

```javascript
// Example usage
const piles = [3, 6, 7, 11];
const h = 8;
const result = minEatingSpeed(piles, h);
console.log(result); // Output: 4
```

## Constraints

- `1 <= piles.length <= 10^4`
- `piles.length <= h <= 10^9`
- `1 <= piles[i] <= 10^9`

## Related Problems

- [LeetCode 875 - Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/)
- Similar binary search problems:
  - Capacity To Ship Packages Within D Days
  - Split Array Largest Sum
  - Minimum Number of Days to Make m Bouquets
