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

// console.log(strongPasswordChecker("1337C-d3"));
// console.log(strongPasswordChecker("a"));
// console.log(strongPasswordChecker("aAa1aaB"));
// console.log(strongPasswordChecker("5aA1233434343432312333"));