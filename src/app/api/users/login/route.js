import { connet } from "@/app/dbConfig.js/dbConfig";
import User from "@/app/models/userModel";
import bcryptjs, { hash } from 'bcryptjs'
import jwt from 'jsonwebtoken';




export async function POST(req,res){
    
    await connet();
    const reqBody = await req.json();
    const { username,password } = reqBody
    try{
    const user = await User.findOne({username : username})
    if(!user){
        return new Response(JSON.stringify({ error: 'User not found' }), { status: 400 });
    }


    const isMatch = await bcryptjs.compare(password,user.password)
    if(!isMatch){
        return new Response(JSON.stringify({ error: 'Incorrect password' }), { status: 400 }); 
    }

   const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1h',
   });

   return new Response(JSON.stringify({ token: token, role : user.role , userId : user._id}), { status: 200 }); 
   }
   catch(err){
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
   }
}