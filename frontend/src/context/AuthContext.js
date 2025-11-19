"use client";
import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const API_URL = "http://localhost:5000/api/auth";

  // checking if user?logged in on initial render
  useEffect(() => {
    const checkUserLoggedIn = () => {
      try {
        const token = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");

        if (token && savedUser) {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        // If data is corrupted, clear it
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } finally {
        // ALWAYS turn off loading, whether we found a user or not
        setLoading(false);
      }
    };

    checkUserLoggedIn();
  }, []);
// Login function
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));

      setUser(res.data);
      axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
      
      toast.success("Welcome back, Trader.");
      router.push("/dashboard"); // Redirect to dashboard after login
      } catch (error) {
        toast.error(error.response?.data?.message || "Login failed");
    }
};
// Signup function
    const signup = async (name, email, password) => {
        try {
            const res = await axios.post(`${API_URL}/signup`, { name, email, password });
      
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));
      
      setUser(res.data);
      axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
      
      toast.success("Account created.");
      router.push("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  // Logout function
    const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
    router.push("/login");
    toast.success("Logged out successfully");
  };
  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);