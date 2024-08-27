import { connet } from "@/app/dbConfig.js/dbConfig";
import Products from '@/app/models/ProductModel';

export async function GET(request) {
    await connet();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    try {
        const product = await Products.findById({_id:id}); 
        if (!product) {
            return new Response(
                JSON.stringify({ error: 'No products found' }),
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify(product),
            { status: 200, headers: { 'Content-Type': 'application/json' } } 
        );

    } catch (err) {
        return new Response(
            JSON.stringify({ error: err.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } } 
        );
    }
}