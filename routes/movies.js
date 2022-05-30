import express from "express";
import { Movie, validate } from "../Model/Movie.js";
import { Genre } from "../Model/Genre.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.send(movies);
});

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).send("Invalid Movie ID!");

  res.send(movie);
});

router.post("/", async (req, res) => {
  const newMovie = req.body;
  const { error } = validate(newMovie);

  if (error) return res.status(400).send(error.details[0].message);

  //Getting the genre
  const genre = await Genre.findById(newMovie.genre.id);
  if (!genre) return res.status(400).send("Invalid Genre ID!");

  //Creating a movie Object
  const movie = new Movie({
    title: newMovie.title,
    genre: genre,
    numberInStock: newMovie.numberInStock,
    dailyRentalRate: newMovie.dailyRentalRate,
  });

  const result = await movie.save();
  res.send(result);
});

router.put("/:id", async (req, res) => {
  const updatedMovie = req.body;
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(400).send("Invalid Movie ID!");

  const genre = await Genre.findById(updatedMovie.genre);
  if (!genre) return res.status(400).send("Invalid Genre ID!");

  //Setting the properties
  movie.title = updatedMovie.title;
  movie.genre = genre;
  movie.numberInStock = updatedMovie.numberInStock;
  movie.dailyRentalRate = updatedMovie.dailyRentalRate;

  movie.save();
  res.send(movie);
});

router.delete("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(400).send("Invalid Movie ID!");

  const result = await Movie.deleteOne({ _id: req.params.id });

  res.send({ movie, result });
});

export default router;
