import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";

export default function Scientists({
  scientists,
  setScientists,
  gotScientists,
  setGotScientists,
}) {
  const { user, isLoggedIn } = useUser();

  // Retrieves existing scientists from database
  useEffect(() => {
    async function getScientists() {
      const response = await fetch("http://localhost:8080/scientists");
      const data = await response.json();
      setScientists(data);
      setGotScientists(true);
    }
    // Only performs the fetch if not already performed or updated
    if (!gotScientists) {
      getScientists();
    }
  }, [gotScientists, setGotScientists, setScientists]);

  return (
    <div>
      <div className="scientists-head">
        <h1>Notable Scientists</h1>
        {/* Conditionally renders button to add a scientist or message to login as relevant */}
        {isLoggedIn && (
          <button>
            <Link to="/newscientist" state={scientists}>
              Add New Scientist
            </Link>
          </button>
        )}
        {!isLoggedIn && <p>Sign in to add a new scientist</p>}
      </div>
      <div className="scientists-container">
        {scientists.map((scientist) => {
          // Splitting larger bios by carriage returns so they can be split into multiple paragraphs on page
          const bioArr = scientist.bio.split("\n");
          // Loops through scientists and renders relevant data for each onto page
          return (
            <div key={scientist.id} className="scientist">
              <div className="scientist-name-img">
                <h2>{scientist.name}</h2>
                <img
                  src={scientist.image}
                  alt={scientist.name}
                  width="170"
                  height="190"
                />
              </div>
              <div className="scientist-bio">
                {/* Seperate paragraphs */}
                {bioArr.map((para) => {
                  if (para.length > 1) {
                    return <p key={para.length}>{para}</p>;
                  }
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
