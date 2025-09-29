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
        const { title, text } = req.body
        if (!title || !text) {
            return res.status(400).json({
                error: "Tittle & Text are Required"
            })
        }
        const post = await Post.create({
            title,
            text
        })
        res.status(201).json(post)
    } catch (error) {
        console.error("Contact Your Developer For More Info : Error While Creating Posts", error)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
})



app.get('/posts', async (req, res) => {
    try {
        const post = await Post.find().sort({ createdAt: -1 })
        res.status(200).json(post)
    } catch (error) {
        console.error("Contact Your Developer For More Info : Error While Getting Posts", error)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
})



app.get('/post/:postId', async (req, res) => {
    try {
        let postId = req.params.postId
        const post = await Post.findById(postId)
        if (!post) {
            return res.status(404).send({
                "error": `Recheck You Id Once: ${postId}`
            })
        }
        res.status(200).json(post)

    } catch (error) {
        console.error(`Error fetching post: ${req.params.id}`, error);
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
})



app.put('/post/:postId', async (req, res) => {
    try {
        const { title, text } = req.body
        let postId = req.params.postId;
        if (!title || !text) {
            return res.status(400).json({
                error: "Title and Text are Required"
            })
        }
        const post = await Post.findByIdAndUpdate(postId, { title, text })
        if (!post) {
            return res.status(404).send({
                "error": `post not found with id: ${postId}`
            })
        }
        res.json(post)

    } catch (error) {
        console.error(`Error fetching post: ${req.params.id}`, error);
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
})

app.delete('/post/:postId', async (req, res) => {
    try {
        let postId = req.params.postId
        const post = await Post.findByIdAndDelete(postId)
        console.log(`Post with Id: ${req.params.postId} is deleted`)
        res.status(204).json({
            message: "Deleted Success Fully"
        })
    } catch (error) {
        console.error(`Error fetching post`, error);
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
})



app.listen(PORT, async () => {
    await connectDb();
    console.log(`App is Running on PORT ${PORT}`);
})



