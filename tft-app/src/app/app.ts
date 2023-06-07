const mongoose = require("mongoose");
import { Player } from "./models/user";
import {
  awaitTimeout,
  getChallengerMatches,
  getChallengerPlayers,
} from "./services/riot";

export async function mongoConnect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (exc) {
    console.error("Error connecting to MongoDB:", exc);
  }
}

const challengerPlayers = async () => {
  const data = await getChallengerPlayers();
  return data;
};

const challengerPuuids = async () => {
  const data = await getChallengerMatches();
  return data;
};

const getPuuids = async () => {
  await mongoConnect();
  const players = await Player.find({});
  players.forEach((player: typeof Player) => console.log(player));
  mongoose.connection.close();
};

getPuuids();

// ------------------------
// Uncomment this to put a new version of players in the db
// ------------------------
// (async function () {
//   await mongoConnect();
//   let puuids = await challengerPuuids();
//   console.log(puuids);
//   for (const player of puuids) {
//     const newPlayer = new Player({
//       puuid: player,
//       matches: [],
//     });
//     await newPlayer.save();
//     await awaitTimeout(500);
//     console.log("saved");
//   }
// })();
// ------------------------
