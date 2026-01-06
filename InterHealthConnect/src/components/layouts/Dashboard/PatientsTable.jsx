import React, { useState } from "react";
import ActionDots from "./ActionDots";

function PatientsTable() {
  const tableData = [
    {
      name: "Romio Richards",
      gender: "Male",
      disease: "Jaundice",
      time: "12:30 AM",
    },
    {
      name: "Jane Cooper",
      gender: "Female",
      disease: "Diabetes",
      time: "01:20 PM",
    },
    {
      name: "Mary Chopper",
      gender: "Female",
      disease: "Pyrexia",
      time: "03:15 AM",
    },
    {
      name: "Henry Bomber",
      gender: "Male",
      disease: "Bypass",
      time: "06:30 PM",
    },
    {
      name: "Gibson Johnson",
      gender: "Male",
      disease: "Plaster Checkup",
      time: "05:45 AM",
    },
    {
      name: "Booker Eden",
      gender: "Female",
      disease: "Dental checkup",
      time: "07:40 PM",
    },
  ];

  return (
    <div className="relative w-full h-fit p-6 bg-white rounded-standard shadow-lg flex items-center justify-center">
      <table className="w-full h-full">
        <thead className="font-bold text-md border-b border-lightBorder">
          <tr>
            <td>Name</td>
            <td>Gender</td>
            <td>Disease</td>
            <td>Time</td>
            <td className="">Action</td>
          </tr>
        </thead>
        <tbody className="">
          {tableData.map((data, index) => (
            <tr key={index} className="">
              <td className="flex flex-row items-center m-2 gap-2">
                <img
                  src={`https://ui-avatars.com/api/?name=${data.name.substring(
                    1,
                    0
                  )}&background=365195&color=fff`}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full"
                />
                {data.name}
              </td>
              <td>{data.gender}</td>
              <td>{data.disease}</td>
              <td>{data.time}</td>
              <td className="text-center">
                <ActionDots />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PatientsTable;
