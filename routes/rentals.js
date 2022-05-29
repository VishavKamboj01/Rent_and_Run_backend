import express from "express";
import { Rental, validate } from "../Model/Rental.js";
import { Customer } from "../Model/Customer.js";
import { Movie } from "../Model/Movie.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const rentals = await Rental.find();
  res.send(rentals);
});

router.post("/", async (req, res) => {
  const newRental = req.body;
  const { error } = validate(newRental);

  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(newRental.customerId);
  if (!customer) return res.status(400).send("Invalid Customer ID!");

  const movie = await Movie.findById(newRental.movieId);
  if (!movie) return res.status(400).send("Invalid Movie ID!");

  const rental = createRental(newRental, customer, movie);
  const result = await rental.save();

  res.send(result);
});

function createRental(newRental, customer, movie) {
  const rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      isGold: customer.isGold,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
    dateOut: newRental.dateOut,
    rentalFee: newRental.rentalFee,
  });

  return rental;
}

export default router;
