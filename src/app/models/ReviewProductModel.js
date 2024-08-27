import mongoose from "mongoose";

const reviewProductSchema = new mongoose.Schema({
    originalId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required:true
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    productName : {
        type:String,
        required : true
    },
    price : {
        type:String,
    },
    image : { 
        type: String, 
    },
    productDescription : {
        type:String,
    },
    productDescription : {
        type:String,
    },
    department:{
        type:String,
    },
    id : {
        type:String,
    },
    status : {
        type: String, 
        enum: ['rejected', 'approved',"pending"], 
        default:"pending",
        required: true 
    }
})


const ReviewProduct = mongoose.models.ReviewProduct || mongoose.model('ReviewProduct', reviewProductSchema);

export default ReviewProduct;
