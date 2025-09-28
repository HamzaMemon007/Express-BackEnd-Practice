import express from "express";
import mongoose from "mongoose";
import path from "path"
import dotenv from "dotenv"
import Post from "./models/Posts.js"



dotenv.config()

const MONGO_URI = process.env.MONGO_URI
const filePath = path.join(process.cwd(), "posts.json")
const PORT = 6565
const app = express()

app.use(express.json())

const connectDb = async () => {
    if (!MONGO_URI) throw new Error("MONGO_URI not found please recheck .env")
    try {
        await mongoose.connect(MONGO_URI)
        console.log("Connected with database succesfully")
    } catch (error) {
        console.log("Error while connecting database : : :", error)
        process.exit(1)
    }

}

app.post("/post", async (req, res) => {
    try {
        const { title , text } = req.body
        if(!title || !text) {
            return res.status(400).json({
                error : "Tittle & Text are Required"
            })
        }
        const post = await post.create({
            title,
            text
        })
        res.status(201).json(post)
    } catch (error) {
        console.error("Contact Your Developer For More Info : Error While Creating Posts" , error)
        res.status(500).json({
            error : "Internal Server Error"
        })

    }
})


app.get('/posts' , async (req , res) =>{
    try {
        const post = await post.find().sort({createdAt : -1})
        res.status(200).json(post)
    } catch (error) {
        console.error("Contact Your Developer For More Info : Error While Getting Posts" , error)
        res.status(500).json({
            error : "Internal Server Error"
        })
    }
})


app.listen(PORT, () => {
    console.log(`App is Running on PORT ${PORT}`);

})



