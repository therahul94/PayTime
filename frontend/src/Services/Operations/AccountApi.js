import { apiConnector } from "../apiConnector";

export async function getBalance(){
    const token = localStorage.getItem('token') || null;
    try {
        // "http://192.168.191.214:8000/api/v1/account/balance",
        const response = await apiConnector(
          `${import.meta.env.VITE_baseURL}/account/balance`,
          "get",
          { authorization: `Bearer ${token}` }
        );
        if (response.status === 200) {
          return response.data.balance;
        }
      } catch (error) {
        console.log(error);
        return error.response.data.message;
      }
}