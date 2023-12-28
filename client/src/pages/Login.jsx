import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth-context";

const Login = () => {
  const {storeTokenInLS} = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const res_data = await res.json();
      if (res.ok) {
        if (res_data.token) {
          toast.success("Login successful.");
          storeTokenInLS(res_data.token);
          navigate("/");
        } else {
          throw new Error("Could not find login token");
        }
      } else {
        throw new Error(data.msg);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  const passwordToggle = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <form onSubmit={handleLogIn} className="loginBox">
        <div className="inputElem">
          <label htmlFor="email" className="lbElem">
            Email :{" "}
          </label>
          <input
            type="email"
            name="email"
            className="ipElem"
            onChange={handleInput}
          />
        </div>
        <div className="inputElem">
          <label htmlFor="password">Password : </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className="ipElem"
            onChange={handleInput}
          />
        </div>
        <button type="submit">Log In</button>
        <Link to="/register">Don't have an account? Click here...</Link>
      </form>
    </>
  );
};

export default Login;
