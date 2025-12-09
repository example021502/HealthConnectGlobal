import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Context/Context";
import { Doughnut } from "react-chartjs-2";

function Charts() {
  const { daily_vitals } = useContext(AuthContext);

  return <div>{/* <Doughnut data={""} /> */}</div>;
}

export default Charts;
