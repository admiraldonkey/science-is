import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export function NewScientist(setGotScientists) {
  const { isLoggedIn } = useUser();
  const [form, setForm] = useState({ name: "", image: "", bio: "" });
  const { state } = useLocation();

  // Handles user pressing button to add scientist
  function handleAddScientist(e) {
    e.preventDefault();
    // Only allow if user is logged in.
    if (isLoggedIn) {
      // Checks through existing scientists to see if user is attempting to post a duplicate. Informs user if this is the case.
      const alreadyExists = state.find(
        (scientist) => scientist.name === form.name
      );
      if (alreadyExists) {
        toast.error(`This scientist has already been added!`);
      } else {
        postScientist();
      }
    } else {
      toast.error(`You must be logged in to do that!`);
    }
  }

  // Adds the scientist to the database and notifies user of result
  function postScientist() {
    const data = { ...form };
    // Will only update db if required fields are filled.
    if (!data.name || !data.image || !data.bio) {
      toast.warn("All fields are required!");
    } else {
      const response = fetch(
        `https://science-is-server.onrender.com/scientists`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      ).then(function (response) {
        if (response.status === 200) {
          toast.success("Scientist successfully added!");
        } else {
          toast.error("Something went wrong");
        }
      });
      // Updates state so updated scientists are retrieved from db.
      setGotScientists(false);
    }
  }
  // Updates form data as user changes values
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <div className="form-container">
      <form className="scientist-form">
        <label htmlFor="name">Name of Scientist</label>
        <input
          type="text"
          id="name"
          placeholder="Enter Name"
          name="name"
          onChange={handleChange}
          required
        />
        <label htmlFor="image">Picture</label>
        <input
          type="text"
          id="image"
          placeholder="Enter URL of image"
          name="image"
          onChange={handleChange}
        />
        <label htmlFor="bio">A short biography</label>
        <textarea
          id="bio"
          placeholder="Enter bio"
          name="bio"
          rows="10"
          onChange={handleChange}
          required
        ></textarea>
        <div className="submit-button">
          <button onClick={handleAddScientist}>Add</button>
        </div>
      </form>
      <Link to={"/scientists"}>Go back</Link>
    </div>
  );
}
