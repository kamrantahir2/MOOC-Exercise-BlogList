import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app.js";

const api = supertest(app);

describe("api tests", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});
