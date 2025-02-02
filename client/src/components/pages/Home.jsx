import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../App";
import NavBar from "../modules/NavBar";

const Home = () => {
  const { userId } = useContext(UserContext);
  const navigate = useNavigate();

  // If not logged in, redirect to login page
  React.useEffect(() => {
    if (!userId) {
      navigate("/");
    }
  }, [userId, navigate]);

  return (
    <div className="min-h-screen text-zinc-200 flex items-center justify-center">
      <NavBar />
      <div className="max-w-xl w-full px-6">
        <div className="text-center space-y-16">
          <div className="space-y-5">
            <h1 className="text-6xl font-mono tracking-tight text-emerald-400">beavermath</h1>
            <p className="text-zinc-400 font-mono">test your math skills</p>
          </div>

          <div className="flex flex-col gap-5">
            <button
              onClick={() => navigate("/play")}
              className="w-full px-6 py-5 text-sm font-medium text-emerald-400 hover:text-emerald-300 border border-emerald-800/50 hover:border-emerald-700 rounded transition-all duration-200"
            >
              start game
            </button>
            <button
              onClick={() => navigate("/duel")}
              className="w-full px-6 py-5 text-sm font-medium text-zinc-300 hover:text-white border border-zinc-700 hover:border-zinc-500 rounded transition-all duration-200"
            >
              duel
            </button>
            <button
              onClick={() => navigate("/leaderboard")}
              className="w-full px-6 py-5 text-sm font-medium text-yellow-400/80 hover:text-yellow-300 border border-yellow-400/30 hover:border-yellow-400/50 rounded transition-all duration-200"
            >
              view leaderboard
            </button>
          </div>

          <div className="text-xs text-zinc-500 font-mono">
            press tab + enter to quickly start a game
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
