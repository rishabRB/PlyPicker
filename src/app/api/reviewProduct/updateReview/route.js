import { connet } from "@/app/dbConfig.js/dbConfig";
import ReviewProduct from "@/app/models/ReviewProductModel";
import { ObjectId } from 'mongodb';
import { set } from "mongoose";



export async function PUT(request) {
    await connet();
   




    const { searchParams } = new URL(request.url);
    const request_id = searchParams.get('request_id')


    if (!request_id) {
        return new Response(
            JSON.stringify({ error: 'Request ID is required' }),
            { status: 400 }
        );
    }



    try {

        const product = await ReviewProduct.findByIdAndUpdate(new ObjectId(request_id),{$set:{status : "rejected"}})

        if (!product) {
            return new Response(
                JSON.stringify({ error: 'No product found with the given ID' }),
                { status: 404}
            );
        }

        return new Response(
            JSON.stringify({message : "success"}),
            { status: 200, }
        );

    } catch (err) {
        return new Response(
            JSON.stringify({ error: err.message }),
            { status: 500,}
        );
    }
}