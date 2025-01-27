import React, { lazy, Suspense, useEffect, useState } from "react";
const Appbar = lazy(()=>import("../Components/Appbar"));
const Balance = lazy(()=>import("../Components/Balance"));
// import Users from "../Components/Users";
const Users = lazy(() => import("../Components/Users"));
import { userDetails } from "../Services/Operations/UserApis";
import { getBalance } from "../Services/Operations/AccountApi";
import { useSetRecoilState } from "recoil";
import { loggedInUseratom } from "../Store/atoms";
import Userskelaton from "../Components/Skelaton/Userskelaton";
import Balanceskelaton from "../Components/Skelaton/Balanceskelaton";
import Headerskelaton from "../Components/Skelaton/Headerskelaton";

export default function Dashboard() {
  const [balance, setBalance] = useState(0.0);
  async function getBalanceFn() {
    try {
      const response = await getBalance();
      setBalance(response);
    } catch (error) {
      console.log(error);
    }
  }
  const setloggedInUser = useSetRecoilState(loggedInUseratom);
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
      <Suspense fallback={<><Headerskelaton /></>}>
        <Appbar />
      </Suspense>

      <div className="px-5">
        <div className="my-3">
          <Suspense fallback={<><Balanceskelaton /></>}>
            <Balance value={balance} /> 
          </Suspense>
        </div>
        <div className="my-5">
          <Suspense fallback={<><Userskelaton /></>}>
            <Users />
          </Suspense>
        </div>
      </div>
      
      
    </div>
  );
}

