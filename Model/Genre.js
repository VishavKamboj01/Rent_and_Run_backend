import mongoose from "mongoose";
import Joi from "joi";

const genreSchema = mongoose.Schema({
  name: { type: String, minLength: 5, maxLength: 50, required: true },
  date: { type: Date, default: Date.now },
});

const Genre = mongoose.model("Genre", genreSchema);

const validateGenre = (genre) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
  });

  return schema.validate(genre);
};

export { Genre, validateGenre as validate, genreSchema };
