import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateDuel = () => {
  const navigate = useNavigate();
  const [duration, setDuration] = useState(120); // default 2 mins
  const [lobbyCode, setLobbyCode] = useState("");
  const [isLobbyCreated, setIsLobbyCreated] = useState(false);
  const [players, setPlayers] = useState([
    { id: 1, name: "You (Host)", isHost: true },
  ]);

  const generateLobbyCode = () => {
    // Generate a random 6-character alphanumeric code
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setLobbyCode(code);
    setIsLobbyCreated(true);
  };

  const handleCreateLobby = () => {
    generateLobbyCode();
    // Here you would typically send the lobby data to your backend
    // For now, we'll just generate and display the code
  };

  const handleStartGame = () => {
    // Here you would check if another player has joined before starting
    // For now, we'll just navigate to a new game route
    navigate("/play");
  };

  return (
    <div className="min-h-screen text-zinc-200 flex items-center justify-center">
      <div className="max-w-xl w-full px-6 -mt-20">
        <div className="text-center space-y-16">
          <button
            onClick={() => navigate("/duel")}
            className="absolute top-4 left-4 px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white border border-zinc-700 hover:border-zinc-500 rounded transition-all duration-200"
          >
            ← back
          </button>

          <div className="space-y-5">
            <h1 className="text-6xl font-mono tracking-tight text-emerald-400">create duel</h1>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <label className="block text-sm font-medium">duel duration (seconds)</label>
              <input
                type="number"
                value={duration}
                onChange={(e) =>
                  setDuration(Math.max(30, Math.min(300, parseInt(e.target.value) || 30)))
                }
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded text-center text-zinc-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                min="30"
                max="300"
              />
              <p className="text-xs text-zinc-400">min: 30s, max: 300s</p>
            </div>

            {!isLobbyCreated ? (
              <button
                onClick={handleCreateLobby}
                className="w-full px-6 py-5 text-sm font-medium text-zinc-300 hover:text-white border border-zinc-700 hover:border-zinc-500 rounded transition-all duration-200"
              >
                create lobby
              </button>
            ) : (
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium">lobby code</p>
                  <div className="text-2xl font-mono tracking-wider text-emerald-400 py-3 px-4 bg-zinc-900 border border-zinc-700 rounded">
                    {lobbyCode}
                  </div>
                  <p className="text-xs text-zinc-400">share this code with your opponent</p>
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-medium">players ({players.length}/2)</p>
                  <div className="space-y-2">
                    {players.map((player) => (
                      <div
                        key={player.id}
                        className="flex items-center justify-between py-2 px-4 bg-zinc-900 border border-zinc-700 rounded"
                      >
                        <span className="text-sm">
                          {player.name}
                        </span>
                        {player.isHost && (
                          <span className="text-xs text-emerald-400">host</span>
                        )}
                      </div>
                    ))}
                    {players.length < 2 && (
                      <div className="py-2 px-4 bg-zinc-900/50 border border-zinc-800 rounded">
                        <span className="text-sm text-zinc-500">waiting for opponent...</span>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleStartGame}
                  disabled={players.length < 2}
                  className="w-full px-6 py-5 text-sm font-medium text-emerald-400 hover:text-emerald-300 border border-emerald-800 hover:border-emerald-700 rounded transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  start game
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDuel;
