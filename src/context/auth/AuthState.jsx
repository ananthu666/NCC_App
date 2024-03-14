import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";

const AuthState = (props) => {
  const initialAuth = () => {
    const data = localStorage.getItem("user");
    if (data) {
      // Parse the data from localStorage

      // Set the auth state with the retrieved data
      return { roles: [data] }; // Assuming roles are stored in userData
    } else {
      return null; // Return null if data not found
    }
  };

  const [auth, setAuth] = useState(initialAuth());
  const [userType, setUserType] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("user") !== null ? true : false;
  });

  return (
    <AuthContext.Provider
      value={{
        userType,
        setUserType,
        isLoggedIn,
        setIsLoggedIn,
        auth,
        setAuth,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
