import express from "express";
// import createAdmin from "../controller/admin-controller.js";

// middleware  
// import authenticate from "../middleware/authentication.js";
import Authenticate from "../middleware/authentication.js";


import   {SignUp,Login,Forget,ForgetPassword} from "../controller/Signupcontoller.js";
import {DataAdd,DeleteItems} from "../controller/Datacontroller.js"


// router.use(cookieParser());
const router = express.Router();


router.post("/", (req, res) => {
    res.send()
})


router.post("/signup",SignUp)
router.post("/login",Login)
router.post("/forget",Forget)
router.get("/forgetpassword/:id/:token",ForgetPassword)
router.get("/userisvalid",Authenticate,(req,res)=>{
   res.send(req.rootUser);
})




// data add 
router.post("/dataadd",DataAdd)
router.post("/deleteitems",DeleteItems)


export default router;