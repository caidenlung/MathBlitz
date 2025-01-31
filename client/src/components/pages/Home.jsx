import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../App";

const Home = () => {
  const { userId, userName, handleLogout } = useContext(UserContext);
  const navigate = useNavigate();

  // If not logged in, redirect to login page
  React.useEffect(() => {
    if (!userId) {
      navigate("/");
    }
  }, [userId, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <h1 className="text-4xl font-bold mb-8">Welcome back, {userName}!</h1>
      <Link to="/play" className="text-4xl font-bold mb-4 hover:text-gray-300">
        Play
      </Link>
      <Link to="/settings" className="text-4xl font-bold mb-4 hover:text-gray-300">
        Settings
      </Link>
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
