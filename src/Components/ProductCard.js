"use client"

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


const ProductCard = ({ product }) => {
 
  const router = useRouter()
  const handleClick = () =>{
    router.push(`/product?id=${product._id}`);
  }


  return (
    <div onClick={handleClick} className="max-w-sm mx-1 bg-white border border-gray-400 rounded-lg shadow-md overflow-hidden">
        <Image
          src={product.image}
          alt={product.productName}
          width={400} // Adjust this value as needed
          height={200} // Adjust this value as needed
        />
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-900">{product.productName}</h2>
        <p className="mt-2 text-gray-600">{product.productDescription}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-900">${product.price}</span>
          <span className="text-sm font-bold text-gray-500">ID: {product.id}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;