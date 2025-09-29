import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
const ResetPassword = () => {
    const [formData, setFormData] = useState({
        password:"",
        confirmPassword:""
    })
    const {token} = useParams()
    const navigate = useNavigate()
    const changeHandler = (e) =>{
        const {name, value} = e.target;
        setFormData((prev)=>({...prev, [name]:value}))
    }
    
    const submitHandler = async(e) =>{
        e.preventDefault();
        try{
            // const res = await axios.post('http://localhost:4000/api/auth/reset-password/:token', formData, {withCredentials:true})
            const res = await axios.post(`https://laughing-journey-xjgq6x9wgjx2v5v5-4000.app.github.dev/api/auth/reset-password/${token}`, formData, {withCredentials:true})
            console.log("res:", res);
            navigate('/login');
        } 
        catch(err){
            console.log(err.message);
        }
    }
  return (
    <div>
        <form onSubmit={submitHandler}>
            <div>
                <label htmlFor="password">Password: </label>
            <input type="password" name='password' value={FormData.password} required onChange={changeHandler} />
            </div>
            <br />

            <div>
                  <label htmlFor="confirmPassword"> Confirm Password: </label>
            <input type="password" name='confirmPassword' value={FormData.confirmPassword} required onChange={changeHandler} />
            </div>

            <div>
                <button type="submit">Reset Password</button>
            </div>
        </form>
    </div>
  )
}

export default ResetPassword