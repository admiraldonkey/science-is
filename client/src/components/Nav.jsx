import { Link } from "react-router-dom";
import User from "./User";

export default function Nav() {
  return (
    <div>
      <Link to={"/"}> Home </Link>
      <br />
      <Link to={"/scientists"}>Scientists</Link>
      <br />
      <Link to={"/posts"}>Posts</Link>
      <br />
      {/* Change the below to conditionally render depending on whether user is signed in or not */}
      <User />
    </div>
  );
}
