import { createContext } from "react";


export const AppContext = createContext();
// eslint-disable-next-line react/prop-types
const AppContextProvider = ({ children }) => {
  return (
    <AppContext.Provider value={{}}>{children}</AppContext.Provider>
  )
}

export default AppContextProvider;
