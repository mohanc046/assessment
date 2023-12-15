const mongoose = require('mongoose');

const PasswordEntryCheckerSchema = new mongoose.Schema({

    password: {
        type: String,
        require: true
    },

    validationResult: {
        type: Number,
        require: true
    },

    message: {
        type: String,
        require: true
    },

    createdOn: {
        type: Date,
        default: new Date()
    },

    updatedOn: {
        type: Date,
        default: new Date()
    },

    isDeleted: {
        type: Boolean,
        default: false
    }
});

const PasswordEntry = mongoose.model('PasswordEntry', PasswordEntryCheckerSchema);

module.exports = PasswordEntry;