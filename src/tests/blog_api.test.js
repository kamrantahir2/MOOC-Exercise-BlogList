import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app.js";
import Blog from "../models/blog.js";
import helper from "./test_helper.js";

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe("api tests", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("blog contains id parameter", async () => {
    const response = await api.get("/api/blogs");
    const contents = response.body;
    contents.forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
  });
});

test("valid blog is successfully added", async () => {
  const validBlog = {
    title: "First blog",
    author: "First author",
    url: "url",
    likes: 12,
  };

  await api
    .post("/api/blogs")
    .send(validBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
});

afterAll(async () => {
  await mongoose.connection.close();
});
