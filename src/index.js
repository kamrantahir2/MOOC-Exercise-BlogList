import config from "./utils/config.js";
import app from "./app.js";
import Blog from "./models/blog.js";

// import mongoose from "mongoose";

// const blogSchema = new mongoose.Schema({
//   title: String,
//   author: String,
//   url: String,
//   likes: Number,
// });

// const Blog = mongoose.model("Blog", blogSchema);

// app.get("/api/blogs", (request, response) => {
//   Blog.find({}).then((blogs) => {
//     response.json(blogs);
//   });
// });

const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
