import { useRef } from "react";
import Togglable from "./Togglable.jsx";
import PropTypes from "prop-types";

const Blog = ({ blog, handleDelete, blogRef, update }) => {
  return (
    <div className="blogDiv">
      <div className="blogTitle">Title: {blog.title}</div>
      <div className="blogAuthor">Author: {blog.author}</div>

      <Togglable buttonLabel="View blog info" ref={blogRef}>
        <div className="likes">Likes: {blog.likes}</div>
        <div className="url">URL: {blog.url}</div>
        <div>User: {blog.user.name}</div>
        <button onClick={update}>Like</button>
        <button onClick={handleDelete}>Delete</button>
      </Togglable>
      <div>------</div>
    </div>
  );
};

// Blog.propTypes = {
//   blog: PropTypes.object.isRequired,
//   handleDelete: PropTypes.func.isRequired,
//   update: PropTypes.func.isRequired,
//   blogRef: PropTypes.object.isRequired,
// };

export default Blog;
