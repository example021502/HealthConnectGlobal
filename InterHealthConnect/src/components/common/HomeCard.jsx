import React from "react";
import PlainButton from "./PlainButton";
import Icon from "./Icon";
function HomeCard({ card, id }) {
  return (
    <div className="w-full h-full gap-2 flex p-2 flex-col items-center justify-between">
      <span className=" p-2 h-14 w-14 flex items-center justify-center text-2xl rounded-full bg-light-gray">
        <Icon icon={card.icon} />
      </span>
      <h1>{card.mainHeading}</h1>
      <p className="text-xs">{card.description}</p>
      <PlainButton text="Learn More" />
    </div>
  );
}

export default HomeCard;
