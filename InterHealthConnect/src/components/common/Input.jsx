import React from "react";

function Input({ type, onChange, placeholder }) {
  return (
    <input
      type={type}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full py-1 px-4 focus:outline-none focus:ring-2 focus:ring-background-white rounded-standard bg-background-white placeholder:text-light text-primary tracking-wide"
    />
  );
}

export default Input;
