import { STRAPI_API_TOKEN , API_URL } from "./urls";
export const fetchDataApi = async (endpoint) => {
  const options = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + STRAPI_API_TOKEN,
    },
  }
  const response = await fetch(`${API_URL}${endpoint}`, options);
  const data = await response.json();
  
 return data;
};

// export const sendData = async (endpoint) => {
//   const options = {
//     method: "POST",
//     headers: {
//       Authorization: "Bearer " + STRAPI_API_TOKEN,
//       "content-Type" : "application/json"
//     },
//   }
//   const response = await fetch(`${API_URL}${endpoint}`, options);
//   const data = await response.json();
  
//  return data;
// };