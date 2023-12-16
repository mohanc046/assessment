const { strongPasswordChecker } = require('../passwordChecker'); 

describe('Strong Password Checker Tests', () => {
    test('Below Minimum Length: should return the maximum between missing types and the shortfall in length', () => {
        expect(strongPasswordChecker("a")).toBe(5);
    });

    test('Exceeds Maximum Length: should return the number of characters to be deleted to meet the length constraint', () => {
        expect(strongPasswordChecker("5aA1233434343432312333")).toBe(2);
    });

    test('Character Type Checks: should return the count of missing character types', () => {
        expect(strongPasswordChecker("1337C-d3")).toBe(0);
    });

    test('Repeated Characters: should return 0 for a password without consecutive repeated characters', () => {
        expect(strongPasswordChecker("aAa1aaB")).toBe(0);
    });

    // Additional Edge Cases
    test('Empty Password: should return the maximum possible missing types count (all 3 types)', () => {
        expect(strongPasswordChecker("")).toBe(6);
    });

    test('Exact Minimum Length: should return 0 for a password meeting the minimum length and character type requirements', () => {
        expect(strongPasswordChecker("aA1bcD")).toBe(0);
    });

    test('Exact Maximum Length: should return the count of characters to be deleted to satisfy the maximum length constraint', () => {
        expect(strongPasswordChecker("Abcdefghijklmnopqrst")).toBe(1);
    });

    test('No Numbers: should have one missing digit type', () => {
        expect(strongPasswordChecker("Abcdefgh")).toBe(1);
    });

    test('No Lowercase: should have one missing lowercase type', () => {
        expect(strongPasswordChecker("ABCD1234")).toBe(1);
    });

    test('No Uppercase: should have one missing uppercase type', () => {
        expect(strongPasswordChecker("abcd1234")).toBe(1);
    });
});
