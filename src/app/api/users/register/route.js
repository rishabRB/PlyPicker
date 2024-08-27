import { connet } from "@/app/dbConfig.js/dbConfig";
import User from "@/app/models/userModel";
import bcryptjs, { hash } from 'bcryptjs'
import jwt from 'jsonwebtoken';




export async function POST(req,res){
    
    await connet()
    const {username,password,role} = await req.json();
    console.log(username + " " + password + " " + role)
    try{
    const user = await User.findOne({username : username})
    if(user){
        return new Response(JSON.stringify({ error: 'User already exists' }), { status: 400 });
    }

    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password,salt)

    const newUser = new User({
        username,
        password:hashedPassword,
        role,
        reviewProduct:[]
    })

   await newUser.save()

   return new Response(JSON.stringify({ message : "User Registred Successfully"}), { status: 200 }); 
   }
   catch(err){
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
   }
}