import React, { useState } from 'react'
import "./index.scss"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';


const Forget = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "", username: ""
    })

    const handleChange = (e: any) => {
        e.preventDefault()
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }

    const forgetData = async (e: any) => {
        e.preventDefault();
        const { email, username } = user;
        if (!email || !username) { toast.error(`Plz Fill All Input`, { position: "top-center" }) }
        else {
            const dataforget = await fetch("/api/forget", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, username,
                })
            });
            const res = await dataforget.json();
            if (res.status === 201) {
                alert("link is send on Your Mail succesully")
                // const resEmail = res.preEmail;
                // navigate("/new_password", { state: { data: resEmail } })
            } else if (res.status === 404) {
                toast.error(`Given Data is Not Match`, { position: "top-center" })
            } else {
                toast.error(`something went Wrong`, { position: "top-center" })
            }
        }

    }

    return (
        <div className="Login">
            <div className="forget">
                <div className="head">Forget Password</div>
                <form >
                    <div className="point">
                        <label htmlFor="">Your UserName*</label>
                        <input type="text" name="username" id="username" value={user.username} onChange={handleChange} placeholder='Enter Your Username' autoComplete="off" />
                    </div>
                    <div className="point">
                        <label htmlFor="">Your Email*</label>
                        <input type="email" name="email" id="email" value={user.email} onChange={handleChange} placeholder='Enter Your Email' autoComplete="off" />
                    </div>
                    <button className='button' onClick={forgetData}>Verfiying</button>
                    {/* <div className="button" onClick={()=>{navigate("/signup")}}>Signup</div> */}
                    <div className="buttons">Don't have an account yet? <span onClick={() => { navigate("/signup") }}>Signup</span></div>
                </form>
            </div>
        </div>
    )
}

export default Forget