import express, { request } from "express";
const blogRouter = express.Router();
import blog from "../models/blog.js";

blogRouter.get("/", (request, response) => {
  blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogRouter.get("/:id", (request, response) => {
  blog.findById(request.params.id).then((foundBlog) => {
    response.json(foundBlog);
  });
});

export default blogRouter;
