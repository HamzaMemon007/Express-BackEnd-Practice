import express from "express"
import { nanoid } from "nanoid"

const app = express()
const PORT = 6565


app.use(express.json())
const posts = []

app.post("/post", (req, res) => {
    try {
        const { text, title } = req.body
        if (!text || !title) {
            return res.status(400).json({
                error: "Title and Text not Found"
            })
        }

        const newPost = {
            id: nanoid(),
            text: text,
            title: title
        }

        posts.push(newPost)
        res.status(201).json(newPost)

    } catch (error) {
        console.error("Error Create:", error);
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
})

app.get('/posts', (req, res) => {
    try {
        res.status(200).json(posts)
    } catch (error) {
        console.error("Error Read:", error);
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
})