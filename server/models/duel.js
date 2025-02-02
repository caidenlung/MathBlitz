const mongoose = require("mongoose");

const DuelSchema = new mongoose.Schema({
  code: String,
  host: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  opponent: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  duration: { type: Number, default: 120 },
  status: {
    type: String,
    enum: ["waiting", "in_progress", "completed"],
    default: "waiting",
  },
  hostScore: { type: Number, default: 0 },
  opponentScore: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  startedAt: { type: Date }, // When the duel actually begins
});

module.exports = mongoose.model("Duel", DuelSchema);
