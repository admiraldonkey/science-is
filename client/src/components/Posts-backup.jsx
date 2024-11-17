import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { Link, useLocation } from "react-router-dom";

export default function Posts() {
  const { user, isLoggedIn } = useUser();
  const [posts, setPosts] = useState([]);
  const [scientistList, setScientistList] = useState([]);
  const [scientistFilter, setScientistFilter] = useState();

  useEffect(() => {
    async function getPosts() {
      const response = await fetch("http://localhost:8080/posts");
      const data = await response.json();
      setPosts(data);
      let scientists = [];
      data.map((post) => {
        scientists.push(post.scientist);
      });
      const listScientists = new Set(scientists);
      setScientistList(Array.from(listScientists));
    }

    getPosts();
  }, []);

  function handleLikePost(e) {
    const selectedPost = posts.find((post) => post.id == e.target.id);
    const postId = selectedPost.id;
    let newLikes = 0;
    if (selectedPost.likes) {
      newLikes = selectedPost.likes + 1;
    } else {
      newLikes = newLikes + 1;
    }
    const updateLikes = (postId, newLikes) => {
      setPosts(
        posts.map((post) =>
          post.id === postId ? { ...post, likes: newLikes } : post
        )
      );
    };
    updateLikes(postId, newLikes);
    const data = { id: postId, likes: newLikes };
    console.log(data);
    const response = fetch(`http://localhost:8080/posts`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  function handleEditPost() {
    console.log(scientistList);
  }

  function handleDeletePost(e) {
    const selectedPost = posts.find((post) => post.id == e.target.id);
    const postId = selectedPost.id;
    const removePost = (postId) => {
      setPosts(posts.map((post) => post.id != postId && { ...post }));
    };
    removePost(postId);
    const response = fetch(`http://localhost:8080/posts/${postId}`, {
      method: "DELETE",
    });
  }

  function switchFilter(e) {
    setScientistFilter(e.target.value);
  }

  function filterPosts() {
    console.log("current filter selected is: " + scientistFilter);
  }

  return (
    <div>
      <div className="posts-head">
        <div className="posts-head-left">
          <h1>Current Posts</h1>
          <label htmlFor="filter">Filter posts by scientist:</label>
          <div className="filter-div">
            <select name="filter" id="filter" onChange={switchFilter}>
              <option value="default">-- Select Scientist --</option>
              {scientistList.map((scientist) => {
                return (
                  <option key={scientist} value={scientist}>
                    {scientist}
                  </option>
                );
              })}
            </select>
            <button onClick={filterPosts}>
              <Link
                to={!scientistFilter ? `/posts` : `/posts/:${scientistFilter}`}
              >
                Filter
              </Link>
            </button>
          </div>
        </div>
        {isLoggedIn && (
          <button>
            <Link to="/newpost">Add New Post</Link>
          </button>
        )}
        {!isLoggedIn && <p>Sign in to like or make a new post</p>}
      </div>
      <div className="posts-container">
        {posts.map((post) => {
          // True if post was made by currently logged in user
          const userPosted = user === post.user ? true : false;
          if (post) {
            return (
              <div key={post.id} className="post">
                {/* Add image only if image value exists and as a link */}
                {post.image && post.image.includes("//") && (
                  <div className="post-image">
                    <img src={post.image} width="200" height="200" />
                  </div>
                )}
                <div className="post-main">
                  <div className="post-header">
                    <h3>Relevant scientist: {post.scientist}</h3>
                    <div className="post-crud-btns">
                      {/* Edit and delete options appear only for the user who made the post */}
                      {userPosted && (
                        <button id={post.id} onClick={handleEditPost}>
                          Edit Post
                        </button>
                      )}
                      {userPosted && (
                        <button id={post.id} onClick={handleDeletePost}>
                          Delete Post
                        </button>
                      )}
                      {/* User can like any post but their own, only if logged in */}
                      {!userPosted && isLoggedIn && (
                        <button id={post.id} onClick={handleLikePost}>
                          Like post
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="post-content">
                    <p>{post.content}</p>
                  </div>
                  <div className="post-info">
                    <h4>Posted by: {post.user}</h4>
                    <div className="post-likes">
                      {post.likes ? (
                        <h5>Liked {post.likes} times</h5>
                      ) : (
                        <h5>Liked 0 times</h5>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
