
require("dotenv").config();

const mongoose = require("mongoose");

const { logger } = require("../utils/logger");

mongoose.connect(process.env.mongoURI);

mongoose.connection.on("connected", () => { logger.info(" mongoose connected successfully") });

mongoose.connection.on("error", err => {
  logger.error("Mongoose connection has occurred " + err + " error");
});

mongoose.connection.on("disconnected", () => {
  logger.warn(`Mongoose connection is disconnected!`)
});

process.on("SIGINT", function () {
  mongoose.connection.close(() => {
    process.exit(0);
  });
});
