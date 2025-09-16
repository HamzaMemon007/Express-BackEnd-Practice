import express from "express";
const app = express()
app.get("/name" , (req , res)=>(
    res.send("Hello World")

))

app.use(express.json())

app.post("/hello" , (req , res)=>{
    const data = req.body.name;
    res.send(`hello ${data}`)
})

app.listen(3000 , ()=>(
    console.log("app is running on port 3000")

))
