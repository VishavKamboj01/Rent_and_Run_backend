import express from "express";
import bcrypt from "bcrypt";
import _ from "lodash";
import auth from "../middleware/auth.js";

import { User, validate } from "../Model/User.js";
const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  const newUser = req.body;
  const { error } = validate(newUser);

  if (error) return res.status(400).send(error.details[0].message);

  const user = new User(_.pick(newUser, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  try {
    const result = await user.save();
    const token = user.generateAuthToken();

    res
      .header("x-auth-token", token)
      .send(_.pick(result, ["_id", "name", "email"]));
  } catch (err) {
    res.send(err.message);
  }
});

export default router;
