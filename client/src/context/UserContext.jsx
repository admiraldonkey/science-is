import { createContext, useContext, useState } from "react";

export const UserContext = createContext();

// Context provided to app to keep track of whether user is logged in, and if so who they're logged in as
export function UserProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ isLoggedIn, user, setIsLoggedIn, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Use this in a child to the user provider");
  }
  return context;
};
