import { connet } from "@/app/dbConfig.js/dbConfig";
import Products from '@/app/models/ProductModel';
import User from "@/app/models/userModel"
import ReviewProduct from "@/app/models/ReviewProductModel";
import { ObjectId } from 'mongodb';
import { set } from "mongoose";

export async function PUT(request) {
    await connet(); // Ensure correct function name
    
    // Parse JSON body
    const body = await request.json();

   const newProduct = {
        productName:body.productName,
        price: body.price,
        image: body.image,
        productDescription: body.productDescription,
        department:body.department,
        id: body.id
   }



    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const request_id = searchParams.get('request_id')


    if (!id && !request_id) {
        return new Response(
            JSON.stringify({ error: 'Product ID/ Request ID is required' }),
            { status: 400 }
        );
    }



    try {
        // Perform the update
        const product = await Products.findByIdAndUpdate(
            new ObjectId(id),
            newProduct,
            { new: true }
        )

        await ReviewProduct.findByIdAndUpdate(new ObjectId(request_id),{$set:{status : "approved"}})

        if (!product) {
            return new Response(
                JSON.stringify({ error: 'No product found with the given ID' }),
                { status: 404}
            );
        }

        return new Response(
            JSON.stringify(product),
            { status: 200, }
        );

    } catch (err) {
        return new Response(
            JSON.stringify({ error: err.message }),
            { status: 500,}
        );
    }
}




export async function POST(request) {
    await connet();
    const body = await request.json();


    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const user_id = searchParams.get('user_id')

    if (!id) {
        return new Response(
            JSON.stringify({ error: 'Product ID is required' }),
            { status: 400 }
        );
    }

    try {

        const user = await User.findById(user_id)

        if(!user) {
            return new Response(
                JSON.stringify({ error: err.message }),
                { status: 500,}
            );
          }

        const newProduct = new ReviewProduct({
            originalId:id,
            user_id:user_id,
            productName:body.productName,
            price: body.price,
            image: body.image,
            productDescription: body.productDescription,
            department:body.department,
            id: body.id,
            status:"pending",
       })

       const product = await newProduct.save();

       if(product){
        user.reviewProduct.push(product._id)
        await user.save();
        await product.populate(['originalId','user_id'])
 
         return new Response(
             JSON.stringify(product),
             { status: 200, }
         );
       }
      

    } catch (err) {
        return new Response(
            JSON.stringify({ error: err.message }),
            { status: 500,}
        );
    }
}