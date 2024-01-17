import { useEffect, useRef, useState } from "react";
import "./App.css";
import blogService from "./services/blogs.js";
import Blog from "./components/Blog.jsx";
import loginService from "./services/login.js";
import BlogForm from "./components/BlogForm.jsx";
import Togglable from "./components/Togglable.jsx";

function App() {
  const [message, setMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [style, setStyle] = useState(null);

  const blogFormRef = useRef();
  const blogInfoRef = useRef();

  const addBlog = (blog) => {
    blogFormRef.current.toggleVisibility();
    blogService.create(blog).then((returned) => {
      setBlogs(blogs.concat(returned));
    });
  };

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
      console.log(blogs);
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

  const handleDelete = async (id) => {
    try {
      await blogService.deleteBlog(id);
      const allBlogs = await blogService.getAll();
      setBlogs(allBlogs);
      setMessage("Blog has been deleted");
      setStyle("message");
      resetMessage();
    } catch (error) {
      setMessage("Unauthorized user", error);
      setStyle("error");
      resetMessage();
    }
  };

  const handleUpdate = async (id) => {
    const blog = await blogService.getById(id);
    const updatedLikes = blog.likes + 1;
    const updatedBlog = { ...blog, likes: updatedLikes };
    await blogService.update(id, updatedBlog);
    const blogList = await blogService.getAll();
    setBlogs(blogList);
  };

  const blogForm = () => {
    return (
      <Togglable buttonLabel="New blog" ref={blogFormRef}>
        <BlogForm
          setMessage={setMessage}
          setStyle={setStyle}
          resetMessage={resetMessage}
          createBlog={addBlog}
        />
      </Togglable>
    );
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

      {blogForm()}

      <div>
        {blogs.map((blog) => {
          return (
            <Blog
              key={blog.id}
              blog={blog}
              handleDelete={() => handleDelete(blog.id)}
              blogRef={blogInfoRef}
              update={() => handleUpdate(blog.id)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
