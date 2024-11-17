import { useState, useEffect } from "react";
import Nav from "./components/Nav";
import SiteRoutes from "./SiteRoutes";
import { UserProvider } from "./context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  "groovy",
];
// Returns a random word from scienceWord array to display as part of site name
const chooseWord = () => {
  return scienceWord[Math.floor(Math.random() * scienceWord.length)];
};

export default function App() {
  const [scientists, setScientists] = useState([]);
  // Keep track of updates to mitigate unnecessary fetch requests
  const [gotScientists, setGotScientists] = useState(false);

  return (
    <div>
      <UserProvider>
        <header>
          <Nav chooseWord={chooseWord} />
          <ToastContainer />
        </header>
        <main>
          <SiteRoutes
            chooseWord={chooseWord}
            scientists={scientists}
            setScientists={setScientists}
            gotScientists={gotScientists}
            setGotScientists={setGotScientists}
          />
        </main>
      </UserProvider>
    </div>
  );
}
