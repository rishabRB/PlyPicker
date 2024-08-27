import { connet } from "@/app/dbConfig.js/dbConfig";
import ReviewProduct from "@/app/models/ReviewProductModel";

export async function GET(request) {
    await connet(); 
    const { searchParams } = new URL(request.url);
    const request_id = searchParams.get('request_id')

    // console.log(request_id)

    try {
        const products = await ReviewProduct.findById(request_id).populate(['originalId']);
        if (!products || products.length === 0) {
            return new Response(
                JSON.stringify({ error: 'No products found' }),
                { status: 404 } 
            );
        }

        return new Response(
            JSON.stringify(products),
            { status: 200} 
        );

    } catch (err) {
        console.log(err)
        return new Response(
            JSON.stringify({ error: err.message }),
            { status: 500 } 
        );
    }
}