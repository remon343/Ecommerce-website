import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../store/auth-context";

const Register = () => {
  const {storeTokenInLS} = useContext(UserContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    gender: "Male",
    profileImage: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    if (name === "profileImage") {
      const file = e.target.files[0];
      setUser({ ...user, [name]: file });
    } else {
      const value = e.target.value;
      setUser({ ...user, [name]: value });
    }
    console.log(user);
  };

  const registerUser = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      for (let key in user) {
        formData.append(key, user[key]);
      }
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        storeTokenInLS(data.token);
        toast.success("User Registered Successfully");
        navigate('/');
      } else {
        throw new Error(data.msg);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <>
      <form onSubmit={registerUser} className="registerBox">
        <div className="inputElem">
          <label htmlFor="fullname" className="lbElem">
            Full Name :{" "}
          </label>
          <input
            type="text"
            name="fullName"
            className="ipElem"
            onChange={handleInput}
          />
        </div>
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
          <label htmlFor="address" className="lbElem">
            Address :{" "}
          </label>
          <input
            type="text"
            name="address"
            className="ipElem"
            onChange={handleInput}
          />
        </div>
        <div className="inputElem">
          <label htmlFor="phone">Phone Number : </label>
          <input
            type="number"
            name="phone"
            className="ipElem"
            onChange={handleInput}
          />
        </div>
        <div className="inputElem">
          <label htmlFor="gender">Gender : </label>
          <select name="gender" onChange={handleInput}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Transgender man">Transgender man</option>
            <option value="Transgender woman">Transgender woman</option>
            <option value="Others">Others</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </div>
        <div className="inputElem">
          <label htmlFor="profileImage">Profile Picture : </label>
          <input
            type="file"
            name="profileImage"
            accept="image/*"
            onChange={handleInput}
          />
        </div>
        <div className="inputElem">
          <label htmlFor="password">Password : </label>
          <input
            type="password"
            name="password"
            className="ipElem"
            onChange={handleInput}
          />
        </div>
        <button type="submit">
          Register
        </button>
        <Link to="/login">Already have an account? Click here...</Link>
      </form>
    </>
  );
};

export default Register;
