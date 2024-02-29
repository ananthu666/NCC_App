import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";

const AuthState = (props) => {
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
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
