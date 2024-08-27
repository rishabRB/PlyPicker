'use client'

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { enqueueSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';
import NavBar from '@/Components/NavBar';



function Login() {

  const { register, handleSubmit } = useForm();
  const router = useRouter()
  const [isLoading,setIsLoading] = useState(false)




  useEffect(()=>{
    const token = localStorage.getItem("token")
    redirect(token)
  },[router])  

  
  const onSubmit = data => {
    if(!data.username){
      enqueueSnackbar("Enter Username",{variant : "error"})
    }
    else if(!data.password){
      enqueueSnackbar("Enter Password",{variant : "error"})
    }
    else{
      userLogin(data)
    }
  }

  const redirect = (token) =>{
    if(token){
      router.push("/dashboard")
    }
    else{
      router.refresh("/login")
    }
  }

  const userLogin= async (data) =>{
    setIsLoading(true)
    try{
      const res = await axios.post("/api/users/login",data)
      if(res.status === 200 ){
        console.log(res)
        localStorage.setItem("token",res.data.token)
        localStorage.setItem("role",res.data.role)
        localStorage.setItem("user_id",res.data.userId)
        redirect(res.data.token)
      }
    }
    catch(err){
      setIsLoading(false)
      enqueueSnackbar(err.response.data.error ,{variant : "error"}) 
    }
    
  }


  
  return (
    <>
    <NavBar />
    <div className='h-[80vh]  relative bg-no-repeat bg-fixed bg-cover items-center bg-[url("https://images.pexels.com/photos/132193/pexels-photo-132193.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")] bg-image'>
        <div className='w-[400px] absolute right-12 top-32 h-[400px] py-5 px-10 bg-white '>

            {/* default section */}
            {
            !isLoading ? (
            <div>
            <div className='flex flex-col items-center justify-center m-5'>
                <h1 className='text-2xl font-extrabold'>Log in</h1>
                <span className='text-[12px] text-gray-500'>Enter your credentials</span>
            </div>

            {/* form section */}
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center justify-items-center space-y-5'>
                <input 
                 {...register('username')}
                 className='px-5 py-3 border-2 rounded outline-0'
                 placeholder='Username'
                />
                <input 
                {...register('password')}
                className='px-5 py-3 border-2 rounded outline-0'
                placeholder='Password'
                type="password"
                 />
                 <input
                 type="submit"
                 className='bg-black text-white px-5 py-3 w-[100px] uppercase font-bold'
                 />
            </form>
            <div className='flex flex-col items-center justify-center p-2'>
                <span className='text-[12px] text-gray-500'>Don&apos;t have account? <a className='text-orange-400' href="/register">Register here</a></span>
            </div>
            </div>
          )
          :
          (
            <div className='h-full flex items-center justify-center'>
            <p className='text-6xl text-orange-400 animate-bounce'>....</p>
            </div>
          )
          }
        </div>
    </div>
    </>
  )
}

export default Login