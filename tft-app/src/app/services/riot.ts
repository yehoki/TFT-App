const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.RIOT_API_KEY;
const euwBaseUrl = "https://euw1.api.riotgames.com";
const krBaseUrl = "https://kr.api.riotgames.com/";
const apiQuery = `?api_key=${API_KEY}`;

const DB_URI = process.env.MONGO_DB_URI;

const euwChallengerPlayersUrl =
  euwBaseUrl + "/tft/league/v1/challenger" + apiQuery;

const euwSummonerIdUrl = (summonerId: string): string => {
  return `${euwBaseUrl}/tft/summoner/v1/summoners/${summonerId}/${apiQuery}`;
};

// Returns the summoner ids of all EUW
export const getChallengerPlayers = async () => {
  const { data } = await axios.get(euwChallengerPlayersUrl);
  const summonerIds: string[] = data.entries.map(
    (summoner: { summonerId: string }) => summoner.summonerId
  );
  return summonerIds;
};

export const awaitTimeout = (delay: number) => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};

export const getChallengerMatches = async () => {
  const summonerIds = await getChallengerPlayers();

  const summonerPUUIDs: string[] = [];
  for (const summonerId of summonerIds) {
    const { data } = await axios.get(euwSummonerIdUrl(summonerId));
    await awaitTimeout(1250);
    console.log(data);
    summonerPUUIDs.push(data.puuid);
  }
  return summonerPUUIDs;
};
