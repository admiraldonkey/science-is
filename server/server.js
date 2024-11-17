import express, { response } from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });

app.get("/", function (request, response) {
  response.json("You can do it! I'm routing for you!");
});

app.get("/users", async function (request, response) {
  const result = await db.query("SELECT * FROM users");
  const users = result.rows;
  response.json(users);
});

app.post("/users", async function (request, response) {
  const name = request.body.name;
  const result = await db.query("INSERT INTO users (name) VALUES ($1)", [name]);
  response.json("200 OK");
});

app.get("/scientists", async function (request, response) {
  const result = await db.query("SELECT * FROM scientists");
  const scientists = result.rows;
  response.json(scientists);
});

app.post("/scientists", async function (request, response) {
  const name = request.body.name;
  const image = request.body.image;
  const bio = request.body.bio;
  const result = await db.query(
    "INSERT INTO scientists (name, image, bio) VALUES ($1, $2, $3)",
    [name, image, bio]
  );
  response.json("200 OK");
});

app.get("/posts", async function (request, response) {
  const result = await db.query(`
    SELECT
      posts.id,
      posts.content,
      posts.image,
      posts.likes,
      scientists.name AS scientist,
      users.name AS user
    FROM 
      posts
    JOIN scientists ON posts.scientist_id = scientists.id
    JOIN users ON posts.user_id = users.id `);
  const posts = result.rows;
  response.json(posts);
});

app.get("/posts/edit/:id", async function (request, response) {
  const param = request.url.split(":", [2]);
  const id = param[1];
  const result = await db.query(
    `
    SELECT
      posts.id,
      posts.content,
      posts.image,
      posts.likes,
      scientist_id,
      scientists.name AS scientist,
      users.name AS user
    FROM 
      posts
    JOIN scientists ON posts.scientist_id = scientists.id
    JOIN users ON posts.user_id = users.id
    WHERE posts.id = $1 `,
    [id]
  );
  const posts = result.rows;
  response.json(posts);
});

app.put("/posts/edit/:id", async function (request, response) {
  const id = request.body.id;
  const content = request.body.content;
  const scientist = request.body.scientist;
  const image = request.body.image;
  const result = await db.query(
    "UPDATE posts SET content = $1, image = $2, scientist_id = $3 WHERE id = $4",
    [content, image, scientist, id]
  );
  response.json("200 OK");
});

app.get("/posts/:scientist", async function (request, response) {
  const param = request.url.split(":", [2]);
  const getScientist = param[1];
  const scientist = decodeURI(getScientist);
  const results = await db.query(
    `SELECT       
      posts.id,
      posts.content,
      posts.image,
      posts.likes,
      scientists.name AS scientist,
      users.name AS user
    FROM 
      posts 
    JOIN scientists ON posts.scientist_id = scientists.id
    JOIN users ON posts.user_id = users.id
    WHERE scientist_id = (SELECT id FROM scientists WHERE name = $1)`,
    [scientist]
  );
  const posts = results.rows;
  response.json(posts);
});

app.post("/posts", async function (request, response) {
  const content = request.body.content;
  const image = request.body.image;
  const scientist = request.body.scientist;
  const user = request.body.user;
  const result = await db.query(
    `
    INSERT INTO posts (content, image, scientist_id, user_id)
    VALUES ($1, $2, $3, (SELECT id FROM users WHERE name = $4))`,
    [content, image, scientist, user]
  );
  response.json("200 OK");
});

app.put("/posts", async function (request, response) {
  const postId = request.body.id;
  const likes = request.body.likes;
  const result = await db.query("UPDATE posts SET likes = $1 WHERE id = $2", [
    likes,
    postId,
  ]);
  response.json("200 OK");
});

app.delete("/posts/:id", async function (request, response) {
  const getPostId = request.url.split("/", [3]);
  const postId = getPostId[2];
  const result = await db.query("DELETE FROM posts WHERE id=$1", [postId]);
  response.json("200 OK");
});

app.listen(8080, () => console.log("App is running on port 8080"));

// Need to figure out how to fix adding new post when scientist isnt already in db
