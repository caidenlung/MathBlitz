import React, { useState, useEffect, createContext } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

import jwt_decode from "jwt-decode";

import "../utilities.css";

import { socket } from "../client-socket";

import { get, post } from "../utilities";

export const UserContext = createContext(null);

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
        setUserName(user.name.split(" ")[0]); // Get only first name
        setFullName(user.name); // Get full name

        // If logged in and not already on home page, redirect to home
        if (location.pathname !== "/home") {
          navigate("/home");
        }
      } else if (location.pathname !== "/") {
        // If not logged in and not on login page, redirect to login
        navigate("/");
      }
    });
  }, []);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${firstName}`);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      setUserName(userName);
      navigate("/home");
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    setUserName("");
    post("/api/logout");
    navigate("/");
  };

  const authContextValue = {
    userId,
    userName,
    fullName,
    handleLogin,
    handleLogout,
  };

  return (
    <UserContext.Provider value={authContextValue}>
      <div className="fixed inset-0 w-full h-full bg-black">
        <Outlet />
      </div>
    </UserContext.Provider>
  );
};

export default App;
