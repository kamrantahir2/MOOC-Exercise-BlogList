import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model("Blog", blogSchema);

const blogObject = new Blog({
  title: "Title",
  author: "String",
  url: "String",
  likes: 0,
});

export default { Blog };
