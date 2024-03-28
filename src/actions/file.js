import { fetchToken } from "../helpers/fetch";
const getFile = async (data) => {
  // console.log(`api/file/${data}`)
  const response = await fetchToken(`api/file/${data}`);
  const body = await response.json();
  return body;
};
const searchFile = async (data) => {
  const response = await fetchToken(`api/file/search/${data}`);
  const body = await response.json();
  return body;
};
const downloadFile = async (data) => {
  const response = await fetchToken(`api/file/dowload/${data}`);
  const body = await response.json();
  return body;
};
const getAllFile = async (data) => {
    
  const { dateNow, city, journalist } = data;
  const response = await fetchToken(
    `api/file/searchFile/${dateNow}/${city}/${journalist}`
  );
  const body = await response.json();
  return body;
};
const addFile = async (data) => {
    console.log(data)
  const response = await fetchToken(`api/file/upload`,data,`POST`);  
  return await response.json();
};
export { getFile, downloadFile, searchFile, getAllFile , addFile};
