import { apiConnector } from "../apiConnector";
export async function userDetails() {
    const token = localStorage.getItem('token') || null;
    // console.log("import.meta.env.baseURL: ",import.meta.env.baseURL);
  try {
    // "http://192.168.191.214:8000/api/v1/account/balance",
    const response = await apiConnector(
      `${import.meta.env.VITE_baseURL}/user/userDetails`,
      "get",
      { authorization: `Bearer ${token}` }
    );
    if (response.status === 200) {
      return response.data.user;
    }
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
}

