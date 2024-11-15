import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function FilteredPosts() {
  const [posts, setPosts] = useState([]);
  const { scientist } = useParams();

  useEffect(() => {
    async function getPosts() {
      const response = await fetch(`http://localhost:8080/posts/${scientist}`);
      const data = await response.json();
      setPosts(data);
    }

    getPosts();
  }, [scientist]);

  return (
    <div>
      <h1>Posts featuring {scientist}</h1>
      {posts.map((post) => {
        // True if post was made by currently logged in user
        //   const userPosted = user === post.user ? true : false;
        if (post) {
          return (
            <div key={post.id} className="post">
              {/* Add image only if image value exists and as a link */}
              {post.image && post.image.includes("//") && (
                <img src={post.image} width="200" height="200" />
              )}
              <p>{post.content}</p>
              {post.likes ? (
                <h5>Liked {post.likes} times</h5>
              ) : (
                <h5>Liked 0 times</h5>
              )}
              <h3>Relevant scientist: {post.scientist}</h3>
              <h4>Posted by: {post.user}</h4>
            </div>
          );
        }
      })}
    </div>
  );
}
