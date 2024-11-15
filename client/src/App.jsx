import { useState, useEffect } from "react";
import Nav from "./components/Nav";
import SiteRoutes from "./SiteRoutes";
import { UserProvider } from "./context/UserContext";

const scienceWord = [
  "crazy",
  "strange",
  "odd",
  "nuts",
  "bizarre",
  "insane",
  "confusing",
  "weird",
  "freaky",
  "funky",
  "peculiar",
  "quirky",
  "silly",
  "cool",
  "amazing",
  "fascinating",
  "mind blowing",
  "wonderful",
  "as science does",
  "groovy",
];

const chooseWord = () => {
  return scienceWord[Math.floor(Math.random() * scienceWord.length)];
};

export default function App() {
  return (
    <div>
      <UserProvider>
        <Nav />
        <h1 className="headline">
          Science is... <span className="headline-word">{chooseWord()}</span>
        </h1>
        <SiteRoutes chooseWord={chooseWord} />
      </UserProvider>
    </div>
  );
}
