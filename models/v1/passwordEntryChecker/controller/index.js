const passwordEntryService = require('../methods/index');

const { StatusCodes } = require("http-status-codes");

const { config } = require('../../../../utils/constant');

const { logger } = require('../../../../utils/logger');

const { strongPasswordChecker } = require('../../../../utils/passwordChecker');

const { generateMaskedValue } = require('../../../../utils');

const { statusCode: { FAILED, SUCCESS } } = config;

async function createEntry(req, res) {

    const { password = "" } = req.body;

    try {

        logger.info(`Initiated validating password quality for string - ${generateMaskedValue(password)}`)

        const passwordCheckerResponse = strongPasswordChecker(password);

        const message = passwordCheckerResponse ? 'Week password' : 'Strong Password';

        await passwordEntryService.create({ password, validationResult: passwordCheckerResponse, message });

        logger.info(`Successfully validated password quality for string - ${generateMaskedValue(password)}`)

        return res.status(StatusCodes.OK).json({
            statusCode: SUCCESS,
            message,
            validationResult: passwordCheckerResponse
        });

    } catch (error) {

        logger.error(`Facing issue while validating password quality for string - ${generateMaskedValue(password)} with error `, error)

        return res.status(StatusCodes.BAD_GATEWAY).json({ statusCode: FAILED, message: "Facing issue while validating password!" });

    }
}

module.exports = { createEntry };
