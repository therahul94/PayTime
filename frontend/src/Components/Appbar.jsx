import React from "react";

export default function Appbar() {
  return (
    <div className="p-3 flex justify-between items-center shadow">
      <div className="font-bold text-2xl">PayTm</div>
      <div className="flex items-center">
        <div className="mr-4">Hello, User</div>
        <div className="h-12 w-12 rounded-full bg-slate-200 flex justify-center items-center">
          <div className="text-xl">U</div>
        </div>
      </div>
    </div>
  );
}
