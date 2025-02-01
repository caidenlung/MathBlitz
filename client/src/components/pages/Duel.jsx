import React from "react";
import { useNavigate } from "react-router-dom";

const Duel = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-zinc-200 flex items-center justify-center">
      <div className="max-w-xl w-full px-6 -mt-20 flex flex-col items-center">
        <div className="text-center w-full space-y-16">
          <button
            onClick={() => navigate("/")}
            className="absolute top-4 left-4 px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white border border-zinc-700 hover:border-zinc-500 rounded transition-all duration-200"
          >
            ← back to home
          </button>
          <div className="space-y-5">
            <h1 className="text-6xl font-mono tracking-tight text-emerald-400">duel</h1>
          </div>

          <div className="flex flex-col gap-5">
            <button
              onClick={() => navigate("/createduel")}
              className="w-full px-6 py-5 text-sm font-medium text-zinc-300 hover:text-white border border-zinc-700 hover:border-zinc-500 rounded transition-all duration-200"
            >
              create duel
            </button>
            <button
              onClick={() => navigate("/joinduel")}
              className="w-full px-6 py-5 text-sm font-medium text-zinc-300 hover:text-white border border-zinc-700 hover:border-zinc-500 rounded transition-all duration-200"
            >
              join duel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Duel;
