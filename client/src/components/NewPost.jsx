import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export function NewPost({
  scientists,
  setScientists,
  gotScientists,
  setGotScientists,
}) {
  const { user, isLoggedIn } = useUser();
  const [form, setForm] = useState({ content: "", image: "", scientist: "" });

  // Retrieve list of scientists from database if not already retrieved
  useEffect(() => {
    async function getScientists() {
      const response = await fetch(
        "https://science-is-server.onrender.com/scientists"
      );
      const data = await response.json();
      setScientists(data);
      setGotScientists(true);
    }
    if (!gotScientists) {
      getScientists();
    }
  }, [gotScientists, setScientists, setGotScientists]);

  // Handles click to add the post
  function handleAddPost(e) {
    e.preventDefault();
    // Conditions to only allow logged in users to login and will not post until required fields are updated. User notified as relevant.
    if (isLoggedIn) {
      if (!form.scientist || form.scientist === "default") {
        toast.warn("Please select a scientist from the drop down list");
      } else if (!form.content) {
        toast.warn("Enter some content!");
      } else {
        handleSubmitPost();
      }
    } else {
      toast.warn("Please log in to create a post");
    }
  }

  // Submits the post to the database and notifies the user of result
  function handleSubmitPost() {
    const scientistId = parseInt(form.scientist);
    const data = { ...form, scientist: scientistId, user: user };
    const response = fetch(`https://science-is-server.onrender.com/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(function (response) {
      if (response.status === 200) {
        toast.success("Post successfully added!");
      } else {
        toast.error("Something went wrong");
      }
    });
  }

  // Update form state as user changes form values
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
          rows="10"
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
          {/* Loops through existing scientists and adds each as an option in drop down menu */}
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
