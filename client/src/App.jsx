import React from 'react'
import Login from './components/Login'
import Signup from './components/Signup'
import ResetPassword from './components/ResetPassword'
import ForgotPassword from './components/ForgotPassword'
import {Routes, Route} from 'react-router-dom';
const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/reset-password/:token' element={<ResetPassword/>}/>
      <Route path='/forgotpassword' element={<ForgotPassword/>}/>
    </Routes>
  )
}

export default App