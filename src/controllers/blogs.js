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

blogRouter.post("/", (request, response, next) => {
  const newBlog = new blog(request.body);

  newBlog
    .save()
    .then((result) => {
      response.status(201).json(result);
    })
    .catch((error) => {
      next(error);
    });
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

export default blogRouter;
