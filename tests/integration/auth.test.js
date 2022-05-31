import request from "supertest";
import { User } from "../../Model/User.js";

describe("auth/", () => {
  let server;
  let token;

  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(() => {
    server.close();
  });

  beforeEach(() => {
    token = new User().generateAuthToken();
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
});
