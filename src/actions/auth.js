import { fetchNoToken,fetchToken } from "../helpers/fetch";
const login = async (data) => {
  const response = await fetchNoToken("api/auth/", data, "POST");
  const body = await response.json();
  return body; 
};
const refreshToken = async (data) => {
  const response = await fetchToken("api/auth/refresh");
  const body = await response.json();
  return body; 
}

const logout = () => {
  localStorage.setItem("token", '');
};
export { login, refreshToken,logout };
