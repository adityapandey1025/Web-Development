const express=require("express")
const port=process.env.PORT || 3000;

const app=express();

app.use(express.json())

app.get('/',(req,res)=>{
    res.json({
        name:"aditya",
        age:21,
        gender:"male"
    })
})

app.post('/conversation',(req,res)=>{
    console.log(req.query);
    console.log(req.body)
    res.json({
        suceess:true
    })
})

app.listen(port,()=>{
    console.log("server running at ",port)
})