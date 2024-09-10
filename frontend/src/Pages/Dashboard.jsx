import React, { useEffect, useState } from "react";
import Appbar from "../Components/Appbar";
import Balance from "../Components/Balance";
import Users from "../Components/Users";
import {  userDetails } from "../Services/Operations/UserApis";
import { getBalance } from "../Services/Operations/AccountApi";
import { useRecoilState } from "recoil";
import { loggedInUseratom } from "../Store/atoms";

export default function Dashboard() {
  const [balance, setBalance] = useState(0.0);
  async function getBalanceFn() {
    try {
      const response = await getBalance();
        setBalance(response);
      }
    catch (error) {
      console.log(error);
    }
  }
  const [loggedInUser, setloggedInUser] = useRecoilState(loggedInUseratom);
  async function getUserDetails() {
    try {
      const response = await userDetails();
      setloggedInUser(response);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getBalanceFn();
    getUserDetails();
  }, []);
  return (
    <div>
      <Appbar user={loggedInUser} />
      <div className="p-5">
        <div className="my-3">
          <Balance value={balance} />
        </div>
        <div className="my-5">
          <Users />
        </div>
      </div>
    </div>
  );
}
