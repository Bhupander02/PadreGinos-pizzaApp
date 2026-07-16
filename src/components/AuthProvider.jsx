import { useState, useEffect, useCallback } from "react";
import { AuthContext } from "../contexts";
import { login as apiLogin, signup as apiSignup, fetchMe } from "../api/auth";

const TOKEN_KEY = "padregino_token";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function restoreSession() {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      if (!storedToken) {
        setLoading(false);
        return;
      }
      try {
        const data = await fetchMe(storedToken);
        if (!cancelled && data.success) {
          setUser(data.user);
          setToken(storedToken);
        }
      } catch (error) {
        // Token invalid/expired — clear it silently
        localStorage.removeItem(TOKEN_KEY);
        if (!cancelled) {
          setUser(null);
          setToken(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    restoreSession();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await apiLogin({ email, password });
    if (data.success) {
      localStorage.setItem(TOKEN_KEY, data.token);
      setToken(data.token);
      setUser(data.user);
    }
    return data;
  }, []);

  const signup = useCallback(async (name, email, password) => {
    const data = await apiSignup({ name, email, password });
    if (data.success) {
      localStorage.setItem(TOKEN_KEY, data.token);
      setToken(data.token);
      setUser(data.user);
    }
    return data;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={[{ user, token, loading }, { login, signup, logout }]}>
      {children}
    </AuthContext.Provider>
  );
}
