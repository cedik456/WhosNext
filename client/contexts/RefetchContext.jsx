import { createContext, useContext, useState } from "react";

const RefetchContext = createContext();

export const RefetchProvider = ({ children }) => {
  const [shouldRefetch, setShouldRefetch] = useState(false);

  return (
    <RefetchContext.Provider value={{ shouldRefetch, setShouldRefetch }}>
      {children}
    </RefetchContext.Provider>
  );
};

export const useRefetch = () => useContext(RefetchContext);
