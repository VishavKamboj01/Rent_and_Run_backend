import mongoose from "mongoose";
import { genreSchema } from "./Genre.js";
import Joi from "joi";

const movieSchema = mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: genreSchema, required: true },
  numberInStock: { type: Number, default: 0 },
  dailyRentalRate: { type: Number, default: 0 },
});

function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    genre: Joi.string().min(10).max(255).required(),
    numberInStock: Joi.number().required(),
    dailyRentalRate: Joi.number().required(),
  });

  return schema.validate();
}

const Movie = mongoose.model("Movie", movieSchema);

export { Movie, validateMovie as validate };
