import { useEffect, useState } from "react";
import "./App.css";
import login from "./services/login.js";
import blogService from "./services/blogs.js";
import Blog from "./components/Blog.jsx";

function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    blogService.getAll().then((response) => {
      setBlogs(response);
      console.log(response);
    });
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await login({ username, password });
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  if (!user) {
    return (
      <>
        <h3>{errorMessage}</h3>
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
      <h1>Blogs</h1>
      <ul>
        {blogs.map((blog) => {
          return <Blog key={blog.id} blog={blog} />;
        })}
      </ul>
    </div>
  );
}

export default App;
