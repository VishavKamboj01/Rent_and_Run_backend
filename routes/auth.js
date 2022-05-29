import express from "express";
import Joi from "joi";
import bcrypt from "bcrypt";

import { User } from "../Model/User.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password!");

  const isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) return res.status(400).send("Invalid email or password!");

  const token = user.generateAuthToken();
  res.send(token);
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(8).max(255).required().email(),
    password: Joi.string().min(8).max(255).required(),
  });

  return schema.validate();
}

export default router;
