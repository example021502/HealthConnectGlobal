import React from "react";

function Image({
  alt,
  imgLink,
  class_name = "w-full h-full rounded-standard object-cover",
}) {
  return <img src={imgLink} alt={alt} className={`${class_name}`} />;
}

export default Image;
