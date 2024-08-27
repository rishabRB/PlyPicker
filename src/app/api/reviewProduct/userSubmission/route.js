import { connet } from "@/app/dbConfig.js/dbConfig";
import User from "@/app/models/userModel";
import { ObjectId } from 'mongodb';
import ReviewProduct from "@/app/models/ReviewProductModel";


export async function GET(request ){
    await connet();
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get('user_id')

    try{
    const user = await User.findById(new ObjectId(user_id)).populate('reviewProduct')
    if(!user){
        return new Response(JSON.stringify({ error: 'User not found' }), { status: 400 });
    }

    return new Response(JSON.stringify({ reviewProduct : user.reviewProduct }), { status: 200});
   }
   catch(err){
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
   }
}