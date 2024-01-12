import express, { request, response } from "express";
const blogRouter = express.Router();
import blog from "../models/blog.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import "express-async-errors";
import dotenv from "dotenv";
dotenv.config();

blogRouter.get("/", async (request, response) => {
  const blogs = await blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  response.json(blogs);
});

blogRouter.get("/:id", (request, response, next) => {
  blog
    .findById(request.params.id)
    .then((foundBlog) => {
      response.json(foundBlog);
    })
    .catch((error) => {
      next(error);
    });
});

blogRouter.post("/", async (request, response, next) => {
  const body = request.body;

  if (!request.userId) {
    return response.status(401).json({ error: "token invalid" });
  }

  const user = await User.findById(request.userId);

  const newBlog = new blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  });

  if (!newBlog.likes) {
    newBlog.likes = 0;
  }

  if (!newBlog.title || !newBlog.url) {
    return response.status(400).end();
  }

  const savedBlog = await newBlog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(newBlog);
});

blogRouter.delete("/:id", async (request, response, next) => {
  const foundBlog = await blog.findById(request.params.id);
  const blogUserId = foundBlog.user.toString();
  if (request.userId !== blogUserId) {
    response.status(401).json({ error: "User not authorized" });
  }
  await blog.deleteOne(foundBlog);
  response.status(204).end();
});

blogRouter.put("/:id", async (request, response, next) => {
  if (!request.body.title || !request.body.url) {
    return response.status(400).end();
  }

  try {
    await blog.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
    });

    response.status(200).json(request.body);
  } catch (err) {
    next(err);
  }
});

export default blogRouter;
