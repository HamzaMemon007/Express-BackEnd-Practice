import { model, Schema } from "mongoose";

const postSchema = new Schema({
    title: {type:String, required:true, trim:true},
    text: {type:String, required:true, },
},{
    timestamps: true,
})

export default model("Post",postSchema)