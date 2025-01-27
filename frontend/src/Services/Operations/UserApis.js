import { apiConnector } from "../apiConnector";
import Swal from "sweetalert2";
export async function userDetails() {
    const token = localStorage.getItem('token') || null;
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

export async function UsersFn(filter, pagenumber) {
  try{
    const token = localStorage.getItem('token') || null;
    const response = await apiConnector(
      `${import.meta.env.VITE_baseURL}/user/bulk?filter=${filter}&page=${pagenumber}&limit=${4}`,
      "get",
      { authorization: `Bearer ${token}` }
    );
    // throw new Error("checking");
    if(response.status === 200) {
      return response.data;
    }
  }
  catch(error){
    console.log(error);
    if(error.response.status === 411){
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message.map((val)=>val.message).join(". "),
      });
    }
    return error.response.data.message;
  }
}

