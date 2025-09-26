import { Schema , model } from "mongoose";


const postSchema = new Schema({

    title : {type : string , required : true , trim : true } ,
    text : {required : true , type : string }

},{

    timestamps : true
    
})


export default model("post" , postSchema)