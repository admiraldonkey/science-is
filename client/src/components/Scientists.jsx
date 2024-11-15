import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";

export default function Scientists({
  scientists,
  setScientists,
  gotScientists,
  setGotScientists,
}) {
  // const [scientists, setScientists] = useState([]);
  const { user, isLoggedIn } = useUser();
  // const gotScientists = scientists.length > 0 ? true : false;

  useEffect(() => {
    async function getScientists() {
      const response = await fetch("http://localhost:8080/scientists");
      const data = await response.json();
      setScientists(data);
      setGotScientists(true);
    }
    if (!gotScientists) {
      getScientists();
    }
  }, [gotScientists, setGotScientists, setScientists]);

  return (
    <div>
      <h1>Notable Scientists</h1>
      {isLoggedIn && (
        <button>
          <Link to="/newscientist" state={scientists}>
            Add New Scientist
          </Link>
        </button>
      )}
      {!isLoggedIn && <p>Sign in to add a new scientist</p>}
      <div className="scientists-container">
        {scientists.map((scientist) => {
          // Splitting larger bios by carriage returns so they can be split into multiple paragraphs on page
          const bioArr = scientist.bio.split("\n");
          return (
            <div key={scientist.id} className="scientist">
              <h3>{scientist.name}</h3>
              <img
                src={scientist.image}
                alt={scientist.name}
                width="170"
                height="190"
              />
              {bioArr.map((para) => {
                if (para.length > 1) {
                  return <p key={para.length}>{para}</p>;
                }
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
