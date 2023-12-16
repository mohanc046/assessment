require("dotenv").config();

const express = require("express");

const cookieParser = require("cookie-parser");

const bodyParser = require("body-parser");

const app = express();

const cors = require("cors");

const helmet = require('helmet');

// mongoose connection
require("./connection/mongoose");

app.use(cors());

app.use(bodyParser.json({ limit: "20mb" }));

app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));

app.use(cookieParser());

app.use(helmet());

// changed port to env for auto porting from heroku
const PORT = process.env.PORT;

app.listen(PORT, () => { console.log(`Server listening on port ${PORT}...`); });

require("./routes")(app);
