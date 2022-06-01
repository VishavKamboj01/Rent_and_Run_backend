import request from "supertest";
import { User } from "../../Model/User.js";
import { Genre } from "../../Model/Genre.js";
import "jest";

let server;
let token;

describe("auth/", () => {
  beforeEach(async () => {
    token = new User().generateAuthToken();
    server = require("../../index.js");
  });

  afterEach(async () => {
    server.close();
    await Genre.remove({});
  });

  const exec = () => {
    return request(server)
      .post("/api/genres")
      .set("x-auth-token", token)
      .send({ name: "genre1" });
  };

  it("should return 401 if the token is not provided.", async () => {
    token = "";
    const result = await exec();
    expect(result.status).toBe(401);
  });

  it("should return 400 if the token is invalid.", async () => {
    token = "aa";
    const result = await exec();
    expect(result.status).toBe(400);
  });

  it("should return 200 if the token is valid.", async () => {
    const result = await exec();
    expect(result.status).toBe(200);
  });
});
