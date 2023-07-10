import React from 'react'
import Routes from "./routes"
import { BrowserRouter as Router } from "react-router-dom";
import "./App.scss"
import { ToastContainer } from 'react-toastify';


const App = () => {
  const name="akhilesh"
  return (
    <div className="App">
      <ToastContainer/>
      <Router>
      <Routes/>
      </Router>
    </div>
  )
}

export default App
