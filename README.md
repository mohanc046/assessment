
# Project Title

This project aims to provide functionalities related to password checking and array operations. It includes implementations for a strong password checker and finding the minimum possible absolute difference of an array.

## Demo

Password Checking UI Live Demo - https://password-validator-21f0e.web.app

![Screenshot](/UI-Reference/success-case.png)

![Screenshot](/UI-Reference/failure-case.png)

## Assessment 1 - Implementations for a strong password checker

```
const MIN_PASSWORD_LENGTH = 6;

const MAX_PASSWORD_LENGTH = 20;

const REPETITION_THRESHOLD = 3

const isPasswordBelowMinimumLength = (password) => {
    return `${password}`.length < MIN_PASSWORD_LENGTH
}

const isPasswordWithinMaxLength = (password) => {
    return `${password}`.length <= MAX_PASSWORD_LENGTH
}

const areCharactersEqual = (characterA, characterB) => {
    return characterA === characterB;
}

const hasThreeConsecutiveRepeatedCharacters = (password, indexPosition) => {

    return areCharactersEqual(password[indexPosition], password[indexPosition - 1])
        && areCharactersEqual(password[indexPosition - 1], password[indexPosition - 2])

}

const calculateMinimum = (values) => {
    return Math.min(...values);
};

const calculateMaximum = (values) => {
    return Math.max(...values);
};

/**
 * Counts the number of missing character types (lowercase, uppercase, digits) in a password.
 * Condition : It must contain at least one lowercase letter, at least one uppercase letter, and at least one digit
 * @param {string} password - The password to check for missing character types.
 * @returns {number} - The count of missing character types (0 to 3).
 */
const countMissingCharacterTypesInPassword = (password) => {

    let lowerCase = 1, upperCase = 1, digit = 1;

    if (/[a-z]/.test(password)) lowerCase--;

    if (/[A-Z]/.test(password)) upperCase--;

    if (/[0-9]/.test(password)) digit--;

    return lowerCase + upperCase + digit;
}

/**
 * Counts the steps and occurrences of consecutive repeated characters in a password.
 * @param {string} password - The password to analyze.
 * @returns {object} - An object containing total steps, occurrences of one and two consecutive repeated characters.
 */
const analyzePassword = (password, passwordLength) => {

    let totalSteps = 0,
        oneConsecutive = 0,
        twoConsecutive = 0,
        indexPosition = 2;

    while (indexPosition < passwordLength) {
        if (hasThreeConsecutiveRepeatedCharacters(password, indexPosition)) {
            let length = 2;
            while (indexPosition < passwordLength && areCharactersEqual(password[indexPosition], password[indexPosition - 1])) {
                indexPosition++;
                length++;
            }
            // in a interval of 3 character it is considered as one step to change
            totalSteps = totalSteps + Math.floor(length / REPETITION_THRESHOLD);
            if (length % REPETITION_THRESHOLD === 0) oneConsecutive++;
            else if (length % REPETITION_THRESHOLD === 1) twoConsecutive++;
        } else {
            indexPosition++;
        }
    }

    return {
        totalSteps,
        oneConsecutive,
        twoConsecutive
    };
}

function strongPasswordChecker(password) {

    let missingTypes = countMissingCharacterTypesInPassword(password);

    const passwordLength = `${password}`.length;

    let {
        totalSteps = 0,
        oneConsecutive = 0,
        twoConsecutive = 0
    } = analyzePassword(password, passwordLength)

    if (isPasswordBelowMinimumLength(password)) {

        return calculateMaximum([missingTypes, MIN_PASSWORD_LENGTH - passwordLength]);

    } else if (isPasswordWithinMaxLength(password)) {

        return calculateMaximum([missingTypes, totalSteps]);

    } else {

        let deleteCount = passwordLength - MAX_PASSWORD_LENGTH;

        totalSteps = totalSteps - calculateMinimum([deleteCount, oneConsecutive * 1]) / 1;

        const difference = calculateMaximum([deleteCount - oneConsecutive, 0]);

        totalSteps = totalSteps - calculateMinimum([difference, twoConsecutive * 2]) / 2;

        totalSteps = totalSteps - calculateMaximum([deleteCount - oneConsecutive - 2 * twoConsecutive, 0]) / 3;

        return deleteCount + calculateMaximum([missingTypes, totalSteps]);
    }
}


module.exports = { strongPasswordChecker }

```

## Assessment 2 - Finding the minimum possible absolute difference of an array
```
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

```
