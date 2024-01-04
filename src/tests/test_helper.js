import Blog from "../models/blog.js";

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

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

export default { initialBlogs, blogsInDb };
