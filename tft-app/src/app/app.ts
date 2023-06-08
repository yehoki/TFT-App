const mongoose = require("mongoose");
import { Player } from "./models/user";
import {
  awaitTimeout,
  getChallengerMatches,
  getChallengerPlayers,
  getMatches,
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

// mongoConnect();
// console.log(getPuuids());

// (async function () {
//   await mongoConnect();
//   await awaitTimeout(4000);
//   console.log("Connected");
//   const players = await Player.find({});
//   console.log("got players");
//   for (const player of players) {
//     const matches = await getMatches(player.puuid);
//     await awaitTimeout(1250);
//     const playerWithMatches = {
//       matches: matches,
//     };
//     const editPlayer = await Player.findByIdAndUpdate(
//       player._id.toString(),
//       playerWithMatches
//     );
//     console.log(editPlayer);
//   }
//   const newPlayers = await Player.find({});
//   console.log(newPlayers);
//   mongoose.connection.close();
// });


// ------------------------
// Uncomment this to put a new version of players in the db
// UNCOMMENT THIS TO PUT A NEW VERSION OF PLAYERS AND THEIR MATCHES IN THE DB
// ------------------------
// (async function () {
//   await mongoConnect();
//   let players = await getChallengerMatches();
//   for (const player of players) {
//     const newPlayer = new Player({
//       puuid: player.puuid,
//       matches: player.matches,
//     });
//     await newPlayer.save();
//     await awaitTimeout(500);
//     console.log("saved");
//   }
// })();
// ------------------------
