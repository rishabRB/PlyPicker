"use client"

import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import React from "react";


const ReviewProductList = ({product}) => {

    const router = useRouter()
    const handleClick = () =>{
        if(product.status === "pending"){
            router.push(`/profile/pending/request?request_id=${product._id}`)
        }
        else{
            enqueueSnackbar("Item Not pending", {variant : "error"})
        }
        
    }


    return (
        <div onClick={handleClick} className="p-4 border flex flex-col md:flex-row items-center justify-between border-gray-400 rounded-md shadow-sm bg-white cursor-pointer">
        <div className="">   
        <img src={product.image} alt={product.productName} className="w-48 h-48 object-cover rounded-md mb-4" />
        </div>
        <div>
        <h2 className="text-lg font-semibold mb-2">Product Name : {product.productName}</h2>
        <h2 className="text-md font-medium mb-2">Product id : {product.id}</h2>
        <p className="text-gray-600 mb-2">Price: ${product.price}</p>
        </div>
        <div className="p-2">
        <p className={`text-sm font-bold uppercase ${product.status === 'approved' ? 'text-green-600' : product.status === 'rejected' ? 'text-red-500' : 'text-yellow-500'}`}>
            Status: {product.status}
        </p>
        </div>
    
    </div>
      );
};

export default ReviewProductList;
