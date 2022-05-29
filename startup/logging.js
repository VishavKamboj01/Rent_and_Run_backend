//Adding a transport for logging messages in a logfile using winston.
import winston from "winston";
import "express-async-errors"; // Wraps our routes in try catch block at runtine.

export default () => {
  winston.add(
    new winston.transports.File({
      filename: "logfile.log",
      handleExceptions: true,
      handleRejections: true,
    })
  );
};
