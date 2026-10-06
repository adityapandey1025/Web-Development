import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';

const app=express();

/*

const allowedOrigins=[
    "http://localhost:5173", // better if use process.env.CORS_ORIGIN_LOCALHOST
    "https://your-app.vercel.app"
]

app.use(cors({
    origin:allowedOrigin,
    credentials:true
}))
 
*/



app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"));
app.use(cookieParser());



export {app}