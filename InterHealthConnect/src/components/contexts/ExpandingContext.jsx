import React, { createContext, useState } from "react";
export const expandingContext = createContext(null);

function ExpandingContext({ children }) {
  const [expand_label, setExpand_label] = useState("");
  return (
    <expandingContext.Provider value={{ expand_label, setExpand_label }}>
      {children}
    </expandingContext.Provider>
  );
}

export default ExpandingContext;
