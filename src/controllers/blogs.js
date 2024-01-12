import express, { request, response } from "express";
const blogRouter = express.Router();
import blog from "../models/blog.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// const getTokenFrom = (request) => {
//   const authorization = request.get("authorization");
//   if (authorization && authorization.startsWith("Bearer ")) {
//     return authorization.replace("Bearer ", "");
//   }
//   return null;
// };

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

  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const user = await User.findById(decodedToken.id);

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
