import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import axios from "axios";

export default function Users() {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  const usersFn = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/user/bulk?filter=" + filter,
        // "http://192.168.191.214:8000/api/v1/user/bulk?filter=" + filter,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setUsers(response.data.users);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        setUsers([]);
      }
    }
  };

  useEffect(() => {
    let timeoutid;
    clearTimeout(timeoutid);
    timeoutid = setTimeout(() => {
      usersFn();
    }, 500);
  }, [filter]);

  return (
    <div>
      <div className="font-bold text-xl my-3">Users</div>
      <input
        className="w-full border p-2 rounded-md"
        placeholder="Search users..."
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      />
      <div className="mt-5">
        {users?.map((user) => {
          return (
            <div className="my-3">
              <Userlist firstName={user.firstName} lastName={user.lastName} id={user._id}/>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Userlist({ firstName, lastName, id }) {
  const navigate = useNavigate();
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
      <div>
        <Button onClick={()=>navigate("/sendmoney", {state: {
          receieverid: id,
          receieverName: firstName
        }})} label={"Send Money"} />
      </div>
    </div>
  );
}
