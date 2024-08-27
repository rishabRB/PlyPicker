import { connet } from "@/app/dbConfig.js/dbConfig";
import ReviewProduct from '@/app/models/ReviewProductModel';

export async function GET() {
    await connet();

    try {
        const totalRequests = await ReviewProduct.countDocuments();
        const pendingRequests = await ReviewProduct.countDocuments({ status: 'pending' });
        const rejectedRequests = await ReviewProduct.countDocuments({ status: 'rejected' });

        return new Response(
            JSON.stringify({
                totalRequests,
                pendingRequests,
                rejectedRequests
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (err) {
        return new Response(
            JSON.stringify({ error: err.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
