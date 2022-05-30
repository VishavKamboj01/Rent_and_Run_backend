import winston from "winston";
export function error(err, req, res, next) {
  //Log the exception
  winston.error("Uncaught Async err: ", err);
  res.status(500).send("Something went wrong!");
}
