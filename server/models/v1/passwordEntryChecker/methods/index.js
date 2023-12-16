const PasswordEntry = require('../index.schema');

const create = async (data) => {
    return await PasswordEntry.create(data);
}

const findAll = async () => {
    return await PasswordEntry.find({});
}

module.exports = { create, findAll };