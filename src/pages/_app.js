import "@/styles/globals.css";
import { useCallback, useEffect, useState } from "react";
import { AuthContext } from "@/Components/AuthContext";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(false);

  const router = useRouter();

  const login = useCallback((uid, token) => {
    setUserId(uid);
    setToken(token);
    router.push("/");
    console.log(userId);
  }, []);

  const logout = useCallback(() => {
    router.push("/");
    setUserId(null);
    setToken(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}
