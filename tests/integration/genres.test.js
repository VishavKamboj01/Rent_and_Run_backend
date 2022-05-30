let server;
import request from "supertest";
import { Genre } from "../../Model/Genre.js";

describe("/api/genres", () => {
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(async () => {
    await Genre.remove({});
    server.close();
  });

  describe("GET /", () => {
    it("should return the list of genres", async () => {
      //Inserting multiple Genres
      await Genre.collection.insertMany([
        { name: "genre1" },
        { name: "genre2" },
      ]);

      //Making get request
      const result = await request(server).get("/api/genres");

      expect(result.status).toBe(200);
      expect(result.body.length).toBe(2);

      expect(result.body.some((g) => g.name === "genre1")).toBeTruthy();
      expect(result.body.some((g) => g.name === "genre2")).toBeTruthy();
    });
  });
});
