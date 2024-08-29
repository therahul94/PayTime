import React from "react";

export default function InputComponents({ title, placeholder, onChange, value }) {
  return (
    <div className="text-sm">
      <div className="font-semibold py-2 text-left">{title}</div>
      <input value={value} onChange={onChange} className="w-full p-2 border rounded" placeholder={placeholder} />
    </div>
  );
}
