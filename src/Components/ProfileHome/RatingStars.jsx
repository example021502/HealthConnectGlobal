import React, { useEffect, useState } from "react";

function RatingStars({ rate }) {
  const [rating, setRating] = useState("");
  const GOLD_STAR = "★";
  const LIGHT_STAR = "☆";
  const rateValue = parseInt(rate) || 0;
  const emptyRate = 5 - rateValue;

  useEffect(() => {
    const stars = GOLD_STAR.repeat(rateValue) + LIGHT_STAR.repeat(emptyRate);
    setRating(stars);
  }, [rateValue, rate]);

  return (
    <span className="text-yellow-500 font-bold tracking-widest text-lg">
        {rating} {" "}
    </span>
  );
}

export default RatingStars;
