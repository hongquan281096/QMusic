import { API_URL, TOKEN_API } from "../constants/urlApi";
const BaseServices = {
  async get(endpoint) {
    endpoint = API_URL + endpoint;
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${TOKEN_API}`,
      },
    });
    if (!response.ok) {
      console.log("erorr");
    }
    return await response.json();
  },
};

export default BaseServices;
