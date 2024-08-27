import mongoose from "mongoose";

export async function connet(){
    try{
        await mongoose.connect(process.env.MONGO_URL,{dbName: 'plypicker'})
        const connection = mongoose.connection;

        connection.on('connected',()=>{
            console.log("MongoDB connected successfully")
        })

        connection.on('error',(err)=>{
            console.log('MongoDB connection error. Please make sure mongodb is running .' + err)
            process.exit()
        })
    }
    catch(err){
        console.log(err)
    }
}