"use client"

import {Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import NavBar from '@/Components/NavBar';
import ImageCropModal from '@/Components/ImageCropper';



function EditProductPage() {
    const [product, setProduct] = useState({
        productName: '',
        image: '',
        price: '',
        productDescription: '',
        department: ''
    });



    const [modal,setModal] = useState(false)

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



    const [role, setRole] = useState(null);
    const [userId, setUserId] = useState(null);

    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const router = useRouter();

    useEffect(() => {
        setRole(localStorage.getItem('role'));
        setUserId(localStorage.getItem('user_id'));
    }, []);

    useEffect(() => {
        if (id) {
            getProductData();
        }
    }, [id]);

    const getProductData = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/getProduct?id=${id}`);
            if (res && res.data) {
                setProduct(res.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (role === "admin") {
            try {
                const res = await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/updateProduct?id=${id}`, product);
                if (res.status === 200) {
                    enqueueSnackbar('Updated successfully', { variant: "success" });
                    router.push(`/product?id=${id}`);
                }
            } catch (err) {
                enqueueSnackbar('Error updating product', { variant: "error" });
            }
        } else if (role === "team_member") {
            try {
                const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/updateProduct?id=${id}&user_id=${userId}`, product);
                if (res.status === 200) {
                    enqueueSnackbar('Updated successfully', { variant: "success" });
                    router.push(`/product?id=${id}`);
                }
            } catch (err) {
                enqueueSnackbar('Error updating product', { variant: "error" });
            }
        } else {
            enqueueSnackbar('Error updating product', { variant: "error" });
        }
    };

    const buttonText = role === "admin" ? "Save change as admin" : "Save change for review";

    return (
            <>            
            <NavBar />
            <div className="container w-full md:w-1/2 mx-auto my-2 p-4">
                <div className='flex items-center justify-between'>
                    <h1 className="text-3xl uppercase font-semibold text-orange-400 mb-6">Edit Product</h1>
                    <button
                        onClick={() => router.back()} 
                        className="px-4 py-2 bg-orange-400 text-white uppercase"
                    >
                        Cancel
                    </button>
                </div>

                {
                product ? (

                !modal ?
                ( <div className="space-y-4">
                    <div>
                        <label htmlFor="productName" className="block text-lg font-medium">Product Name</label>
                        <input
                            type="text"
                            id="productName"
                            name="productName"
                            value={product.productName}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
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
                        <label htmlFor="price" className="block text-lg font-medium">Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="productDescription" className="block text-lg font-medium">Description</label>
                        <textarea
                            id="productDescription"
                            name="productDescription"
                            value={product.productDescription}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            rows="4"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="department" className="block text-lg font-medium">Category</label>
                        <input
                            type="text"
                            id="department"
                            name="department"
                            value={product.department}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                    <div className='space-x-2'>
                        <button
                            onClick={handleSubmit} 
                            className="px-4 py-2 bg-orange-400 text-white uppercase"
                        >
                            {buttonText}
                        </button>
                    </div>
                </div>
                )
                :
                (
                    <div className='w-[500px]'>
                        <ImageCropModal onClose={onClose} imageUrl={product.image} onCropComplete={onCropComplete}/>
                    </div>
                )
                )
                :
                (
                    <div className="h-[680px] xl:h-screen bg-white flex flex-col justify-center items-center">
                      <p className="text-6xl text-orange-400 animate-bounce">....</p>
                    </div>
                )
                }
            </div>
            </>
    );
}


export default EditProductPage