import { connet } from "@/app/dbConfig.js/dbConfig";
import Products from '@/app/models/ProductModel';

export async function GET(req, res) {
    await connet(); 
    
    try {
        const products = await Products.find();
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