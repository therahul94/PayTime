import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-between items-center p-5">
        <div className="ml-3 flex justify-center items-center">
          <img src="/PayTime.png" className="w-12 mr-3" />
          <b className="text-sm md:text-xl">PayTime</b>
        </div>
        <div>
            <Button label={"Sign In"} onClick={()=>navigate("/signin")}/>
        </div>
      </div>
      <hr />
    </div>
  );
}
