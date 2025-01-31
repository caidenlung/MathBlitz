import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../App";

const Home = () => {
  const { userId, handleLogout } = useContext(UserContext);
  const navigate = useNavigate();

  // If not logged in, redirect to login page
  React.useEffect(() => {
    if (!userId) {
      navigate("/");
    }
  }, [userId, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <Link className="text-4xl font-bold mb-4">Play</Link>
      <Link className="text-4xl font-bold mb-4">Settings</Link>
      <button
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          handleLogout();
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
