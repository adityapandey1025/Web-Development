// require('dotenv').config()
import dotenv from 'dotenv'
import connectDB from "./db/index.js";
import { app } from './app.js';


dotenv.config({path:"./.env"});

/*
import { DB_NAME } from "./constants";
import express from "express";
const app=express();

;(async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/$    {process.env.DB_NAME}`);
        app.on("error",(error)=>{
            console.log(error);
            throw error;
        });

        app.listen(process.env.PORT,()=>{
            console.log("App is running on ",process.env.PORT);
        })
    } catch (error) {
        console.error(error.message);
        throw error;
    }
})()

*/


const port=process.env.PORT || 3000;
connectDB()
    .then(()=>{
        app.listen(port,()=>{
            console.log("Server is running on port : ",port);
        });

        app.on("error",(error)=>{
            console.log("Error Message on express ",error.message);
        })
    })
    .catch((error)=>{
        console.log("DB CONNECTION FAILED ");
    })


