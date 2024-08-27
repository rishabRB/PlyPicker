'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/Components/NavBar";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login");
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <NavBar />
      <div className="h-[680px] xl:h-screen bg-white flex flex-col justify-center items-center">
        <p className="text-6xl text-orange-400 animate-bounce">....</p>
      </div>
    </>
  );
}
