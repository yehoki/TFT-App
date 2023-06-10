const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.RIOT_API_KEY;
const euwBaseUrl = "https://euw1.api.riotgames.com";
const europeBaseUrl = "https://europe.api.riotgames.com";
const krBaseUrl = "https://kr.api.riotgames.com/";
const apiQuery = `?api_key=${API_KEY}`;

const euwChallengerPlayersUrl =
  euwBaseUrl + "/tft/league/v1/challenger" + apiQuery;

const euwSummonerIdUrl = (summonerId: string): string => {
  return `${euwBaseUrl}/tft/summoner/v1/summoners/${summonerId}/${apiQuery}`;
};

// https://europe.api.riotgames.com/tft/match/v1/matches/by-puuid/50i-aukuGE2lQ7ClYcEh0oVv5vCEd9UFjrjhZpikVBFKGB8s8MSANux95bQw25Ws_Z-fj_gP7a3FzQ/ids?start=0&count=40&api_key=RGAPI-729ce3b9-ca22-4f7e-a9d2-136a38bd6b22

const euwMatchesFromPuuid = (puuid: string, matchCount: number): string => {
  return `${europeBaseUrl}/tft/match/v1/matches/by-puuid/${puuid}/ids?start=0&count=${matchCount}${apiQuery.replace(
    "?",
    "&"
  )}`;
};

const euwMatchFromMatchId = (matchId: string): string => {
  return `${europeBaseUrl}/tft/match/v1/matches/${matchId}`;
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

//  This takes around 8 mins in whole to complete due to API rate limiting
//  However, once we can get these once a day/two and then store the match data a DB

export const getChallengerMatches = async () => {
  const summonerIds = await getChallengerPlayers();
  const players = [];
  for (const summonerId of summonerIds) {
    const puuid = await axios.get(euwSummonerIdUrl(summonerId));
    await awaitTimeout(1250);
    console.log(puuid.data);
    const matches = await axios.get(euwMatchesFromPuuid(puuid.data.puuid, 30));
    await awaitTimeout(1250);
    console.log(matches.data);
    const player = {
      puuid: puuid.data.puuid,
      matches: matches.data,
    };
    console.log(player);
    players.push(player);
  }
  return players;
};

export const getMatches = async (puuid: string): Promise<[]> => {
  const { data } = await axios.get(euwMatchesFromPuuid(puuid, 30));
  return data;
};

export const getMatchById = async (matchId: string): Promise<[]> => {
  const { data } = await axios.get(euwMatchFromMatchId(matchId));
  return data;
};

export const getTFTJSON = async () => {
  const { data } = await axios.get(
    "https://raw.communitydragon.org/13.11/cdragon/tft/en_gb.json"
  );
  return data;
};
