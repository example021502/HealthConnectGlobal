import React from "react";

function Input({
  type,
  onChange,
  placeholder,
  class_name = "w-full py-1 px-4 focus:outline-none focus:ring-2 focus:ring-inputBorder rounded-standard border border-lightBorder bg-background-white placeholder:text-light text-primary tracking-wide",
}) {
  return (
    <input
      type={type}
      onChange={onChange}
      placeholder={placeholder}
      className={class_name}
    />
  );
}

export default Input;
