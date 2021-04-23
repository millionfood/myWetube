import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:"name is required"
    },
    email:{
        type:String,
        required:"email is required"
    },
    avatarUrl:String,
    facebookId:Number,
    githubId:Number,
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comments"
    }],
    videos:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Video"
    }]
})

userSchema.plugin(passportLocalMongoose,{usernameField:"email"})

const model = mongoose.model("User",userSchema);

export default model;