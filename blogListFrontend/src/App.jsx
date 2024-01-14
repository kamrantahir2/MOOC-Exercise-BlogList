import { useEffect, useState } from "react";
import "./App.css";
import blogService from "./services/blogs.js";
import Blog from "./components/Blog.jsx";
import loginService from "./services/login.js";

function App() {
  const [message, setMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [likes, setLikes] = useState("");
  const [style, setStyle] = useState(null);

  const resetMessage = () => {
    setTimeout(() => {
      setMessage(null);
      setStyle(null);
    }, 5000);
  };

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("loggedBlogappUser");

    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((response) => {
      setBlogs(response);
      console.log(response);
    });
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setMessage("Logged in");
      setStyle("message");
      resetMessage();
    } catch (error) {
      setMessage("Wrong credentials");
      setStyle("error");
      resetMessage();
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    blogService.setToken(null);
    setUser(null);
    setMessage("You have logged out");
    setStyle("message");
    resetMessage();
  };

  const handleCreate = async (event) => {
    try {
      event.preventDefault();
      if (!title || !author | !url) {
        setMessage("Blog must have a title, author and URL");
        setStyle("error");
        resetMessage();
        return;
      }
      const blog = { title, author, url, likes };
      const created = await blogService.create(blog);
      console.log("New blog created: ", created);
      const allBlogs = await blogService.getAll();
      setBlogs(allBlogs);
      setMessage("New blog has been added");
      setStyle("message");
      resetMessage();
    } catch (error) {
      setMessage(error);
      setStyle("error");
      resetMessage();
    }
  };

  const handleDelete = async (id) => {
    try {
      await blogService.deleteBlog(id);
      const allBlogs = await blogService.getAll();
      setBlogs(allBlogs);
      setMessage("Blog has been deleted");
      setStyle("message");
      resetMessage();
    } catch (error) {
      setMessage("Error deleting blog", error);
      setStyle("error");
      resetMessage();
    }
  };

  if (!user) {
    return (
      <>
        <div className={style}>{message}</div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            Username:{" "}
            <input
              type="text"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            Password:
            <input
              type="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </>
    );
  }

  return (
    <div>
      <div className={style}>{message}</div>
      <h2>Blogs</h2>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>Log out</button>
      <p>Create new blog:</p>

      <form onSubmit={handleCreate}>
        <div>
          Title:{" "}
          <input
            type="text"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

        <div>
          Author:{" "}
          <input
            type="text"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>

        <div>
          Url:{" "}
          <input type="text" onChange={({ target }) => setUrl(target.value)} />
        </div>

        <div>
          Likes:{" "}
          <input
            type="text"
            onChange={({ target }) => setLikes(target.value)}
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      <ul>
        {blogs.map((blog) => {
          return (
            <Blog
              key={blog.id}
              blog={blog}
              handleDelete={() => handleDelete(blog.id)}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default App;
