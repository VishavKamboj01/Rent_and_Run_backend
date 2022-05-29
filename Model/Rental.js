import mongoose from "mongoose";
import Joi from "joi";

const rentalSchema = mongoose.Schema({
  customer: {
    type: mongoose.Schema({
      name: {
        type: String,
        minLength: 5,
        maxLength: 50,
        required: true,
      },
      isGold: {
        type: Boolean,
        default: false,
      },
      phone: {
        type: String,
        minLength: 5,
        maxLength: 50,
        required: true,
      },
    }),
    required: true,
  },

  movie: {
    type: mongoose.Schema({
      title: {
        type: String,
        minLength: 5,
        maxLength: 50,
        required: true,
      },
      dailyRentalRate: {
        type: Number,
        min: 0,
        max: 255,
        required: true,
      },
    }),
  },

  dateOut: {
    type: Date,
    required: true,
    default: Date.now,
  },

  dateReturned: {
    type: Date,
  },

  rentalFee: {
    type: Number,
    required: true,
  },
});

const Rental = mongoose.model("Rental", rentalSchema);

function validateRental(rental) {
  const schema = Joi.object({
    customerId: Joi.string().required(),
    movieId: Joi.string().required(),
    rentalFee: Joi.number().min(5).max(255),
  });

  return schema.validate();
}

export { Rental, validateRental as validate };
