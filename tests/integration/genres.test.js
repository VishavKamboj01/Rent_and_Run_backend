let server;
import request from "supertest";
import { Genre } from "../../Model/Genre.js";
import mongoose from "mongoose";
import { User } from "../../Model/User.js";

describe("/api/genres", () => {
  beforeEach(() => {
    server = require("../../index");
  });

  afterEach(async () => {
    server.close();
    await Genre.remove({});
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
      expect(result.body.some((g) => g.name === "genre1")).toBeTruthy();
      expect(result.body.some((g) => g.name === "genre2")).toBeTruthy();
    });
  });
  describe("GET /:id", () => {
    it("Should return a genre with the given id", async () => {
      const genre = new Genre({ name: "genre1" });
      await genre.save();

      const endPoint = `/api/genres/${genre._id}`;
      const res = await request(server).get(endPoint);

      expect(res.status).toBe(200);
      expect(res.body.name).toBe("genre1");
    });
    it("Should return 404 status not found!", async () => {
      const id = new mongoose.Types.ObjectId();

      const endPoint = `/api/genres/${id}`;
      const res = await request(server).get(endPoint);

      expect(res.status).toBe(404);
    });
  });

  //Testing the Authorization
  describe("POST /", () => {
    let token;
    let name;

    const exec = async () => {
      return await request(server)
        .post("/api/genres")
        .set("x-auth-token", token)
        .send({ name });
    };

    beforeEach(() => {
      token = new User().generateAuthToken();
      name = "genre1";
    });

    it("should return 401 if the user is not logged in", async () => {
      token = "";
      const res = await exec();

      expect(res.status).toBe(401);
    });

    it("should return 400 if the genre length is less than 5", async () => {
      name = "aaaa";
      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if the genre length greater than 50", async () => {
      name = new Array().join("a");
      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should save the genre if it is valid", async () => {
      const res = await exec();
      const result = Genre.findById(res.body._id);

      expect(result).not.toBeNull();
    });

    it("should return the genre after saving", async () => {
      const res = await exec();
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", "genre1");
    });
  });

  describe("PUT /", () => {
    let id;

    beforeEach(async () => {
      const genre = new Genre({ name: "genre1" });
      id = genre._id;
      await genre.save();
    });

    afterEach(async () => {
      server.close();
      await Genre.remove({});
    });

    it("should return 400 if the id is not valid Object ID", async () => {
      id = "afdjksajfkdsjf";
      const genre = { name: "updatedGenre" };
      const result = await request(server).put(`/api/genres/${id}`).send(genre);

      expect(result.status).toBe(400);
    });

    it("should return 404 if the genre ID is invalid", async () => {
      id = mongoose.Types.ObjectId();

      const genre = { name: "updatedGenre" };
      const result = await request(server).put(`/api/genres/${id}`).send(genre);

      expect(result.status).toBe(404);
    });

    it("should return 400 if the genre is invalid", async () => {
      const genre = { name: "gn" };
      const result = await request(server).put(`/api/genres/${id}`).send(genre);

      expect(result.status).toBe(400);
    });

    it("should return 200 and updated genre if the ID and genre is valid", async () => {
      const genre = { name: "updatedGenre" };
      const result = await request(server).put(`/api/genres/${id}`).send(genre);

      expect(result.status).toBe(200);
      expect(result.body).toMatchObject(genre);
    });
  });
});
