import { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  return (
    <>
      <h2>Log in to application</h2>
      <div>
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
          <button>Submit</button>
        </div>
      </div>
    </>
  );
}

export default App;
