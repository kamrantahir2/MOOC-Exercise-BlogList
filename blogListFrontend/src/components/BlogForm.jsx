import { useState } from "react";

const BlogForm = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [likes, setLikes] = useState("");

  const handleCreate = async (event) => {
    event.preventDefault();
    if (!title || !author | !url) {
      props.setMessage("Blog must have a title, author and URL");
      props.setStyle("error");
      props.resetMessage();
      return;
    }
    const blog = { title, author, url, likes };
    props.createBlog(blog);
    props.setMessage("New blog has been added");
    props.setStyle("message");
    props.resetMessage();
  };

  return (
    <form onSubmit={handleCreate}>
      <div>
        Title:{" "}
        <input
          type="text"
          onChange={({ target }) => setTitle(target.value)}
          className="titleInput"
        />
      </div>

      <div>
        Author:{" "}
        <input
          type="text"
          onChange={({ target }) => setAuthor(target.value)}
          className="authorInput"
        />
      </div>

      <div>
        Url:{" "}
        <input
          type="text"
          onChange={({ target }) => setUrl(target.value)}
          className="urlInput"
        />
      </div>

      <div>
        Likes:{" "}
        <input
          type="text"
          onChange={({ target }) => setLikes(target.value)}
          className="likesInput"
        />
      </div>

      <button type="submit" className="submitButton">
        Submit
      </button>
    </form>
  );
};

export default BlogForm;
