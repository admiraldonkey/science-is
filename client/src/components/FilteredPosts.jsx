import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function FilteredPosts() {
  const [posts, setPosts] = useState([]);
  const { scientist } = useParams();

  // Fetch posts filtered by a specific scientist
  useEffect(() => {
    async function getPosts() {
      const response = await fetch(
        `https://science-is-server.onrender.com/posts/${scientist}`
      );
      const data = await response.json();
      setPosts(data);
    }

    getPosts();
  }, [scientist]);

  return (
    <div>
      <div className="posts-head">
        <h1>{scientist}</h1>
      </div>
      <div className="posts-container">
        {/* Loop through filtered posts and render the data for each on page */}
        {posts.map((post) => {
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
                    <h3>Scientist: {post.scientist}</h3>
                    <div className="post-crud-btns"></div>
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
        <Link to={"/posts"}>Go back</Link>
      </div>
    </div>
  );
}
