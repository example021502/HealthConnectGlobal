import React, { useState } from "react";

const cellStyles =
  "text-sm pb-2 border-gray-300 pl-1 tracking-wide text-gray-600";

function HistoryDisplay({ data, check, onUpdateCheckedListIds }) {
  const [localCheck, setLocalCheck] = useState(false);

  const isChecked = check || localCheck;

  const handleToggle = () => {
    const newLocalCheck = !localCheck;
    setLocalCheck(newLocalCheck);
    onUpdateCheckedListIds(data.id, newLocalCheck);
  };

  const handleRowClick = (e) => {
    if (e.target.type === "checkbox") return;
    handleToggle();
  };

  const handleCheckboxClick = (e) => {
    e.stopPropagation();
    handleToggle();
  };

  return (
    <tr
      onClick={handleRowClick}
      key={data.id}
      className={`gap-1 w-full hover:bg-[rgba(222,222,222,0.4)] rounded-lg transition-all ease-in-out duration-200 cursor-pointer`}
    >
      <td className={cellStyles}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxClick}
          className={`mr-1 ${isChecked ? "opacity-80" : "opacity-50"}`}
        />
      </td>
      <td className={cellStyles}>{data.date}</td>
      <td className={`${cellStyles} border-l-1 border-r-1`}>{data.type}</td>
      <td className={cellStyles}>{data.providerLocation}</td>
    </tr>
  );
}

export default HistoryDisplay;
