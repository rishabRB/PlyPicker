"use client"

import NavBar from '@/Components/NavBar';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import ReviewProductList from '@/Components/ReviewProductList';


const Pending = () => {

  const[products,setProducts] = useState(null)


  const fetchData = async () =>{
  try{
    const res = await axios.get(`/api/reviewProduct/allReviews`)
    if(res.status === 200){
      setProducts(res.data)
    }
  }
  catch(err){
    console.log(err)
  }
}

useEffect(()=>{
  fetchData()
},[])

if(products === null){
    return (
     <div className='h-[680px] xl:h-screen bg-white flex flex-col justify-center items-center'>
     <p className='text-6xl text-orange-400 animate-bounce'>....</p>
     </div>
    ) 
}


return (
  <>
  <NavBar />
  <div className="container mx-auto my-8 p-4">
      <div className='flex items-center justify-between'>
      <h1 className="text-2xl uppercase text-orange-400 font-semibold mb-6">Pending requests</h1>
      <Link className='font-semibold py-2 px-3 w-16 text-white uppercase flex items-start bg-orange-400 cursor-pointer' href="/profile"> Back </Link>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              {
              products.length > 0 ? products.map((product,index) => (
                <div key={index} className='m-1'>
                  <ReviewProductList product={product} />
                </div>
              ))
              :
              (
                <div className='flex items-center text-red-500 justify-center'>
                      <p> NO PRODUCT FOUND</p>
                </div>
              )
            
            }
      </div>
  </div>
  </>
);
}

export default Pending