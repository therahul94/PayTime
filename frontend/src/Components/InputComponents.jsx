import React from "react";

export default function InputComponents({ title, placeholder }) {
  return (
    <div className="text-sm">
      <div className="font-semibold py-2 text-left">{title}</div>
      <input className="w-full p-2 border rounded" placeholder={placeholder} />
    </div>
  );
}
