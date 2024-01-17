import { useRef } from "react";
import Togglable from "./Togglable.jsx";

const Blog = ({ blog, handleDelete, blogRef, update }) => {
  return (
    <>
      <div>Title: {blog.title}</div>
      <Togglable buttonLabel="View blog info" ref={blogRef}>
        <div>Author: {blog.author}</div>
        <div>Likes: {blog.likes}</div>
        <div>URL: {blog.url}</div>
        <div>User: {blog.user.name}</div>
        <button onClick={update}>Like</button>
        <button onClick={handleDelete}>Delete</button>
      </Togglable>
      <div>------</div>
    </>
  );
};

export default Blog;
