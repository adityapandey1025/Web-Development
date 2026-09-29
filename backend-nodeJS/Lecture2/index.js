require('dotenv').config()
const express=require("express");
const app=express()



app.get('/',(req,res)=>{
    res.send("hello madharchodo");
})

app.listen(process.env.PORT,()=>{
    console.log("app is running at port ",process.env.PORT);
    console.log("something changes ....");
})  