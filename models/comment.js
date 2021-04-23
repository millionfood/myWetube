import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    text:String,
    creatAt:{
        type:Date,
        default:Date.now
    },
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

const model = mongoose.model("Comment",CommentSchema);

export default model;