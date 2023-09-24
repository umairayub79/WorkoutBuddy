import { createContext, useEffect, useReducer } from "react";
import { AuthReducer } from "./AuthReducer";
import Cookies from "js-cookie";

export const AuthContext = createContext();

const initialState = {
  authStatus: Cookies.get("token") ? "LoggedIn" : undefined,
  token: Cookies.get("token") || undefined,
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    if (state.token) {
      Cookies.set("token", state.token || undefined);
    }
  }, [state.token]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
