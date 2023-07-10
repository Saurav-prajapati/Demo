import React, { useState } from 'react'
import "./index.scss"
import { useNavigate } from 'react-router-dom'
import { AiFillEye, AiTwotoneEyeInvisible } from "react-icons/ai"
import { AiOutlineGooglePlus } from "react-icons/ai"
// import { auth, provider } from "../../firebase/firebase"
import { signInWithPopup } from 'firebase/auth'

// toastify import 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Login = ({ setList}: any) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false)
  const [user, setUser] = useState({
    username: "", password: ""
  })
  

  const handleChange = (e: any) => {
    e.preventDefault()
    const { name, value } = e.target;
    setUser({ ...user, [name]: value })
  }


  const loginData = async (e: any) => {
    e.preventDefault();
    const { username, password } = user;
    var passw=  "(?=.*[a-z])(?=.*[A-Z]).{6,}";
    if (!username || !password) { (toast.warn(`Plz Fill All Input 😂`, { position: 'top-center' })) }
    else if (!password.match(passw)) { toast.error(`Plz fill Password is 1 Uppercase,1 Lowercase And Minimum lenght 6 characters🧐`, { position: 'top-center' }) }
    else {
      const dataLogin = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username, password,
        })
      });
      const res = await dataLogin.json();
      if (res.status === 201) {
        let responseName = res.result?.validUser?.name;
        let responseNotes = res.result?.validUser?.notes;
        let userid = res.result?.validUser?._id;
        toast.success(`Hii ${responseName},Succesful Login 🤤`, { position: "top-center",autoClose: 2000,});
        navigate("/")
        setList(res.result.validUser.notes)
        // setuserInfo(res.result.validUser)
        localStorage.setItem('usertokens', res.result.token);
        localStorage.setItem('usernotes', responseNotes)
        localStorage.setItem("responseName", responseName)
        localStorage.setItem("userId", userid)
        setUser({ ...user, username: "", password: "" })
      } else if (res.status === 404) {
        toast.error(`Your Credentail is wrong`, { position: "top-center" })
      } else {
        toast.error(`Something Went Wrong Plz try After Sometime`, { position: "top-center" })
      }
    }
  }


  // google Singin 
  // const handleGoogleSignin = async () => {
  //   // const data = await signInWithPopup(auth, provider)
  //   try {
  //     if (data) {
  //       const response = await fetch("/api/googleSigin", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json"
  //         },
  //         body: JSON.stringify({
  //           data
  //         })
  //       });
  //       const res = await response.json();
  //       if (res.status === 201) {
  //         let responseName = res.result?.emailverified?.name;
  //         let responseNotes = res.result?.emailverified?.notes;
  //         let userid = res.result?.emailverified?._id;
  //         navigate("/")
  //         setList(res.result.emailverified.notes)
  //         // setuserInfo(res.result.emailverified)
  //         localStorage.setItem('usertokens', res.result.token);
  //         localStorage.setItem('usernotes', responseNotes)
  //         localStorage.setItem("responseName", responseName)
  //         localStorage.setItem("userId", userid)
  //         setUser({ ...user, email: "", password: "" })
  //         toast.success(`You are succesfully Signin 😊`, {
  //           position: "top-center",
  //           autoClose: 2000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //         });
  //       } else if (res.status === 404) {
  //         toast.error(`You are signin with another mail`, {position: "top-center"});
  //       } else if (res.status === 422) {
  //         toast.error(`something Went Wrong`, { position: "top-center" })
  //       } else {
  //         toast.error(`something went wrong`, { position: "top-center" })
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }


  return (
    <div className="Login">
      <div className="login">
        <div className="head">Login</div>
        <form >
          <div className="point">
            <label htmlFor="">Your UserName*</label>
            <input type="text" name="username" id="username" value={user.username} onChange={handleChange} placeholder='Enter UserName' />
          </div>
          <div className="point">
            <label htmlFor="">Your Password*</label>
            <input type={!show ? "password" : "text"} name="password" id="password" value={user.password} onChange={handleChange} placeholder='Enter Your Password' autoComplete="off" />
            <div className="hide" onClick={() => setShow(!show)}>{!show ? <AiFillEye /> : <AiTwotoneEyeInvisible />}</div>
          </div>
          {/* <div className="forgotton" onClick={() => { navigate("/forget") }}>forget password</div> */}
          <button className='button' onClick={loginData}>Login</button>
          {/* <div className="button" onClick={handleGoogleSignin} ><AiOutlineGooglePlus /></div> */}
          <div className="buttons">Don't have an account yet? <span onClick={() => { navigate("/signup") }}>Signup</span></div>
        </form>
      </div>
    </div>
  )
}

export default Login