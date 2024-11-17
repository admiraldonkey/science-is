import { Link } from "react-router-dom";
import User from "./User";

export default function Nav({ chooseWord }) {
  function newWord() {
    chooseWord();
  }

  return (
    <div className="nav-bar">
      <div className="nav-links">
        <Link to={"/"}> Home </Link>
        <Link to={"/scientists"}>Scientists</Link>
        <Link to={"/posts"}>Posts</Link>
      </div>
      <div className="headline-container">
        {" "}
        <h1 className="headline">
          Science is... <span className="headline-word">{chooseWord()}</span>
        </h1>
      </div>
      {/* Change the below to conditionally render depending on whether user is signed in or not */}
      <div className="nav-login">
        <User />
      </div>
    </div>
  );
}
