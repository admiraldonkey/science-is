import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { toast } from "react-toastify";

export default function User() {
  const [form, setForm] = useState({ user: "" });
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useUser();

  const [users, setUsers] = useState([]);

  // Retrieve registered users from database
  useEffect(() => {
    async function getUsers() {
      const response = await fetch("http://localhost:8080/users");
      const data = await response.json();
      setUsers(data);
    }
    // Only need to do if user is not logged in
    if (!isLoggedIn) {
      getUsers();
    }
  }, [isLoggedIn]);

  function handleUserLogin(e) {
    e.preventDefault();
    const userExists = users.find((username) => username.name === form.user);
    // If user already registered, logs them in. Else, registeres a new user to database and logs them in.
    if (userExists) {
      toast.success(`Welcome back, ${form.user}!`);
    } else {
      createNewUser();
      toast.success(`New user created. Welcome, ${form.user}!`);
    }
    setIsLoggedIn(true);
    setUser(form.user);
  }

  // Logs out user and updates appropriate states
  function handleSignOut() {
    setForm({ ...form, [form.name]: "" });
    setIsLoggedIn(false);
    setUser(null);
  }

  // Adds a new user to the database
  async function createNewUser() {
    const data = { name: form.user };
    const response = fetch(`http://localhost:8080/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  // Keeps track of value typed into login input box
  function handleChange(e) {
    const value = e.target.value.toLowerCase();
    setForm({ ...form, [e.target.name]: value });
  }

  return (
    <div className="user-login">
      {/* Conditionally render input field and button or 'logged in as' message as relevant */}
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
