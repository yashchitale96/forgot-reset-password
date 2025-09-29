import React, { useState } from 'react'
import axios from 'axios';
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const changeHandler = (e) =>{
    setEmail(e.target.value);
  }
  const submitHandler = async(e) =>{
    e.preventDefault();
    try{
      // const res = await axios.post('http://localhost:4000/api/auth/forgetpassword', email, {withCredentials:true})
      const res = await axios.post('https://laughing-journey-xjgq6x9wgjx2v5v5-4000.app.github.dev/api/auth/forgetpassword', {email}, {withCredentials:true})
      console.log(res);
    }
    catch(err){
      console.log(err.message);
    }
  }
  return (
    <div>
        <h1>Forogot Password</h1>
        <form onSubmit={submitHandler}>
          <input type="email" name="email" value={email} required onChange={changeHandler}  />
          <button type='submit'>Send Email</button>
        </form>
    </div>
  )
}

export default ForgotPassword