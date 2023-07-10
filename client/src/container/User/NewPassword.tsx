import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import loginImage from "../../assets/loginImage.png";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const NewPassword = () => {
    const navigate = useNavigate();
    const { id, token } = useParams();
    const notify = (text: any) => toast(text);
    const [showPassword, setShowPassword] = useState(true);
    const [showPassword2, setShowPassword2] = useState(true);
    const [data, setData] = useState({
        password: "",
        cpassword: "",
    });

    const changeHandler = (e: any) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setData({ ...data, [name]: value });
    };

    const sendClickSumit = async (e: any) => {
        e.preventDefault();
        const { password, cpassword } = data;
        try {
            if (!password || !cpassword) {
                // alert("plz fill all field");
                notify("Please fill all field");
            } else if (password !== cpassword) {
                // alert("Password and confirm password is not match");
                notify("Password and confirm password is not match");
            } else {
                const res = await fetch(`/api/savepassword/${id}/${token}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ password, cpassword, id, token }),
                });
                const response = await res.json();
                if (response.status === 201) {
                    // alert("password has update successfully 😊");
                    notify("Password has update successfully 😊");
                    setData({ password: "", cpassword: "" });
                    navigate("/login");
                } else if (response.status === 402) {
                    notify("Password and confirm password is not match");
                }
            }
        } catch (error) {
            notify("Something went wrong please try again after sometime");
        }
    };

    // check user is valid or not
    const userValid = async () => {
        console.log(id,token);
        const res = await fetch(`/api/forgetpassword/${id}/${token}`, {
            method: "GET",
            headers: {
                "Content-Type": "appplication/json",
            },
        });
        const response = await res.json();
        if (response.status === 201) {
            // alert("user valid");
            notify("User valid");
        } else {
            navigate("*");
        }
    };
    useEffect(() => {
        userValid();
    }, []);

    return (
        <div className="Forget">
            <div className="container">
                {/* <img src={loginImage} alt="" /> */}
                <div className="box">
                    <div className="head">Reset Password</div>
                    {/* {message ? <div className="message">Password reset link send Succesfully in Your mail</div> : <></>} */}
                    <form>
                        <div className="point">
                            <label>Your Password</label>

                            <input
                                type={showPassword ? "password" : "text"}
                                name="password"
                                id="password"
                                placeholder="Your New Password"
                                value={data.password}
                                onChange={changeHandler}
                            />
                            <div
                                className="eye"
                                onClick={() => {
                                    setShowPassword(!showPassword);
                                }}
                            >
                                {" "}
                                {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}{" "}
                            </div>
                        </div>
                        <div className="point">
                            <label>Your Confirm Password</label>
                            <input
                                type={showPassword2 ? "password" : "text"}
                                name="cpassword"
                                id="password"
                                placeholder="Your Confirm Password"
                                value={data.cpassword}
                                onChange={changeHandler}
                            />
                            <div
                                className="eye"
                                onClick={() => {
                                    setShowPassword2(!showPassword2);
                                }}
                            >
                                {" "}
                                {showPassword2 ? <AiFillEye /> : <AiFillEyeInvisible />}{" "}
                            </div>
                        </div>
                        <button onClick={sendClickSumit}>Send</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewPassword;
