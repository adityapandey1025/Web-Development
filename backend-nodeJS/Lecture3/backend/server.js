import express from 'express'
import cors from 'cors'

const app=express();
app.use(cors());
const port=process.env.PORT || 3000;

app.get('/',(req,res)=>{
    res.send("Hiiee Cutie Pieee");
})

app.get('/api/jokes',(req,res)=>{
    const jokes = [
    {
        id: 1,
        title: "Doctors related",
        jokes: "Doctor scare from an apple"
    },
    {
        id: 2,
        title: "Programming related",
        jokes: "Why do programmers prefer dark mode? Because light attracts bugs."
    },
    {
        id: 3,
        title: "School related",
        jokes: "Why did the student eat his homework? Because the teacher said it was a piece of cake."
    },
    {
        id: 4,
        title: "Computer related",
        jokes: "Why was the computer cold? Because it left its Windows open."
    },
    {
        id: 5,
        title: "Food related",
        jokes: "Why did the tomato turn red? Because it saw the salad dressing."
    }
    ];

    res.json(jokes);
})

app.listen(port,()=>{
    console.log("App is listening on ",port);
})