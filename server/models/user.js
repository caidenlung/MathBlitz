const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  highscores: { Number, type: Number, min: 0, default: 0 },
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
