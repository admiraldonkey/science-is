import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { Link, useLocation } from "react-router-dom";

export function NewScientist(setGotScientists) {
  const { isLoggedIn } = useUser();
  const [form, setForm] = useState({ name: "", image: "", bio: "" });
  const { state } = useLocation();

  function handleAddScientist(e) {
    e.preventDefault();
    if (isLoggedIn) {
      const alreadyExists = state.find(
        (scientist) => scientist.name === form.name
      );
      if (alreadyExists) {
        console.log("This scientist has already been added!");
      } else {
        console.log("call to post scientist");
        postScientist();
      }
    } else {
      console.log("You need to be logged in to do that!");
    }
  }

  function postScientist() {
    const data = { ...form };
    console.log(data);
    const response = fetch(`http://localhost:8080/scientists`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setGotScientists(false);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name of Scientist</label>
        <br />
        <input
          type="text"
          id="name"
          placeholder="Enter Name"
          name="name"
          onChange={handleChange}
        />
        <br />
        <label htmlFor="image">Picture</label>
        <br />
        <input
          type="text"
          id="image"
          placeholder="Enter URL of image"
          name="image"
          onChange={handleChange}
        />
        <br />
        <label htmlFor="bio">A short biography</label>
        <br />
        <textarea
          id="bio"
          placeholder="Enter bio"
          name="bio"
          onChange={handleChange}
        ></textarea>
        <button onClick={handleAddScientist}>Add</button>
      </form>
      <br />
      <Link to={"/scientists"}>Go back</Link>
    </div>
  );
}
