import React from "react";
import Appbar from "../Components/Appbar";
import Balance from "../Components/Balance";
import Users from "../Components/Users";

export default function Dashboard() {
  return (
    <div>
      <Appbar />
      <div className="p-5">
        <div className="my-3">
          <Balance value={5000}/>
        </div>
        <div className="my-5">
          <Users />
        </div>
      </div>
    </div>
  );
}
