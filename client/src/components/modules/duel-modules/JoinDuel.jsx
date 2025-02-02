import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../../client-socket";

const JoinDuel = () => {
  const navigate = useNavigate();
  const [lobbyCode, setLobbyCode] = useState("");
  const [hasJoined, setHasJoined] = useState(false);
  const [error, setError] = useState("");
  const [duel, setDuel] = useState(null);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Listen for game start
    socket.on("duel_started", ({ duel, startTime, duration }) => {
      console.log("Received duel_started event:", duel);
      console.log("Socket ID:", socket.id);
      navigate("/duelplay", {
        state: {
          duel,
          startTime: new Date(startTime),
          duration,
        },
      });
    });

    // Listen for room join confirmation
    socket.on("player_joined_room", ({ socketId }) => {
      console.log("Player joined room:", socketId);
    });

    return () => {
      socket.off("duel_started");
      socket.off("player_joined_room");
    };
  }, [navigate]);

  const handleJoinLobby = async () => {
    try {
      setError("");
      console.log("Attempting to join duel with code:", lobbyCode);

      const response = await fetch("/api/duel/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: lobbyCode }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to join duel");
      }

      const data = await response.json();
      console.log("Join duel response:", data);

      setDuel(data.duel);
      setHasJoined(true);
      setPlayers([
        { id: data.duel.host._id, name: data.duel.host.name, isHost: true },
        { id: data.duel.opponent._id, name: data.duel.opponent.name, isHost: false },
      ]);

      // Join socket room
      socket.emit("join_duel", lobbyCode);
      console.log("Joined socket room:", lobbyCode);
    } catch (err) {
      console.error("Failed to join duel:", err);
      setError(err.message || "Failed to join duel");
      setHasJoined(false);
    }
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
            <h1 className="text-6xl font-mono tracking-tight text-emerald-400">join duel</h1>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <label className="block text-sm font-medium">enter lobby code</label>
              <input
                type="text"
                value={lobbyCode}
                onChange={(e) => setLobbyCode(e.target.value.toUpperCase())}
                maxLength={6}
                placeholder="XXXXXX"
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded text-center text-zinc-200 font-mono tracking-wider uppercase"
              />
              <p className="text-xs text-zinc-400">enter the 6-character code from your opponent</p>
              {error && <p className="text-sm text-red-400 mt-2">{error}</p>}
            </div>

            {!hasJoined ? (
              <button
                onClick={handleJoinLobby}
                disabled={lobbyCode.length !== 6}
                className="w-full px-6 py-5 text-sm font-medium text-zinc-300 hover:text-white border border-zinc-700 hover:border-zinc-500 rounded transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                join lobby
              </button>
            ) : (
              <div className="space-y-6">
                <div className="space-y-3">
                  <p className="text-sm font-medium">players (2/2)</p>
                  <div className="space-y-2">
                    {players.map((player) => (
                      <div
                        key={player.id}
                        className="flex items-center justify-between py-2 px-4 bg-zinc-900 border border-zinc-700 rounded"
                      >
                        <span className="text-sm">{player.name}</span>
                        {player.isHost && <span className="text-xs text-emerald-400">host</span>}
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-sm text-zinc-400">waiting for host to start the game...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinDuel;
