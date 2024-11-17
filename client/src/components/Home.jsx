import { Link } from "react-router-dom";

export default function Home({ chooseWord }) {
  return (
    <div className="home-page">
      <div className="page-content">
        <p className="site-desc">
          <span className="homepage-site-name">&apos;Science is...&apos;</span>{" "}
          gives users a place to discover more about what makes things tick. The
          latest science news, quotes from famous scientists, fascinating
          insights into mind-bending concepts, discussion with like minded
          people... Perhaps give us a try and find out for yourself why{" "}
          <span className="homepage-site-name">science is...</span>{" "}
          <span className="site-desc-word">{chooseWord()}</span>
        </p>
        <div className="home-buttons">
          <button>
            {" "}
            <Link to={"/scientists"}>View Scientists</Link>
          </button>
          <button>
            <Link to={"/posts"}>View Posts</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
