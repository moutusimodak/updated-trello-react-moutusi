import { getData , deleteData} from "../api/api";


import config from "../config/index"; 

const { apiKey, apiToken, baseUrl } = config;

export const fetchListCards = async (listId) => {
  const endpoint = `${baseUrl}/lists/${listId}/cards?key=${apiKey}&token=${apiToken}`;
  return await getData(endpoint);
};


export const deleteListCard = async (cardId) => {
    const endpoint = `${baseUrl}/cards/${cardId}?key=${apiKey}&token=${apiToken}`;
    try {
      await deleteData(endpoint);
    } catch (error) {
      throw new Error(`Failed to delete card: ${error.message}`);
    }
  };

  export const deleteList = async (listId) => {
    const endpoint = `${baseUrl}/lists/${listId}?key=${apiKey}&token=${apiToken}`;
    try {

      await deleteData(endpoint);
    } catch (error) {
      throw new Error(`Failed to delete list: ${error.message}`);
    }
  };


