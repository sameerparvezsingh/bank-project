
const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");
const configValues = require("./default.json");

const dbTransport = new winston.transports.MongoDB({
  db:`${configValues.mongoDBConnectionURL}`,
  options: {
    useUnifiedTopology: true,
  },
  level: "error",
  collection : "accounts_microservice_logs"
});

const consoleTransport = new winston.transports.Console({
  format: winston.format.simple(),
});

const accountLogger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: "logs/allInfo.log" }),
    dbTransport,
    consoleTransport,
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: "logs/allRejections.log" }),
    dbTransport,
    consoleTransport,
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: "logs/uncaughtExceptions.log" }),
    dbTransport,
    consoleTransport,
  ],
  
});

module.exports = accountLogger;
