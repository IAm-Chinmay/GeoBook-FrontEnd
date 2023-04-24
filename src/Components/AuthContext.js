import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  clickedUserId: null,
  login: () => {},
  logout: () => {},
});
