import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { Link, useLocation, useParams } from "react-router-dom";

export default function EditPost({
  scientists,
  setScientists,
  gotScientists,
  setGotScientists,
}) {
  const { user, isLoggedIn } = useUser();
  const [form, setForm] = useState({ content: "", image: "", scientist: "" }); //{ content: "", image: "", scientist: "" }
  const [post, setPost] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function getPosts() {
      const response = await fetch(`http://localhost:8080/posts/edit/${id}`);
      const data = await response.json();
      setPost(data);
      setForm({
        content: data[0].content,
        image: data[0].image,
        scientist: data[0].scientist_id,
      });
    }

    getPosts();
  }, [id]);

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

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleUpdatePost(e) {
    e.preventDefault();
    const data = { ...form, id: post[0].id };
    const response = fetch(`http://localhost:8080/posts/edit/:id`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  return (
    <div className="form-container">
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

// Figure out how to not have input state not 1 change behind actual state.
