import { fetchToken } from "../helpers/fetch";
const getFile = async (data) => {
    // console.log(`api/file/${data}`)
    const response = await fetchToken(`api/file/${data}`);
  const body = await response.json();
  return body; 
}
const searchFile = async (data) => {
    const response = await fetchToken(`api/file/search/${data}`);
    const body = await response.json();
    return body; 
}
const downloadFile = async (data) => {
    const response = await fetchToken(`api/file/dowload/${data}`);
    const body = await response.json();
    return body; 
}
export {getFile,downloadFile,searchFile}