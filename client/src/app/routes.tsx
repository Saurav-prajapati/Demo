import React from 'react'
import { Route, Routes } from "react-router-dom"
import { Home,Login,Signup,Logout,Forget,NewPassword } from "../container"
import Navbar from '../components/Navbar'
const routes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/> } />
        <Route path="/logout" element={<Logout />} />
        <Route path="/forget" element={<Forget />} />
        <Route path="/newpassword/:id/:token" element={<NewPassword />} />
      </Routes>
    </>
  )
}

export default routes;