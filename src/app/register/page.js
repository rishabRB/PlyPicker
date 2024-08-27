"use client";

import NavBar from "@/Components/NavBar";
import axios from "axios";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";



function Register() {

  const { register, handleSubmit } = useForm();
  const [isLoading,setIsLoading] = useState(false)
  const router = useRouter()
  const onSubmit = (data) => {
    if(!data.username){
      enqueueSnackbar("Enter Username",{variant : "error"})
    }
    else if(!data.password){
      enqueueSnackbar("Enter Password",{variant : "error"})
    }
    else if(!data.role){
      enqueueSnackbar("Select Role",{variant : "error"})
    }
    else{
      registerUser(data)
    }
  };

  const registerUser = async (data) => {
    setIsLoading(true)
    try{
      const res = await axios.post("/api/users/register",data)
      if(res.status === 200){
        enqueueSnackbar(res.data.message,{variant : "success"})  
        router.push("/login")
      }
    }
    catch(err){
      setIsLoading(true)
      enqueueSnackbar(err.response.data.error ,{variant : "error"}) 
    }
  };

  return (
    <>
      <NavBar />
      <div className='min-h-[80vh]  relative bg-no-repeat bg-fixed bg-cover items-center bg-[url("https://images.pexels.com/photos/132193/pexels-photo-132193.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")] bg-image'>
        <div className="w-[400px] absolute right-12 top-32 h-[400px] py-5 px-10 bg-white ">
          {/* default section */}
          {!isLoading ? (
          <div>
          <div className="flex flex-col items-center justify-center m-5">
            <h1 className="text-2xl font-extrabold">Register</h1>
            <span className="text-[12px] text-gray-500">
              Enter your credentials
            </span>
          </div>

          {/* form section */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center justify-items-center space-y-5"
          >
            <input
              {...register("username")}
              className="px-5 py-3 border-2 rounded outline-0"
              placeholder="Username"
            />
            <input
              {...register("password")}
              className="px-5 py-3 border-2 rounded outline-0"
              placeholder="Password"
              type="password"
            />
            <div className="flex items-center justify-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  {...register("role")} // Using the same name for grouping
                  name="role"
                  className="w-4 h-4 border-gray-300"
                  type="radio"
                  value="admin" // Value to identify the selected option
                />
                <span className="text-gray-700">Admin</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  {...register("role")} // Using the same name for grouping
                  name="role"
                  className="w-4 h-4 border-gray-300"
                  type="radio"
                  value="team_member" // Value to identify the selected option
                />
                <span className="text-gray-700">Team Member</span>
              </label>
            </div>

            <input
              type="submit"
              className="bg-black text-white px-5 py-3 w-[100px] uppercase font-bold rounded-sm"
            />
          </form>
          <div className="flex flex-col items-center justify-center p-2">
            <span className="text-[12px] text-gray-500">
              Already have account?{" "}
              <a className="text-orange-400" href="/login">
                Login here
              </a>
            </span>
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
  );
}

export default Register;
