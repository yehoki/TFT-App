const mongoose = require("mongoose");
import { Player } from "./models/user";
import {
  awaitTimeout,
  getChallengerMatches,
  getChallengerPlayers,
  getMatches,
  getTFTJSON,
} from "./services/riot";
import { elimDuplicateMatchIds } from "./utils";

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

const getAllMatches = async () => {
  await mongoConnect();
  const players = await Player.find({});
  let matches: string[] = [];
  players.forEach((player: any) => {
    matches = matches.concat(player.matches)
  });
  console.log(matches.length);
  const fortyUniqueMatches = elimDuplicateMatchIds(matches).slice(0, 40);
  console.log(fortyUniqueMatches.length);
  mongoose.connection.close();
};

// getAllMatches();

(async function() {
  const data = await getTFTJSON();
  console.log(data.sets["8"].traits);
})();

// **TODO**
// 1. Refactor code into modules
// 2. Helper functions: I.e. remove duplicate games: store in a hashmap or something of sorts

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
