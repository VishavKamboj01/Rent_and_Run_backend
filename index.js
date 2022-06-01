import express from "express";
import connectToMongoDB from "./startup/connection.js";
import logger from "./startup/logging.js";
const app = express();
import router from "./startup/routes.js";
import config from "./startup/config.js";

//Initializing winston for logging
logger();
//Configuration of app settings
config();
//Initializing all the routes
router(app);

const port = process.env.PORT || 3000;

const server = app.listen(port, () => console.log(`Listening on Port ${port}`));

connectToMongoDB();

module.exports = server;
