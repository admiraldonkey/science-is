import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { Link, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function EditPost({
  scientists,
  setScientists,
  gotScientists,
  setGotScientists,
}) {
  const { user, isLoggedIn } = useUser();
  const [form, setForm] = useState({ content: "", image: "", scientist: "" });
  const [post, setPost] = useState([]);
  const { id } = useParams();

  // Retrieve the selected post data from database
  useEffect(() => {
    async function getPosts() {
      const response = await fetch(
        `https://science-is-server.onrender.com/posts/edit/${id}`
      );
      const data = await response.json();
      setPost(data);
      // Update form data to be injected as the current input values on the form
      setForm({
        content: data[0].content,
        image: data[0].image || "",
        scientist: data[0].scientist_id,
      });
    }

    getPosts();
  }, [id]);

  // Retrieves list of scientists if not already retrieved so they get added to the drop down menu
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

  // Updates form state as user changes input values
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Updates the database with the updated data
  function handleUpdatePost(e) {
    e.preventDefault();
    // Only allow posting if logged in
    if (isLoggedIn) {
      // Do not update and warn user of required fields if no data entered
      if (!form.scientist || form.scientist === "default") {
        toast.warn("Please select a scientist from the drop down list");
      } else if (!form.content) {
        toast.warn("Enter some content!");
        // Update entry in database and notify user of successful action
      } else {
        const data = { ...form, id: post[0].id };
        const response = fetch(
          `https://science-is-server.onrender.com/posts/edit/:id`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          }
        ).then(function (response) {
          if (response.status === 200) {
            toast.success("Post successfully updated!");
          } else {
            toast.error("Something went wrong");
          }
        });
      }
    } else {
      toast.warn("Please log in to create a post");
    }
  }

  return (
    <div className="form-container">
      {/* Form values updated with data retrieved from the database */}
      <form className="post-form">
        <label htmlFor="content">Post Content</label>
        <textarea
          name="content"
          id="content"
          placeholder="Enter your message here..."
          value={form.content}
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
          value={form.image}
        />
        <label htmlFor="scientist">Associated scientist</label>
        <select
          name="scientist"
          id="scientist"
          value={form.scientist}
          onChange={handleChange}
        >
          {/* Loops through list of existing scientists and adds them as options to the form */}
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
          <button onClick={handleUpdatePost}>Update Post</button>
        </div>
      </form>
      <Link to={"/posts"}>Go back</Link>
    </div>
  );
}
