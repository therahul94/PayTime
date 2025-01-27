import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { UsersFn } from "../Services/Operations/UserApis";
import Pagination from "./Pagination";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [CurrentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const usersfn = async () => {
    try {
      const response = await UsersFn(filter, CurrentPage);
      setUsers(response.users);
      setTotalUsers(response.totalUsers);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
      usersfn();
  }, [filter, CurrentPage]);

  let timeoutid;
  function handleSearchUser(e) {
    clearTimeout(timeoutid);
    timeoutid = setTimeout(()=>{
      setFilter(e.target.value);
    }, 400);
  }


  return (
    <div>
      <div className="font-bold text-lg md:text-xl my-3">Users</div>
      <div className="flex items-center">
        <span className="absolute pl-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </span>
        <input
          className="w-full border p-2 pl-9 rounded-md placeholder:italic"
          placeholder="Search users..."
          onChange={(e) => handleSearchUser(e)}
        />
      </div>

      <div className=" ">
        {typeof users === "object" && users.length ? (
          users?.map((user) => {
            return (
              <div className="my-3" key={user._id}>
                <Userlist
                  firstName={user.firstName}
                  lastName={user.lastName}
                  id={user._id}
                />
              </div>
            );
          })
        ) : (
          <div className="h-max">
            <div className="text-2xl opacity-45 text-center">
              Users not found
            </div>
            <div className=" flex justify-center">
              <img
                className="w-72 h-72 opacity-45"
                src="/No-data.png"
                alt="No users available..."
              />
            </div>
          </div>
        )}
      </div>
      <div className="absolute bottom-0 right-0 px-5 ">
        <Pagination CurrentPage={CurrentPage} setCurrentPage={setCurrentPage} totalPages = {totalPages}/>
      </div>
    </div>
  );
}

function Userlist({ firstName, lastName, id }) {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-8 md:col-span-10 lg:col-span-11 flex items-center">
        <div className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-slate-200 flex justify-center items-center">
          <div className="font-semibold text-sm md:text-lg">{firstName[0]}</div>
        </div>
        <div className=" ml-3 font-semibold text-sm md:text-lg">
          {firstName} {lastName}
        </div>
      </div>
      <div className="col-span-4 md:col-span-2 lg:col-span-1">
        <Button
          onClick={() =>
            navigate("/sendmoney", {
              state: {
                receieverid: id,
                receieverName: firstName,
              },
            })
          }
          label={"Send Money"}
        />
      </div>
    </div>
  );
}
