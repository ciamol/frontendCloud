import { fetchToken,fetchNoToken } from "../helpers/fetch";
const getAllJournalist = async () => {
    const response = await fetchToken("api/journalist/");
    return await response.json();
}
const AddJournalist = async (data) => {    
    const response = await fetchToken('api/journalist/addJournalist',data,"POST");
    return await response.json();
}
export {
    getAllJournalist,
    AddJournalist
}