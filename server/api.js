/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Duel = require("./models/duel");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

// Get leaderboard data
router.get("/leaderboard", (req, res) => {
  User.find({}).then((users) => {
    // Get highest score for each user
    const leaderboardData = users
      .map((user) => ({
        name: user.name,
        score: Math.max(...user.scores, 0), // Use 0 if no scores
      }))
      .filter((user) => user.score > 0) // Only show users with scores
      .sort((a, b) => b.score - a.score) // Sort by highest score
      .slice(0, 10); // Top 10 only

    res.send(leaderboardData);
  });
});

// Handle Scores submissions
router.post("/score", auth.ensureLoggedIn, (req, res) => {
  User.findById(req.user._id).then((user) => {
    user.scores.push(req.body.score);
    user.save().then((savedUser) => {
      // After saving, emit updated leaderboard to all clients
      User.find({}).then((users) => {
        const leaderboardData = users
          .map((user) => ({
            name: user.name,
            score: Math.max(...user.scores, 0),
          }))
          .filter((user) => user.score > 0)
          .sort((a, b) => b.score - a.score)
          .slice(0, 10);

        socketManager.getIo().emit("leaderboard", leaderboardData);
      });

      res.send(savedUser);
    });
  });
});

// Send all scores of the user
router.get("/scores", auth.ensureLoggedIn, (req, res) => {
  if (!req.user) {
    return res.status(401).send({ error: "Not logged in" });
  }

  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ error: "User not found" });
      }
      res.send({ scores: user.scores || [] });
    })
    .catch((err) => {
      console.log(`Failed to get scores: ${err}`);
      res.status(500).send({ error: "Failed to get scores" });
    });
});

// Create a new duel
router.post("/duel/create", auth.ensureLoggedIn, async (req, res) => {
  try {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    const duel = new Duel({
      code: code,
      host: req.user._id,
      duration: req.body.duration || 120,
    });
    await duel.save();
    res.send({ duel });
  } catch (err) {
    res.status(500).send({ error: "Could not create duel" });
  }
});

// Join a duel
router.post("/duel/join", auth.ensureLoggedIn, async (req, res) => {
  try {
    console.log("Join duel request:", req.body);
    const duel = await Duel.findOne({ code: req.body.code, status: "waiting" })
      .populate("host", "name")
      .populate("opponent", "name");

    if (!duel) {
      console.log("Duel not found or already started");
      return res.status(404).send({ error: "Duel not found or already started" });
    }
    console.log("Found duel:", duel);

    duel.opponent = req.user._id;
    await duel.save();
    await duel.populate("opponent", "name");

    console.log("Updated duel:", duel);

    // Notify host that opponent joined
    socketManager.getIo().to(duel.code).emit("opponent_joined", {
      duel,
      opponentName: req.user.name,
    });

    res.send({ duel });
  } catch (err) {
    console.error("Error joining duel:", err);
    res.status(500).send({ error: "Could not join duel" });
  }
});

// Start duel (host only)
router.post("/duel/:code/start", auth.ensureLoggedIn, async (req, res) => {
  try {
    const duel = await Duel.findOne({ code: req.params.code })
      .populate("host", "name")
      .populate("opponent", "name");

    if (!duel) {
      return res.status(404).send({ error: "Duel not found" });
    }

    // Verify that the requester is the host
    if (!duel.host._id.equals(req.user._id)) {
      return res.status(403).send({ error: "Only the host can start the duel" });
    }

    // Verify that there is an opponent
    if (!duel.opponent) {
      return res.status(400).send({ error: "Cannot start duel without an opponent" });
    }

    duel.status = "in_progress";
    duel.startedAt = new Date();
    await duel.save();

    // Emit start event with start time and duration
    socketManager.getIo().to(duel.code).emit("duel_started", {
      duel,
      startTime: duel.startedAt,
      duration: duel.duration,
    });

    res.send({
      duel,
      startTime: duel.startedAt,
      duration: duel.duration,
    });
  } catch (err) {
    console.error("Error starting duel:", err);
    res.status(500).send({ error: "Could not start duel" });
  }
});

// Get duel status
router.get("/duel/:code", auth.ensureLoggedIn, async (req, res) => {
  try {
    const duel = await Duel.findOne({ code: req.params.code })
      .populate("host", "name")
      .populate("opponent", "name");
    if (!duel) {
      return res.status(404).send({ error: "Duel not found" });
    }
    res.send({ duel });
  } catch (err) {
    res.status(500).send({ error: "Could not get duel status" });
  }
});

// Submit duel scores
router.post("/duel/:code/score", auth.ensureLoggedIn, async (req, res) => {
  try {
    const duel = await Duel.findOne({ code: req.params.code });
    if (!duel) {
      return res.status(404).send({ error: "Duel not found" });
    }

    if (req.user._id.equals(duel.host)) {
      duel.hostScore = req.body.score;
    } else if (req.user._id.equals(duel.opponent)) {
      duel.opponentScore = req.body.score;
    }
    if (duel.hostScore > 0 && duel.opponentScore > 0) {
      duel.status = "completed";
    }
    await duel.save();
    socketManager.getIo().to(duel.code).emit("duel_score_update", { duel });
    res.send({ duel });
  } catch (err) {
    res.status(500).send({ error: "Could not submit score" });
  }
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
