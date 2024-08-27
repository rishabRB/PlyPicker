import { connet } from "@/app/dbConfig.js/dbConfig";
import User from '@/app/models/userModel';
import ReviewProduct from "@/app/models/ReviewProductModel";


export async function GET(request) {
    await connet();

    const url = new URL(request.url);
    const userId = url.searchParams.get('user_id');

    try {
        const user = await User.findById(userId).populate('reviewProduct');

        if (!user) {
            return new Response(
                JSON.stringify({ error: 'User not found' }),
                { status: 404, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const totalRequests = user.reviewProduct.length;
        const pendingRequests = user.reviewProduct.filter(product => product.status === 'pending').length;
        const rejectedRequests = user.reviewProduct.filter(product => product.status === 'rejected').length;

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
