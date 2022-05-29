import mongoose from "mongoose";
import winston from "winston";

const url = "mongodb://localhost/vidly";

function connect() {
  mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => winston.info("Connected to MongoDB!"));
}

export default connect;
