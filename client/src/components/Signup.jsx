import axios from "axios";
import React from "react";
import { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault(); 
    try {
      const res = await axios.post(
        "http://localhost:4000/api/auth/signup",
        formData,
        { withCredentials: true } 
      );
      console.log("res: ", res);
    } catch (err) {
      console.log(err.message);
    }
  };
  
  return (
    <div>
      <form onSubmit={submitHandler}> 
        <div>
          <label htmlFor="fullName">Full Name: </label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            placeholder="Enter Full Name"
            value={formData.fullName}
            required
            onChange={handleChange}
          />
        </div>
        <br />

        <div>
          <label htmlFor="email">Email: </label> 
          <input
            id="email" 
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            required
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <label htmlFor="password">Password: </label> 
          <input
            id="password" 
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <br />
        <div>
          <button type="submit">Signup</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;