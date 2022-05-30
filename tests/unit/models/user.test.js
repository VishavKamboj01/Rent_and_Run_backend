import { User } from "../../../Model/User.js";
import jwt from "jsonwebtoken";
import config from "config";
import mongoose from "mongoose";

describe("generateAuthToken", () => {
  it("should return a valid json web token", () => {
    const payload = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      name: "b",
      isAdmin: true,
    };

    const user = new User(payload);
    const token = user.generateAuthToken();
    const result = jwt.verify(token, config.get("jwtPrivateKey"));

    expect(result).toMatchObject(payload);
  });
});
