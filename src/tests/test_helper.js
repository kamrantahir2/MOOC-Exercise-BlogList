import Blog from "../models/blog.js";
import User from "../models/user.js";

const initialBlogs = [
  {
    title: "First blog",
    author: "First author",
    url: "url",
    likes: 12,
  },
  {
    title: "Second blog",
    author: "Second author",
    url: "url",
    likes: 12,
  },
  {
    title: "First blog",
    author: "First author",
    url: "url",
    likes: 12,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: "temp",
    author: "temp",
    url: "temp",
    likes: 12,
  });

  await blog.save();
  await blog.deleteOne();
  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};
const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

export default { initialBlogs, blogsInDb, nonExistingId, usersInDb };
