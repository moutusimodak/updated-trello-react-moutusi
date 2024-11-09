import { getData, postData, putData } from "../api/api";

import config from "../config/index"; 

const { apiKey, apiToken, baseUrl } = config;


export const fetchBoardDetails = async (boardId) => {
  const endpoint = `${baseUrl}/boards/${boardId}?key=${apiKey}&token=${apiToken}`;
  try {
    return await getData(endpoint);
  } catch (error) {
    throw new Error(`Failed to fetch board details: ${error.message}`);
  }
};


export const fetchBoardLists = async (boardId) => {
  const endpoint = `${baseUrl}/boards/${boardId}/lists?filter=open&key=${apiKey}&token=${apiToken}`;
  try {
    return await getData(endpoint);
  } catch (error) {
    throw new Error(`Failed to fetch lists: ${error.message}`);
  }
};

export const createBoardList = async (listName, boardId) => {
  const endpoint = `${baseUrl}/lists?name=${encodeURIComponent(
    listName
  )}&idBoard=${boardId}&key=${apiKey}&token=${apiToken}`;
  try {
    return await postData(endpoint);
  } catch (error) {
    throw new Error(`Failed to create list: ${error.message}`);
  }
};


export const deleteBoardList = async (listId) => {
  const endpoint = `${baseUrl}/lists/${listId}/closed?value=true&key=${apiKey}&token=${apiToken}`;
  try {
    return await putData(endpoint);  
  } catch (error) {
    throw new Error(`Failed to delete list: ${error.message}`);
  }
};
