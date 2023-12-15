
require("dotenv").config();

const mongoose = require("mongoose");

const { logger } = require("../utils/logger");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};


mongoose.connect(process.env.mongoURI, options);

mongoose.connection.on("connected", () => { console.log(" mongoose connected successfully") });

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
