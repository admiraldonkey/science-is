import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { Link, useLocation } from "react-router-dom";

export function NewPost({
  scientists,
  setScientists,
  gotScientists,
  setGotScientists,
}) {
  const { user, isLoggedIn } = useUser();
  const [form, setForm] = useState({ content: "", image: "", scientist: "" });
  //   const [scientists, setScientists] = useState([]);
  //   const gotScientists = scientists.length > 0 ? true : false;

  useEffect(() => {
    async function getScientists() {
      const response = await fetch("http://localhost:8080/scientists");
      const data = await response.json();
      setScientists(data);
      setGotScientists(true);
    }
    if (!gotScientists) {
      getScientists();
    }
  }, [gotScientists, setScientists, setGotScientists]);

  function handleAddPost(e) {
    e.preventDefault();
    if (isLoggedIn) {
      if (form.scientist === "default") {
        console.log("Please select a scientist from the drop down list");
      } else {
        handleSubmitPost();
      }
    } else {
      console.log("Please log in to create a post");
    }
  }

  function handleSubmitPost() {
    const scientistId = parseInt(form.scientist);
    const data = { ...form, scientist: scientistId, user: user };
    console.log("data submitted: ", data);
    const response = fetch(`http://localhost:8080/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <div className="form-container">
      <form className="post-form">
        <label htmlFor="content">Post Content</label>
        <textarea
          name="content"
          id="content"
          placeholder="Enter your message here..."
          onChange={handleChange}
        ></textarea>
        <label htmlFor="image">Image Link (if applicable)</label>
        <input
          type="text"
          id="image"
          name="image"
          placeholder="Input URL of image"
          onChange={handleChange}
        />
        <label htmlFor="scientist">Associated scientist</label>
        <select name="scientist" id="scientist" onChange={handleChange}>
          <option value="default">--Select a scientist--</option>
          {scientists.map((scientist) => {
            return (
              <option key={scientist.id} value={scientist.id}>
                {scientist.name}
              </option>
            );
          })}
        </select>
        <div className="submit-button">
          <button onClick={handleAddPost}>Create Post</button>
        </div>
      </form>
      <Link to={"/posts"}>Go back</Link>
    </div>
  );
}
