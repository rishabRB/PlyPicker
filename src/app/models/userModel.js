import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type:String,
        required:[true,"Please provide a email"],
        unique : true,
    },
    password : {
        type:String,
        required:[true,"Please provide a password"]
    },
    role: { 
        type: String, 
        enum: ['admin', 'team_member'], 
        required: true 
    },
    reviewProduct : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ReviewProduct'
      }]
     
})


export default mongoose.models.User || mongoose.model("User",userSchema)

