import express from "express";
import connectToMongoDB from "./startup/connection.js";
import logger from "./startup/logging.js";
const app = express();
import router from "./startup/routes.js";

//Initializing winston for logging
logger();
//Initializing all the routes
router(app);

const port = process.env.PORT || 3000;
app.listen(port, (err) => console.log(`Listening on Port ${port}`));

connectToMongoDB();
