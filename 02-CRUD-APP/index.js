import express from "express"
import { nanoid } from "nanoid"
import fs from 'fs'
import path from 'path'



const filePath = path.join(process.cwd(), "posts.json");
const app = express()
const PORT = 3001

app.use(express.json())

// Example Body
/*{
    title: "abc",
    text:"abc"
    }*/

   const readPosts = ()=>{
       if(!fs.existsSync(filePath)){
        fs.writeFileSync(filePath, JSON.stringify([]));
    }
    const data = fs.readFileSync(filePath)
    return JSON.parse(data)
}

const writePosts= (posts) =>{
    fs.writeFileSync(filePath, JSON.stringify(posts, null, 2))
}

const posts = readPosts()


//Create POST
app.post('/post', (req, res) => {
    try {
        const { title, text } = req.body
        if (!title || !text) {
            return res.status(400).json({
                error: "Title and Text are Required"
            })
        }
        const newPost = {
            id: nanoid(),
            title,
            text,
        }
        posts.push(newPost)
        writePosts(posts)
        res.status(201).json(newPost);
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
})


// Get POSTS

app.get('/posts', (req, res) => {
    try {
        res.status(200).json(posts)
    } catch (error) {
        console.error("Error fetching post:", error);
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
})



//Get Single POST
app.get('/post/:postId', (req, res) => {
    try {
        let postId = req.params.postId

        const post = posts.find((p) => p.id === postId)
        if (!post) {
            return res.status(404).send({
                "error": `post not found with id: ${postId}`
            })
        }
        res.status(200).json(post)


    } catch (error) {
        console.error(`Error fetching post: ${postId}`, error);
        res.status(500).json({
            error: "Internal Server Error"
        })
    }

})


// Update A Post
app.put('/post/:postId', (req, res) => {
    try {
        const { title, text } = req.body
        let postId = req.params.postId

        const post = posts.find((p) => p.id === postId)
        if (!post) {
            return res.status(404).send({
                "error": `post not found with id: ${postId}`
            })
        }

        if (title) post.title = title
        if (text) post.text = text
        writePosts(posts)
        res.json(post)


    } catch (error) {
        console.error(`Error fetching post: ${postId}`, error);
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
})


app.delete('/post/:postId', (req, res) => {
    try {
        let postId = req.params.postId

        const postIndex = posts.findIndex((p) => p.id === postId)
        if (postIndex === -1) return res.status(404).json({ error: "Post not found" });
        const deletedPost = posts.splice(postIndex, 1);
        writePosts(posts)
        res.json({ message: "Post deleted", post: deletedPost[0] });

    } catch (error) {
        console.error(`Error fetching post`, error);
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
})


app.listen(PORT, () => {
    console.log(`App is Runing on PORT ${PORT}`)
})