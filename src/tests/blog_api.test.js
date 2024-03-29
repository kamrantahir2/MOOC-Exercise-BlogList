import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app.js";
import Blog from "../models/blog.js";
import helper from "./test_helper.js";
import User from "../models/user.js";

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const user = {
    name: "test",
    username: "test",
    password: "test",
  };

  const unauthorizedUser = {
    name: "unauthorized",
    username: "unauthorized",
    password: "unauthorized",
  };

  await api.post("/api/users").send(user);
  await api.post("/api/users").send(unauthorizedUser);

  const found = await User.findOne({ name: user.name });

  const userId = await found._id.toString();

  const blogs = helper.initialBlogs;

  blogs.map((blog) => {
    blog.user = userId;
  });

  const blogObjects = helper.initialBlogs.map((blog) => {
    return new Blog(blog);
  });

  const token = await getUserToken({
    username: "test",
    password: "test",
  });

  console.log("OBJECTS", blogObjects);
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

const getUserToken = async (details) => {
  const resp = await api.post("/api/login").send(details);

  return resp.body.token;
};

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

  test("valid blog is successfully added", async () => {
    const validBlog = {
      title: "First blog",
      author: "First author",
      url: "url",
      likes: 12,
    };

    const token = await getUserToken({ username: "test", password: "test" });

    await api
      .post("/api/blogs")
      .send(validBlog)
      .set({ Authorization: `Bearer ${token}` })
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  });

  test("blog without likes property is set to 0 likes", async () => {
    const validBlog = {
      title: "First blog",
      author: "First author",
      url: "url",
    };

    const token = await getUserToken({ username: "test", password: "test" });

    await api
      .post("/api/blogs")
      .send(validBlog)
      .set({ Authorization: `Bearer ${token}` })
      .expect(201);

    let blogsAtEnd = await helper.blogsInDb();

    blogsAtEnd = await helper.blogsInDb();

    const length = blogsAtEnd.length - 1;

    expect(blogsAtEnd[length].likes).toEqual(0);
  });

  test("blog without title or url property is not added", async () => {
    const invalidBlog = {
      author: "First author",
      likes: 12,
    };

    const token = `Bearer ${await getUserToken({
      username: "test",
      password: "test",
    })}`;

    await api
      .post("/api/blogs")
      .set({ Authorization: token })
      .send(invalidBlog)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd.length).toEqual(helper.initialBlogs.length);
  });

  test("existing blog can be successfully deleted", async () => {
    let savedBlogs = await helper.blogsInDb();
    const id = savedBlogs[0].id;

    const token = `Bearer ${await getUserToken({
      username: "test",
      password: "test",
    })}`;

    await api
      .delete(`/api/blogs/${id}`)
      .set({ Authorization: token })
      .expect(204);

    savedBlogs = await helper.blogsInDb();

    expect(savedBlogs.length).toEqual(helper.initialBlogs.length - 1);
  });

  test("existing blog can be successfully updated", async () => {
    let savedBlogs = await helper.blogsInDb();
    const id = savedBlogs[0].id;

    const updatedBlog = { ...savedBlogs[0], likes: savedBlogs[0].likes + 1 };

    await api.put(`/api/blogs/${id}`).send(updatedBlog).expect(200);

    savedBlogs = await helper.blogsInDb();

    const originalLikes = helper.initialBlogs[0].likes;

    expect(savedBlogs[0].likes).toEqual(originalLikes + 1);
  });

  test("blog added without token returns 401 error", async () => {
    const validBlog = {
      title: "First blog",
      author: "First author",
      url: "url",
    };

    await api.post("/api/blogs").send(validBlog).expect(401);

    const blogsAtStart = helper.initialBlogs;
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
