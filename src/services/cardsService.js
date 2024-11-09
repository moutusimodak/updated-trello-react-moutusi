import { postData } from "../api/api";  

import config from "../config/index"; 

const { apiKey, apiToken, baseUrl } = config;

export const createCard = async (cardName, listId) => {
  const endpoint = `${baseUrl}/cards?name=${encodeURIComponent(cardName)}&idList=${listId}&key=${apiKey}&token=${apiToken}`;
  return postData(endpoint);
};
