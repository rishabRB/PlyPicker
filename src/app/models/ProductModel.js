import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
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
    }
})

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;