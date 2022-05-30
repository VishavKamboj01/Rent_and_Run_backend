import express from "express";
import Joi from "joi";
import { Customer, validate } from "../Model/Customer.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const customers = await Customer.find().select("name phone");
  res.send(customers);
});

router.get("/:id", async (req, res) => {
  const customer = await Customer.findById({ _id: req.params.id });
  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found!");

  res.send(customer);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });

  const result = await customer.save();
  res.send(result);
});

router.put("/:id", async (req, res) => {
  const newCustomer = req.body;
  const { error } = validate(newCustomer);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById({ _id: req.params.id });
  customer.name = newCustomer.name;
  customer.phone = newCustomer.phone;
  customer.isGold = newCustomer.isGold;

  const result = await customer.save();
  res.send(result);
});

router.delete("/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(400).send("Invalid ID!");

    customer.deleteOne({ _id: req.params.id });

    res.send(customer);
  } catch (err) {
    res.send("Invalid ID ");
  }
});

export default router;
