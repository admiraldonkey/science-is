import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { Link, useLocation } from "react-router-dom";

export default function Posts() {
  const { user, isLoggedIn } = useUser();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      const response = await fetch("http://localhost:8080/posts");
      const data = await response.json();
      setPosts(data);
    }

    getPosts();
  }, []);
  return (
    <div>
      <h1>Current Posts</h1>
      {isLoggedIn && (
        <button>
          <Link to="/newpost">Add New Post</Link>
        </button>
      )}
      <div className="posts-container">
        {posts.map((post) => {
          // True if post was made by currently logged in user
          const userPosted = user === post.user ? true : false;
          return (
            <div key={post.id} className="post">
              {post.image && <img src={post.image} width="200" height="200" />}
              <p>{post.content}</p>
              <h5>Liked {post.likes} times</h5>
              <h3>Relevant scientist: {post.scientist}</h3>
              <h4>Posted by: {post.user}</h4>
              {/* Edit and delete options appear only for the user who made the post */}
              {userPosted && <button>Edit Post</button>}
              {userPosted && <button>Delete Post</button>}
              {/* User can like any post but their own, only if logged in */}
              {!userPosted && isLoggedIn && <button>Like post</button>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
