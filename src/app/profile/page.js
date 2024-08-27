"use client";

import NavBar from "@/Components/NavBar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [stats, setStats] = useState({
    totalRequests: 0,
    pendingRequests: 0,
    rejectedRequests: 0,
  });

  const router = useRouter();


  useEffect(() => {
    setRole(localStorage.getItem('role'));
    setUserId(localStorage.getItem('user_id'));
  }, []);


  useEffect(() => {
    if (role && userId) {
      fetchStats();
    }
  }, [role, userId]);

  const fetchStats = async () => {
    try {
      if (role === "admin") {
        const res = await axios.get("/api/stats");
        if (res.status === 200) {
          setStats(res.data);
        }
      } else if (role === "team_member") {
        const res = await axios.get(`/api/stats/userStats?user_id=${userId}`);
        if (res.status === 200) {
          setStats(res.data);
        }
      }
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  const handleClick = () => {
    if (role === "admin") {
      router.push("/profile/pending");
    } else if (role === "team_member") {
      router.push(`/profile/submissions?user_id=${userId}`);
    }
  };

  const buttonText = role === "admin" ? "Pending Request" : "My submission";

  return (
    <>
      <NavBar />
      <div className="container mx-auto my-8 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl uppercase font-medium text-orange-400 mb-6">
            Profile stats
          </h1>
          <div className="space-x-2">
            <button
              onClick={handleClick}
              className="px-4 py-2 bg-orange-400 text-white uppercase"
            >
              {buttonText}
            </button>
            <button
              onClick={() => router.push("/dashboard")}
              className="px-4 py-2 bg-orange-400 text-white uppercase"
            >
              Cancel
            </button>
          </div>
        </div>
        <div className="bg-white overflow-hidden uppercase p-4">
          <div className="flex flex-col space-y-4">
            <div className="flex p-3 justify-between items-center border-2 border-black">
              <span className="font-semibold">Total Requests:</span>
              <span>{stats.totalRequests}</span>
            </div>
            <div className="flex p-3 justify-between items-center border-2 border-yellow-400">
              <span className="font-semibold">Pending Requests:</span>
              <span>{stats.pendingRequests}</span>
            </div>
            <div className="flex p-3 justify-between items-center border-2 border-red-400">
              <span className="font-semibold">Rejected Requests:</span>
              <span>{stats.rejectedRequests}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
