import express from "express";
import mongoose from "mongoose";
import path from "path"
import fs from "fs"




const PORT = 6565
const app = express()

app.use(express.json())

app.post( "/post" , (res , req) =>{
    console.log("app is working fine")
    res.send(`App is Running on PORT ${PORT}`)
})



app.listen( PORT , () => {
    console.log(`App is Running on PORT ${PORT}`);
    
})



