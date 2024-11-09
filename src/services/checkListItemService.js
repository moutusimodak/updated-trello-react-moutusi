
import { getData, postData, putData, deleteData } from "../api/api";

import config from "../config/index"; 

const { apiKey, apiToken, baseUrl } = config;


export const fetchCheckItems = (checkListId) => {
  const endpoint = `${baseUrl}/checklists/${checkListId}/checkItems?key=${apiKey}&token=${apiToken}`;
  return getData(endpoint);
};


export const createCheckItem = (checkListId, itemName) => {
  const endpoint = `${baseUrl}/checklists/${checkListId}/checkItems?name=${itemName}&key=${apiKey}&token=${apiToken}`;
  return postData(endpoint, {});
};


export const updateCheckItemStatus = (cardId, checkItemId, newStatus) => {
  const endpoint = `${baseUrl}/cards/${cardId}/checkItem/${checkItemId}?state=${
    newStatus ? "complete" : "incomplete"
  }&key=${apiKey}&token=${apiToken}`;
  return putData(endpoint);
};


export const deleteCheckItem = (checkListId, checkItemId) => {
  const endpoint = `${baseUrl}/checklists/${checkListId}/checkItems/${checkItemId}?key=${apiKey}&token=${apiToken}`;
  return deleteData(endpoint);
};
