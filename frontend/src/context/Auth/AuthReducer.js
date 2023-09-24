import Cookies from "js-cookie";

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return { ...state, token: action.payload, authStatus: "LoggedIn" };

    case "LOGOUT_USER":
      Cookies.remove("token")
      return {
        ...state,
        token: null,
        authStatus: null,
      };

    default:
      return new Error("Unhandled action type:" + action.type);
  }
};
