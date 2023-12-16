import axios from 'axios';

import { CONFIG } from './config';

/**
 * Validates a password by making an API call.
 * @param {Object} data - Object containing the password to be validated.
 * @param {string} data.password - The password to be validated.
 * @returns {Promise<Object>} Object containing the password validation response.
 */
export const validatePasswordAPI = async ({ password }) => {

    const response = await axios.post(`${CONFIG.SERVICE_URL}/validator`, { password });

    return response.data;

}