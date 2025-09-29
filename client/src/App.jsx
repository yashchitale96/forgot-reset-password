import React from 'react'
import Login from './components/Login'
import Signup from './components/Signup'
import ResetPassword from './components/ResetPassword'
const App = () => {
  return (
    <div>
      <Login/>
      <Signup/>
      <ResetPassword/>
    </div>
  )
}

export default App