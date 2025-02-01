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

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
