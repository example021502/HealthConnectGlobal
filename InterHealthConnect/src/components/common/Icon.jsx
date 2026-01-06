import React from "react";

function Icon({ icon, class_name = "w-full h-full" }) {
  return <i className={`${icon} ${class_name}`} />;
}

export default Icon;
