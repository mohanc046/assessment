const router = require('express').Router();

const passwordEntryController = require('../controller/index');

const validateRequest = require("../../../../middleware/joi.validation");

const { validationSchema } = require("../validation");

const { CREATE_ENTRY } = validationSchema;

router.post('/', validateRequest(CREATE_ENTRY), passwordEntryController.createEntry);

module.exports = router;