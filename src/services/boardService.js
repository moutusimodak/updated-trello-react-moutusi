
import { getData, postData } from "../api/api";

import config from "../config/index"; 

const { apiKey, apiToken, baseUrl } = config;

export const fetchBoards = async () => {
  const endpoint = `${baseUrl}/members/me/boards?key=${apiKey}&token=${apiToken}`;
  try {
    return await getData(endpoint);
  } catch (error) {
    throw new Error(`Failed to fetch boards: ${error.message}`);
  }
};

export const addBoard = async (boardName, bgColor) => {
  const endpoint = `${baseUrl}/boards/?key=${apiKey}&token=${apiToken}`;
  const payload = {
    name: boardName,
    prefs_background: bgColor,
  };
  try {
    return await postData(endpoint, payload);
  } catch (error) {
    throw new Error(`Failed to create board: ${error.message}`);
  }
};

