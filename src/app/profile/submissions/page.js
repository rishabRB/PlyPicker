import NavBar from '@/Components/NavBar';
import ProductList from '@/Components/ProductList';
import axios from 'axios';
import React from 'react'
import Link from 'next/link';

const Submissions = async ({searchParams}) => {

  const {user_id} = searchParams
  let products = []



  try{
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/reviewProduct/userSubmission?user_id=${user_id}`)
    if(res.status === 200){
      products = res.data.reviewProduct
    }
  }
  catch(err){
    console.log(err)
  }




return (
  <>
  <NavBar />
  <div className="container mx-auto my-8 p-4">
      <div className='flex items-center justify-between'>
      <h1 className="text-2xl uppercase text-orange-400 font-semibold mb-6">MY submissions</h1>
      <Link className='font-semibold py-2 px-3 w-16 text-white uppercase flex items-start bg-orange-400 cursor-pointer' href="/profile"> Back </Link>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              {
              products.length > 0 ? products.map((product,index) => (
                <div key={index} className='m-2'>
                  <ProductList product={product} />
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

export default Submissions