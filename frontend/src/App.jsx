import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Login from './pages/login/Login.jsx'
import SignUp from './pages/signup/SignUp.jsx'
import Home from './pages/home/Home.jsx'
import { Toaster } from 'react-hot-toast'

import { Navigate,Routes, Route } from 'react-router-dom'
import { useAuthContext } from './context/AuthContext.jsx'

function App() {

  const { authUser } = useAuthContext()

  return (
    <>
        <div className='p-4 h-screen flex items-center justify-center'>
          <Routes>
            <Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
            <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
            <Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
          </Routes>
          <Toaster/>
        </div>     
    </>
  )
}

export default App
