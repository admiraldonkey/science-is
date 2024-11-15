import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Scientists from "./components/Scientists";
import { NewScientist } from "./components/NewScientist";
import User from "./components/User";
import Posts from "./components/Posts";
import { NewPost } from "./components/NewPost";

export default function SiteRoutes({ chooseWord }) {
  return (
    <Routes>
      <Route path="/" element={<Home chooseWord={chooseWord} />} />
      <Route path="/users" element={<User />} />

      <Route path="/scientists" element={<Scientists />} />
      <Route path="/newscientist" element={<NewScientist />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/newpost" element={<NewPost />} />

      <Route path="*" element={<p>404: Page not found</p>} />
    </Routes>
  );
}
