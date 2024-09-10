import React from "react";

export default function Appbar({user}) {
  return (
    <div className="p-3 flex justify-between items-center shadow">
      <div className="font-bold text-2xl">PayTm</div>
      <div className="flex items-center">
        <div className="mr-4">Hello, {user.firstName || "User"}</div>
        <div className="h-12 w-12 rounded-full bg-slate-200 flex justify-center items-center">
          <div className="text-xl">{ user.firstName?user["firstName"][0] : "U"}</div>
        </div>
      </div>
    </div>
  );
}
