import { createContext } from "react";

export const CartContext = createContext([], function() {});

// AuthContext value shape: [ { user, token, loading }, { login, signup, logout } ]
export const AuthContext = createContext([
  { user: null, token: null, loading: true },
  { login: async () => {}, signup: async () => {}, logout: () => {} },
]);