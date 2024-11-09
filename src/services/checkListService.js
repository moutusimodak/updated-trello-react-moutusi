import { getData, postData, deleteData } from "../api/api"; 

import config from "../config/index"; 

const { apiKey, apiToken, baseUrl } = config;

export const getCheckLists = async (cardId) => {
  const endpoint = `${baseUrl}/cards/${cardId}/checklists?key=${apiKey}&token=${apiToken}`;
  return await getData(endpoint);
};


export const createCheckList = async (cardId, checkListName) => {
  const endpoint = `${baseUrl}/cards/${cardId}/checklists?key=${apiKey}&token=${apiToken}`;
  const payload = { name: checkListName };
  return await postData(endpoint, payload);
};


export const deleteCheckList = async (checkListId) => {
  const endpoint = `${baseUrl}/checklists/${checkListId}?key=${apiKey}&token=${apiToken}`;
  await deleteData(endpoint);
};
