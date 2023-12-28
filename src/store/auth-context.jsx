import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const storeTokenInLS = (server_token) => {
    setToken(server_token);
    return localStorage.setItem("token", server_token);
  };

  const isLoggedin = !!token;
  const LogoutUser = () =>{
    setToken("");
    return localStorage.removeItem("token");
  }
  const getUser = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/user", {
        method : "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.msg);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  useEffect(()=>{
    getUser();
  },[token]);

  const contextValue = {
    user,
    token,
    storeTokenInLS,
    LogoutUser,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useAuth = () =>{
  try{

    const authContextValue = useContext(UserContext);
    if(!authContextValue){
      throw new Error("useAuth used outside of the provider.");
    }
    return authContextValue;
  }catch(err){
    toast.error(err.message);
  }
}

export {UserContext, UserProvider}
