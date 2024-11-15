import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { Link, useLocation } from "react-router-dom";

export function NewPost() {
  const { user, isLoggedIn } = useUser();
  const [form, setForm] = useState({ content: "", image: "", scientist: "" });
  const [scientists, setScientists] = useState([]);

  function handleAddPost(e) {
    e.preventDefault();
    if (isLoggedIn) {
      const nameToParse = form.scientist.split(" ");
      // Capitalises 1st letter of each part of scientists name to ensure consistency with any existing db record
      // Thanks to https://www.freecodecamp.org/news/how-to-capitalize-words-in-javascript/
      const parsedName = nameToParse
        .map((word) => {
          return word[0].toUpperCase() + word.substring(1);
        })
        .join(" ");
      handleSubmitPost(parsedName);
    } else {
      console.log("Please log in to create a post");
    }
  }

  function handleSubmitPost(name) {
    const data = { ...form, scientist: name, user: user };
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
    <div>
      <form className="newPostForm">
        <label htmlFor="content">Post Content</label>
        <br />
        <textarea
          name="content"
          id="content"
          placeholder="Enter your message here..."
          onChange={handleChange}
        ></textarea>
        <br />
        <label htmlFor="image">Image Link (if applicable)</label>
        <br />
        <input
          type="text"
          id="image"
          name="image"
          placeholder="Input URL of image"
          onChange={handleChange}
        />
        <br />
        <label htmlFor="scientist">Associated scientist</label>
        <br />
        {/* Consider switching this to drop down menu of available scientists */}
        <input
          type="text"
          id="scientist"
          name="scientist"
          placeholder="Enter name of scientist"
          onChange={handleChange}
        />
        <br />
        <button onClick={handleAddPost}>Create Post</button>
      </form>
      <br />
      <Link to={"/posts"}>Go back</Link>
    </div>
  );
}
