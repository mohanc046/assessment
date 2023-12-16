const { findMinimumSubsetSumDifference } = require('../utils/minimalSubsetSumDiff');

describe('Find Minimum Subset Sum Difference', () => {
    test('Basic Case with Positive Numbers: should return the minimum absolute difference between subset sums for an array of positive numbers', () => {
        const array = [1, 2, 3, 4, 5];
        expect(findMinimumSubsetSumDifference(array)).toBe(1);
    });

    test('Case with Negative Numbers and Zeros: should return the minimum absolute difference between subset sums for an array containing negative numbers and zeros', () => {
        const array = [-1, 0, 1, -2, 2];
        expect(findMinimumSubsetSumDifference(array)).toBe(0);
    });

    test('Case with Repeated Numbers: should return 0 for an array containing repeated numbers', () => {
        const array = [3, 3, 3, 3];
        expect(findMinimumSubsetSumDifference(array)).toBe(0);
    });

    test('Case with Large Numbers: should return 0 for an array containing large numbers', () => {
        const array = [1000000, 999999, 999998, 999997];
        expect(findMinimumSubsetSumDifference(array)).toBe(0);
    });

    test('Case with Empty Array: should return 0 for an empty array', () => {
        const array = [];
        expect(findMinimumSubsetSumDifference(array)).toBe(0);
    });

    test('Case with Single Element: should return the absolute difference between the single element and its negative counterpart', () => {
        const array = [-36, 36];
        expect(findMinimumSubsetSumDifference(array)).toBe(72);
    });

    test('Case with Mix of Positive and Negative Numbers: should return the minimum absolute difference between subset sums for an array with positive and negative numbers', () => {
        const array = [-3, -1, 2, 4];
        expect(findMinimumSubsetSumDifference(array)).toBe(0);
    });
});
