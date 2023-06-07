const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  puuid: {
    type: String,
    required: true,
  },
  matches: [String],
});

export const Player = mongoose.model("Player", playerSchema);
