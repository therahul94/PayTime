import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([
    {
      firstName: "Rahul",
      lastName: "Kurmalkar",
      id: 1,
    },
  ]);

  

  return (
    <div>
      <div className="font-bold text-xl my-3">Users</div>
      <input
        className="w-full border p-2 rounded-md"
        placeholder="Search users..."
      />
      <div className="mt-5">
        {users?.map((user) => {
          return (
            <div className="my-3">
              <Userlist firstName={user.firstName} lastName={user.lastName} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Userlist({ firstName, lastName }) {
  return (
    <div className="flex justify-between items-center h-full">
      <div className="flex justify-left items-center">
        <div className="w-12 h-12 rounded-full bg-slate-200 flex justify-center items-center">
          <div className="font-semibold text-lg">{firstName[0]}</div>
        </div>
        <div className="ml-3 font-bold">
          {firstName} {lastName}
        </div>
      </div>
      <div >
        <Button label={"Send Money"}/>
      </div>
    </div>
  );
}
