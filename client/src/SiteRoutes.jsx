import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Scientists from "./components/Scientists";
import { NewScientist } from "./components/NewScientist";
import User from "./components/User";
import Posts from "./components/Posts";
import { NewPost } from "./components/NewPost";
import FilteredPosts from "./components/FilteredPosts";

export default function SiteRoutes({
  chooseWord,
  scientists,
  setScientists,
  gotScientists,
  setGotScientists,
}) {
  return (
    <Routes>
      <Route path="/" element={<Home chooseWord={chooseWord} />} />
      <Route path="/users" element={<User />} />

      <Route
        path="/scientists"
        element={
          <Scientists
            scientists={scientists}
            setScientists={setScientists}
            gotScientists={gotScientists}
            setGotScientists={setGotScientists}
          />
        }
      />
      <Route
        path="/newscientist"
        element={<NewScientist setGotScientists={setGotScientists} />}
      />
      <Route path="/posts" element={<Posts />} />
      <Route path="/posts/:scientist" element={<FilteredPosts />} />
      <Route
        path="/newpost"
        element={
          <NewPost
            scientists={scientists}
            setScientists={setScientists}
            gotScientists={gotScientists}
            setGotScientists={setGotScientists}
          />
        }
      />

      <Route path="*" element={<p>404: Page not found</p>} />
    </Routes>
  );
}
