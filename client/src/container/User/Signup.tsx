import React, { useState } from 'react'
import "./index.scss"
import { useNavigate } from 'react-router'
import { AiFillEye, AiTwotoneEyeInvisible } from "react-icons/ai"
// import { auth, provider } from"../../FireBase/Firebase
// import { auth, provider } from "../../firebase/firebase"
// import { signInWithPopup } from 'firebase/auth'

// toastify import 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Signup = ({ mastData }: any) => {
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const [show2, setShow2] = useState(false)
  const [data, setData] = useState({
    name: "", email: "",username:"", password: "", cpassword: ""
  })

  const handleChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    setData({ ...data, [name]: value })
  }

  const addDataUser = async (e: any) => {
    e.preventDefault();
    const { name, email,username, password, cpassword } = data;
    var passw=  "(?=.*[a-z])(?=.*[A-Z]).{6,}";
    if (!name || !email || !username || !password || !cpassword) { toast.warn(`Plz Fill All Input 😂`, { position: 'top-center' }) }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) { alert("plz fill invalid email") }
    else if (!password.match(passw)){ toast.warn(`Plz fill Password and Confirm Password is 1 Uppercase,1 Lowercase And Minimum lenght 6 characters`) }
    else if (!cpassword.match(passw)){toast.warn(`Plz fill Password and Confirm Password is 1 Uppercase,1 Lowercase And Minimum lenght 6 characters`)}
    else if (password !== cpassword) { toast.error(`Your Password and confirm Password is not match 😞`, { position: 'top-center' }) }
    else {
      const dataSignup = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name, email, password, cpassword,username
        })
      });
      const res = await dataSignup.json();
      if (res.status === 201) {
        toast.success(`Congratulations ${name},You Are Succesfully Signup ☺️`, {position: "top-center",autoClose: 2000,});
        navigate("/login")
        setData({ ...data, name: "", email: "", password: "", cpassword: "" })
      } else if (res.status === 409) { toast.error(`This Email is Already Account`, { position: "top-center" }) }
      else { toast.error("Something went Wrong", { position: "top-center" }) }
    }

  }

  // const signUpWithGoogle = async (e: any) => {
  //   e.preventDefault()
  //   const password: any = new Date().getTime().toString()
  //   // const Response = await signInWithPopup(auth, provider)
  //   if (Response) {
  //     const response = await fetch("/api/signupData", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         Response, password
  //       })
  //     })
  //     const responseData = await response.json()
  //     if (responseData.status === 201) {
  //       toast.success(`Succesfully Singup`, { position: "top-center" })
  //       navigate("/login")
  //     } else if (responseData.status === 409) {
  //       toast.error(`This Email is Already Have Account`, { position: "top-center" })
  //     }
  //   }
  // }


  return (
    <div className="Signup">
      <div className="signup">
        <div className="head">Signup</div>
        <form action="">
          <div className="point">
            <label htmlFor="">Your Name*</label>
            <input type="text" name="name" id="name" value={data.name} onChange={handleChange} placeholder='Your Name' />
          </div>
          <div className="point">
            <label htmlFor="">Your Email*</label>
            <input type="email" name="email" id="email" value={data.email} onChange={handleChange} placeholder='Your Email' />
          </div>
          <div className="point">
            <label htmlFor="">Your Username*</label>
            <input type="text" name="username" id="username" value={data.username} onChange={handleChange} placeholder='Enter UserName' />
          </div>
          <div className="point">
            <label htmlFor="">Your Password*</label>
            <input type={!show ? "password" : "text"} name="password" id="password" value={data.password} onChange={handleChange} placeholder='Your Password' />
            <div className="hide" onClick={() => setShow(!show)}>{!show ? <AiFillEye /> : <AiTwotoneEyeInvisible />}</div>

          </div>
          <div className="point">
            <label htmlFor="">Your Confirm-Password*</label>
            <input type={!show2 ? "password" : "text"} name="cpassword" id="cpassword" value={data.cpassword} onChange={handleChange} placeholder='Re-enter Password' />
            <div className="hide" onClick={() => setShow2(!show2)}>{!show2 ? <AiFillEye /> : <AiTwotoneEyeInvisible />}</div>

          </div>
          <button className='button' onClick={addDataUser}>Signup</button>
          {/* <button className='button' onClick={signUpWithGoogle}>Signup with google</button> */}
          <div className="buttons">Already have account yet <span onClick={() => { navigate("/login") }}>Login</span></div>
        </form>
      </div>
    </div>
  )
}

export default Signup