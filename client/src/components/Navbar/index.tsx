import React from 'react'
import { useNavigate } from 'react-router';
import "./index.scss"

const Navbar = () => {
  const navigate=useNavigate();
  return (
   <>
   <div className="navbar">
      <div className="mainNavbar">
        <div className="left">
          <div className="img">
          Todolist
          </div>
        </div>
        <div className="right" >
          <ul>
            <li>Home</li>
            <li>SignUp</li>
            <li>Login</li>
            <li>Logout</li>
          </ul>
        </div>
      </div>
      <div className="underline"></div>
    </div>
   </>
  )
}

export default Navbar