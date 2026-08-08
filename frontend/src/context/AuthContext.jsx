import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);


export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");

      return storedUser
        ? JSON.parse(storedUser)
        : null;

    } catch (error) {
      console.error("Failed to load stored user:", error);

      localStorage.removeItem("user");
      localStorage.removeItem("token");

      return null;
    }
  });


  // --------------------------------------------------
  // Login
  // --------------------------------------------------

  const login = (userData, token) => {
    if (!userData || !token) {
      console.error("Invalid login data.");
      return false;
    }

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    localStorage.setItem(
      "token",
      token
    );

    setUser(userData);

    return true;
  };


  // --------------------------------------------------
  // Logout
  // --------------------------------------------------

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


// --------------------------------------------------
// useAuth Hook
// --------------------------------------------------

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside an AuthProvider"
    );
  }

  return context;
}