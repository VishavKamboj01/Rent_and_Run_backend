import { User } from "../../../Model/User.js";
import auth from "../../../middleware/auth.js";
import mongoose from "mongoose";

describe("auth middleware", () => {
  it("should return payload if the token is valid.", () => {
    const user = {
      _id: mongoose.Types.ObjectId().toHexString(),
      name: "Vishavjeet",
      isAdmin: true,
    };
    const token = new User(user).generateAuthToken();

    const req = {
      header: jest.fn().mockReturnValue(token),
    };
    const res = {};
    const next = jest.fn();

    auth(req, res, next);

    expect(req.user).toMatchObject(user);
  });
});
