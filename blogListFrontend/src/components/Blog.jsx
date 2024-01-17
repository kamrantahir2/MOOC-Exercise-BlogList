import { useRef } from "react";
import Togglable from "./Togglable.jsx";
import PropTypes from "prop-types";

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

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  blogRef: PropTypes.object.isRequired,
};

export default Blog;
