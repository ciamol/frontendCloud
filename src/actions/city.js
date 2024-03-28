import { fetchToken } from "../helpers/fetch";
const getAllCity = async (data) => {
  const response = await fetchToken("api/city/");
  const body = await response.json();
//   console.log(body)
  return body; 
};
export { getAllCity};
