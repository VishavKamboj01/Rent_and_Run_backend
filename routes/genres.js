import express from "express";
import { Genre, validate } from "../Model/Genre.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
//AsyncMiddleware is a function that takes the route call back function and returns
// another function by the the callback function in try catch block.
import { asyncMiddleware } from "../middleware/async.js";
import mongoose from "mongoose";
const router = express.Router();

//Get Requests
router.get("/", async (req, res) => {
  const result = await Genre.find().select("_id name");
  res.send(result);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res.status(404).send("The Genre with the given ID was not found.");
  res.send(genre);
});

//Post Requests

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const genre = new Genre({
    name: req.body.name,
  });

  try {
    const result = await genre.save();
    res.send(result);
  } catch (err) {
    console.log("Could not save! ", err);
    res.status(500).send("Error");
  }
});

//Put Requests

router.put("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("Invalid Object ID.");

  const genre = await Genre.findById(req.params.id);

  if (!genre)
    return res.status(404).send("The Genre with the given ID was not found.");

  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;
  const result = await genre.save();
  res.send(result);
});

// Delete Requests

router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre)
    return res.status(404).send("The Genre with the given ID was not found.");

  //Delete from database
  const result = await Genre.deleteOne({ _id: req.params.id });
  res.send({ genre, result });
});

export default router;
