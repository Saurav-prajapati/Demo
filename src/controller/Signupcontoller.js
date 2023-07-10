import userDb from "../model/signUpSchema.js";
import bcrypt from "bcryptjs"
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";


// email config for nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "akhileshsaxena20one18@gmail.com",
        pass: "yforbdsuwsdhlomo",
    },
});



// singup 
export const SignUp = async (req, res) => {
    const { name, email, username, password, cpassword } = req.body;
    if (!name || !email || !username || !password || !cpassword) {
        res.status(422).json({ error: "Plz fill all input before submit" })
    }
    try {
        const preuser = await userDb.findOne({ email: email });
        if (preuser) {
            res.status(409).json({ error: "This is Email already exist", status: 409 })
        } else if (password !== cpassword) {
            res.status(408).json({ error: "Your Password and cpassword is not match", status: 408 })
        } else {
            const finalUser = new userDb({ name: name, email: email, username: username, password: password, cpassword: cpassword });
            // hasing password here 
            await finalUser.save();
            res.status(201).json({ message: "User Signup successfully", status: 201 })
        }
    } catch (error) {
        res.status(422).json(error);
    }
}

export const Login = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        res.status(422).json({ message: "plz fill all Input" })
    }
    try {
        const validUser = await userDb.findOne({ username: username })
        if (validUser) {
            const isMatch = await bcrypt.compare(password, validUser.password);
            if (!isMatch) {
                res.status(404).json({ message: "password is not correct", status: 404 })
            } else {
                // token generate 
                const token = await validUser.generateAuthToken();
                
                // cookie Generateor 
                res.cookie("usercookie", token, {
                    expires: new Date(Date.now() + 1500000000),
                    httpOnly: true
                })
                const result = {
                    validUser,
                    token
                };
                res.status(201).json({ message: "succesfully Singin", status: 201, result })
            }
        } else {
            res.status(404).json({ message: "email is not valid", status: 404 })
            console.log("akhilesh");
        }

    } catch (error) {
        res.status(422).json({ message: "plz fill all Input", status: 422, error })

    }
}

// Forget Password 
export const Forget = async (req, res) => {
    const { email, username } = req.body;
    if (!email || !username) {
        res.status(422).json({ error: "Plz fill all input before submit" })
    }
    try {
        if (email || username) {
            const verified = await userDb.findOne({ email: email, username: username })
            if (verified) {
                let token = jwt.sign({ _id: verified._id }, process.env.SECRET_KEY, {
                    expiresIn: "1d",
                });
                const setUserToken = await userDb.findByIdAndUpdate(
                    { _id: verified._id },
                    { verifytoken: token },
                    { new: true }
                );
                if (setUserToken) {
                    const mailOptions = {
                        from: "akhileshsaxena20one18@gmail.com",
                        to: email,
                        sucject: "Sending Email For password Reset",
                        text: `this link Valid For 2 Mintues http://localhost:3000/newpassword/${verified.id}/${setUserToken.verifytoken} `,
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            res.status(402).json({ error: "email not send", status: 402 });
                        } else {
                            res
                                .status(201)
                                .json({ error: "email sent successful", status: 201 });
                        }
                    });
                } else {
                    res.status(401).json({ message: "unsuccesfully gerneate token" });
                }
            } else {
                res.status(401).json({ message: "user is not valid" })
            }
        } else {
            res.status(402).json({ message: "plz fill all input" })
        }


    } catch (error) {
        res.status(422).json({ message: "Something Went Wrong Plz Try After Sometime", error })
    }
}

// new password check user is valid or not 
export const ForgetPassword = async (req, res) => {
    const { id, token } = req.params;
    try {
      const validuser = await userDb.findOne({ _id: id, verifytoken: token });
      console.log(validuser);
      const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
      if (validuser && verifyToken._id) {
        res.status(201).json({ message: "valid User", validuser, status: 201 });
      } else {
        res.status(404).json({ message: "user not Exist", status: 404 });
      }
    } catch (error) {
      res
        .status(422)
        .json({ message: "somthing went wrong", status: 422, error });
    }
  };

