import { Schema , model } from "mongoose";


const postSchema = new Schema({

    title : {type : String , required : true , trim : true } ,
    text : {required : true , type : String }

},{

    timestamps : true
    
})


export default model("post" , postSchema)