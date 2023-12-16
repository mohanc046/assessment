const bunyan = require('bunyan');

const logger = bunyan.createLogger({
    name: 'myApp',
    streams: [
        {
            level: 'info',
            stream: process.stdout,
        },
        {
            level: 'info',
            path: './myApp-info.log'
        },
        {
            level: 'error',
            path: './myApp-error.log'
        },
        {
            level: 'warn',
            path: './myApp-warn.log'
        }
    ]
});


module.exports = { logger }