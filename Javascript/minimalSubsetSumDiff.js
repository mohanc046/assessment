/**
 * Recursively computes subset sums for a given set of numbers.
 * @param {number[]} arrayOfNumbers - The array of numbers.
 * @param {number} index - The current index being processed.
 * @param {number} sum - The current sum of the subset.
 * @param {number} count - The count of elements in the subset.
 * @param {Map<number, Set<number>>} sums - The map containing subset sums.
 * @returns {void}
 */
function computeSubsetSums({ arrayOfNumbers, index, sum, count, sums }) {
    if (index === arrayOfNumbers.length) {
        // Base case: Reached the end of numbers array, add the current sum to the sums map.
        if (!sums.has(count)) {
            sums.set(count, new Set());
        }
        sums.get(count).add(sum);
        return;
    }

    // Include the current number in the subset and recurse.
    computeSubsetSums({
        arrayOfNumbers,
        index: index + 1,
        sum: sum + arrayOfNumbers[index],
        count: count + 1,
        sums
    });

    // Exclude the current number from the subset and recurse.
    computeSubsetSums({
        arrayOfNumbers,
        index: index + 1,
        sum: sum - arrayOfNumbers[index],
        count,
        sums
    });
}

/**
 * Merges subset sums from a source map into a target map.
 * @param {Map<number, Set<number>>} targetMap - The map to merge sums into.
 * @param {Map<number, Set<number>>} sourceMap - The map containing sums to be merged.
 * @returns {void}
 */
function mergeSumsIntoMap(targetMap, sourceMap) {
    for (const [count, sums] of sourceMap) {
        if (!targetMap.has(count)) {
            targetMap.set(count, new Set());
        }
        for (const sum of sums) {
            targetMap.get(count).add(sum);
        }
    }
}

/**
 * Finds the minimum absolute difference between sums of two subsets from an array of numbers.
 * @param {number[]} arrayOfNumbers - The array of numbers.
 * @returns {number} - The minimum absolute difference between subset sums.
 */
const findMinimumSubsetSumDifference = (arrayOfNumbers) => {
    // Split the array into two halves
    const splitIndex = arrayOfNumbers.length >> 1;

    // Maps to store subset sums for each half
    const firstHalfSums = new Map();
    const secondHalfSums = new Map();

    // Split the array into two halves
    const firstHalf = arrayOfNumbers.slice(0, splitIndex);
    const secondHalf = arrayOfNumbers.slice(splitIndex);

    // Calculate subset sums for each half
    const firstHalfSubsetSums = new Map();
    const secondHalfSubsetSums = new Map();

    computeSubsetSums({
        arrayOfNumbers: firstHalf,
        index: 0,
        sum: 0,
        count: 0,
        sums: firstHalfSubsetSums
    });

    computeSubsetSums({
        arrayOfNumbers: secondHalf,
        index: 0,
        sum: 0,
        count: 0,
        sums: secondHalfSubsetSums
    });

    // Merge computed subset sums into respective maps
    mergeSumsIntoMap(firstHalfSums, firstHalfSubsetSums);
    mergeSumsIntoMap(secondHalfSums, secondHalfSubsetSums);

    // Initialize minimum absolute sum with the maximum possible value
    let minAbsoluteSum = Number.MAX_VALUE;

    // Iterate through subsets to find the minimum absolute difference
    for (let index = 0; index <= splitIndex; ++index) {
        const sumsFirstHalfAtIndex = Array.from(firstHalfSums.get(index));
        const sumsSecondHalfAtIndex = Array.from(secondHalfSums.get(splitIndex - index));

        // Sort the subset sums
        sumsFirstHalfAtIndex.sort((firstSum, secondSum) => firstSum - secondSum);
        sumsSecondHalfAtIndex.sort((firstSum, secondSum) => firstSum - secondSum);

        let left = 0;

        for (const sumFirstHalf of sumsFirstHalfAtIndex) {
            while (left < sumsSecondHalfAtIndex.length && sumsSecondHalfAtIndex[left] < -sumFirstHalf) {
                left++;
            }
            if (left < sumsSecondHalfAtIndex.length) {
                // Update minimum absolute sum
                minAbsoluteSum = Math.min(minAbsoluteSum, Math.abs(sumFirstHalf + sumsSecondHalfAtIndex[left]));
                if (left > 0) {
                    minAbsoluteSum = Math.min(minAbsoluteSum, Math.abs(sumFirstHalf + sumsSecondHalfAtIndex[left - 1]));
                }
            }
        }
    }

    return minAbsoluteSum;
}

module.exports = { findMinimumSubsetSumDifference }
