"use client"

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import NavBar from '@/Components/NavBar';
import ExampleModal from '@/Components/ExampleModal';

export default function ProductPendingPage() {
    const [product, setProduct] = useState({
        name: '',
        image: '',
        price: '',
        productDescription: '',
        department: ''
    });
    const [modal,setModal] = useState(false)
    const [isLoading,setIsLoading] = useState(false)


    const onClose=()=>{
      setModal(false)
  }


    const onCropComplete = (croppedImage)=>{
      setProduct((prev)=>{
          return {
              ...prev,
              image : croppedImage
          }
      })
  }


    const searchParams = useSearchParams()
    const id = searchParams.get('request_id')
    const router = useRouter()
  
      useEffect(()=>{
        getProductData()
      },[])
  
  
      const getProductData = async () =>{
          try{
            const res = await axios.get(`/api/reviewProduct/getReview?request_id=${id}`);
              if(res){
                 setProduct(res.data)
              }
            }
            catch(err){
              console.log(err)
            }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({ ...prev, [name]: value }));
    };




    const handleAccept = async ()=>{
            setIsLoading(true)
            try {
                const res = await axios.put(`/api/products/updateProduct?id=${product.originalId?._id}&request_id=${id}`, product);
                if(res.status === 200){
                    enqueueSnackbar('Updated successfully' , {variant : "success"}) 
                    router.push(`/product?id=${product.originalId?._id}`);
                }
            } catch (err) {
                setIsLoading(false)
                enqueueSnackbar('Error updating product' , {variant : "error"})
            }
        
    }

    const handleReject= async ()=>{
        setIsLoading(true)
        try {
            const res = await axios.put(`/api/reviewProduct/updateReview?request_id=${id}`, product);
            if(res.status === 200){
                enqueueSnackbar('Updated successfully' , {variant : "success"}) 
                router.push(`/product?id=${product.originalId._id}`);
            }
        } catch (err) {
            setIsLoading(false)
            enqueueSnackbar('Error updating product' , {variant : "error"})
        }
    }


if(product.name === ''){
    return (
     <div className='h-[680px] xl:h-screen bg-white flex flex-col justify-center items-center'>
     <p className='text-6xl text-orange-400 animate-bounce'>....</p>
     </div>
    ) 
}


    return (
        <>
        <NavBar />
        <div className="container w-full  mx-auto my-8 p-4">
          <div className="flex items-center justify-between">
            <h1 className='text-lg uppercase text-orange-400'>Change Request</h1>
            <button
              onClick={() => router.back()}
              className="px-4 py-2 bg-orange-400 text-white uppercase"
            >
              Cancel
            </button>
          </div>
          <div className='w-full flex flex-col md:flex-row items-start space-x-3 justify-between'>

          {
          !modal ? (
           <div className="space-y-4 w-full md:w-1/2 p-2">
            <div>
              <label htmlFor="name" className="block text-lg font-medium">
                Product Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={product.productName}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-400 rounded-md p-2"
                required
              />
            </div>
            <div className='space-y-2'>
                        <label htmlFor="image" className="block text-lg font-medium">Image URL</label>
                        <input
                            type="text"
                            id="image"
                            name="image"
                            value={product.image}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                            <button onClick={()=> setModal(true)} className='px-3 py-1 bg-orange-400 uppercase text-white'>crop</button>
                    </div>
            <div>
              <label htmlFor="price" className="block text-lg font-medium">
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={product.price}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-400 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label
                htmlFor="productDescription"
                className="block text-lg font-medium"
              >
                Description
              </label>
              <textarea
                id="productDescription"
                name="productDescription"
                value={product.productDescription}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-400 rounded-md p-2"
                rows="4"
                required
              />
            </div>
            <div>
              <label htmlFor="department" className="block text-lg font-medium">
                Category
              </label>
              <input
                type="text"
                id="department"
                name="department"
                value={product.department}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-400 rounded-md p-2"
                required
              />
            </div>
            <div className="space-x-2">
              <button
                disabled={isLoading}
                onClick={handleAccept}
                className={`px-4 py-2 bg-green-600 text-white uppercase  ${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
              >
                accept
              </button>
              <button
                disabled={isLoading}
                onClick={handleReject}
                className={`px-4 py-2 bg-red-500 text-white uppercase  ${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
              >
                Reject
              </button>
            </div>
          </div> 
          )
          :
          (
            <div>
             <ExampleModal onClose={onClose} imageUrl={product.image} onCropComplete={onCropComplete} />
           </div>
          )
          }

          <div className="container mx-auto my-8 p-4 w-full md:w-1/2 border border-gray-400">
           {
            !isLoading ? 
            (
            <div className="bg-white shadow-md rounded-md p-6">
              <div className="flex items-center mb-4">
                {product.image && (
                  <img
                    src={product.originalId?.image}
                    alt={product.originalId?.productName}
                    className="w-48 h-48 object-cover rounded-md mr-4"
                  />
                )}
                <div className="flex flex-col">
                <h1 className="text-2xl font-semibold text-orange-400 mb-4">
                {product.originalId?.productName}
              </h1>
                  <p className="text-lg font-medium">
                    <strong>Price:</strong> ${product.originalId?.price}
                  </p>
                  <p className="text-lg font-medium mt-2">
                    <strong>Department:</strong> {product.originalId?.department}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p>{product.originalId?.productDescription}</p>
              </div>
              </div>
              )
              :
              (
                <div className='min-h-56 bg-white flex flex-col justify-center items-center'>
                  <p className='text-6xl text-orange-400 animate-bounce'>....</p>
                 </div>
              )
            }
          </div>
          </div>
        </div>
        </>
    );
}
