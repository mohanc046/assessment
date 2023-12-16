/**
 * Generates a masked value by converting a string to Base64 and removing trailing '=' characters.
 * @param {string} value - The string to be converted to a masked value.
 * @returns {string} The masked value after converting to Base64 and removing trailing '=' characters.
 */
const generateMaskedValue = (value) => {
    // Convert string to Base64
    const base64String = Buffer.from(value).toString('base64');
    // Remove trailing '=' characters from the Base64 string
    return base64String.replace(/=+$/, '');
}


module.exports = { generateMaskedValue }