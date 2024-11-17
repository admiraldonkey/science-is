import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";

export default function User() {
  const [form, setForm] = useState({ user: "" });
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useUser();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      const response = await fetch("http://localhost:8080/users");
      const data = await response.json();
      setUsers(data);
    }
    if (!isLoggedIn) {
      getUsers();
    }
  }, [isLoggedIn]);

  function handleUserLogin(e) {
    e.preventDefault();
    const userExists = users.find((username) => username.name === form.user);
    if (userExists) {
      console.log(`Welcome back, ${userExists.name}!`);
    } else {
      createNewUser();
      console.log(`New user created. Welcome, ${form.user}!`);
    }
    setIsLoggedIn(true);
    setUser(form.user);
  }

  function handleSignOut() {
    setForm({ ...form, [form.name]: "" });
    setIsLoggedIn(false);
    setUser(null);
  }

  async function createNewUser() {
    const data = { name: form.user };
    console.log(data);
    const response = fetch(`http://localhost:8080/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  function handleChange(e) {
    const value = e.target.value.toLowerCase();
    setForm({ ...form, [e.target.name]: value });
  }

  return (
    <div className="user-login">
      {isLoggedIn && (
        <div>
          <span>
            Logged in as: <span className="user-name">{user}</span>
          </span>
          <button onClick={handleSignOut}>Sign out</button>
        </div>
      )}
      {!isLoggedIn && (
        <form onSubmit={handleUserLogin}>
          <input
            type="text"
            name="user"
            placeholder="Enter username"
            onChange={handleChange}
          />
          <button>Login</button>
        </form>
      )}
    </div>
  );
}
