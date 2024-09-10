import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function SendMoney() {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log("state", state);
  const token = localStorage.getItem("token");
  const [sendAmt, setSendAmt] = useState(0);
  async function transferMoneyFn() {
    try {
      const config = {
        url: "/account/transfer",
        method: "put",
        baseURL: "http://localhost:8000/api/v1",
        // baseURL: "http://192.168.191.214:8000/api/v1",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        data: {
          transferTo: state.receieverid,
          amount: Number(sendAmt),
        },
      };
      const response = await axios(config);
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => navigate("/dashboard"), 1500);

        return;
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 411) {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message
            .map((val) => val.message)
            .join(". "),
        });
      } else {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      }
    }
  }
  return (
    <div className="bg-slate-300 h-screen flex justify-center items-center">
      <div className="w-80 md:w-128 h-max rounded-md bg-white p-5 text-center">
        <div className="font-bold text-2xl mt-5 mb-10">Send Money</div>
        <div className="flex justify-left items-center">
          <div className="w-12 h-12 bg-green-500 text-white rounded-full font-semibold text-xl flex justify-center items-center">
            {state.receieverName[0]}
          </div>
          <div className="font-semibold text-xl ml-3 ">
            {state.receieverName}
          </div>
        </div>
        <div className="mt-2">
          <div className="font-semibold text-sm text-left my-2">
            Amount(in Rs)
          </div>
          <div>
            <input
              className="w-full p-3 border rounded text-sm"
              placeholder="Enter Amount"
              value={sendAmt}
              onChange={(e) => setSendAmt(e.target.value)}
            />
          </div>
        </div>
        <div className="my-3">
          <button
            type="button"
            onClick={transferMoneyFn}
            class="w-full focus:outline-none text-white bg-green-500 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-500 dark:hover:bg-green-500 dark:focus:ring-green-600"
          >
            Initiate Transfer
          </button>
        </div>
      </div>
    </div>
  );
}
