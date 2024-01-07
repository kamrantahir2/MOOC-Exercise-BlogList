import express, { request, response } from "express";
const blogRouter = express.Router();
import blog from "../models/blog.js";

blogRouter.get("/", (request, response) => {
  blog.find({}).then((blogs) => {
    response.json(blogs);
  });
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
  const newBlog = new blog(request.body);

  if (!newBlog.likes) {
    newBlog.likes = 0;
  }

  if (!newBlog.title || !newBlog.url) {
    return response.status(400).end();
  }

  await newBlog.save();
  response.status(201).json(newBlog);
});

blogRouter.delete("/:id", (request, response, next) => {
  blog
    .findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => {
      next(error);
    });
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
