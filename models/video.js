import mongoose from "mongoose";


const videoSchema = new mongoose.Schema({
    fileUrl:{
        type:String,
        required:"fileUrl is required"
    },
    title:{
        type:String,
        required:"title is required"
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ],
    views:{
        type:Number,
        default:0
    },
    date:{
        type:Date,
        default:Date.now
    },
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    description:String
})

const model = mongoose.model("Video",videoSchema);

export default model;
