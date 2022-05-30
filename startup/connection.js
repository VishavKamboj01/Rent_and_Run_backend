import mongoose from "mongoose";
import winston from "winston";
import config from "config";

function connect() {
  const url = config.get("db");
  mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => winston.info(`Connected to ${url}`));
}

export default connect;
