import React from "react";
import { useState } from "react";
import axios from 'axios';
import {Link} from 'react-router-dom'

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async(e) =>{
    e.preventDefault();
    try{
        const res = await axios.post('http://localhost:4000/api/auth/login', formData, {withCredentials:true});
    console.log("Res: ", res);
    }
    catch(err){
        console.log(err.message);
    }
    
  }
  return (
    <div>
      <form>
        <div>
          <label htmlFor="emails">Email: </label>
          <input
            id="emails"
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
            <button onClick={submitHandler}>Login</button>
        </div>

        <div>
            <Link to="/forgotpassword">forgot password</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
