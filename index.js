import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path"
import cors from "cors";


// components 

import Routes from './src/router/routers.js';
import  connection from './src/db/conn.js';

dotenv.config({path:'./config.env'})

// DataBase 
const port = process.env.PORT || 5000;
// connection();



const app = express();
app.use(bodyParser.json({extended: true})); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json())
app.use(cors());    
app.use(cookieParser());    


// ROUTER 
app.use('/api',Routes)


// Render/Heroku/Github 
if(process.env.NODE_ENV === "production"){
    app.use(express.static('client/build'));
    //  app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))) 
    app.get("/*",(req,res)=> res.sendFile(path.resolve('client/build/index.html')))
}



// server 
app.listen(port, () => {
    console.log(`Ready on http:localhost:${port}/api`);
})


