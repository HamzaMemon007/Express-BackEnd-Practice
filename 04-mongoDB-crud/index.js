import express from "express"
import fs from 'fs'
import path from 'path'
import mongoose from "mongoose";
import dotenv from "dotenv";
import Post from "./models/Post.js";




dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const filePath = path.join(process.cwd(), "posts.json");
const app = express()
const PORT = 3001

app.use(express.json())

// DATABASE CONNECTION
const connectDB = async () => {
    if (!MONGO_URI) throw new Error("MONGO_URI not defined in .env")
    try {
        await mongoose.connect(MONGO_URI)
        console.log("Connected to DataBase Successfully")
    } catch (error) {
        console.log("Error in Connecting DB: : : ", error)
        process.exit(1);
    }

}


// Example Body
/*{
    title: "abc",
    text:"abc"
    }*/

// const readPosts = () => {
//     if (!fs.existsSync(filePath)) {
//         fs.writeFileSync(filePath, JSON.stringify([]));
//     }
//     const data = fs.readFileSync(filePath)
//     return JSON.parse(data)
// }

// const writePosts = (posts) => {
//     fs.writeFileSync(filePath, JSON.stringify(posts, null, 2))
// }



//Create POST
app.post('/post', async (req, res) => {
    try {
        const { title, text } = req.body
        if (!title || !text) {
            return res.status(400).json({
                error: "Title and Text are Required"
            })
        }
        const post = await Post.create({title,text})
        res.status(201).json(post);
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
})


// Get POSTS

app.get('/posts', async (req, res) => {
    try {
        const post = await Post.find().sort({createdAt: -1})
        res.status(200).json(post)
    } catch (error) {
        console.error("Error fetching post:", error);
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
})



//Get Single POST
app.get('/post/:postId', async (req, res) => {
    try {
        let postId = req.params.postId

        const post = await Post.findById(postId)
        if (!post) {
            return res.status(404).send({
                "error": `post not found with id: ${postId}`
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


// Update A Post
app.put('/post/:postId', async (req, res) => {
    try {
        const { title, text } = req.body
        let postId = req.params.postId;

         if (!title || !text) {
            return res.status(400).json({
                error: "Title and Text are Required"
            })
        }

        const post = await Post.findByIdAndUpdate(postId,{title, text})
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
    console.log(`App is Runing on PORT ${PORT}`)
    await connectDB()

})