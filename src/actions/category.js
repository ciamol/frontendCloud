import { fetchNoToken,fetchToken } from "../helpers/fetch";
const getAllCategory = async (data) => {
  const response = await fetchNoToken("api/category/");
  const body = await response.json();
//   console.log(body)
  return body; 
};
const getContentCategory = async (data) => {
  const {dateNow,city,idCategory} = data;
  const response = await fetchToken(`api/file/searchFile/${dateNow}/${city}/${idCategory}`)
  const body = await response.json();
  return body;
}

export { getAllCategory, getContentCategory};
