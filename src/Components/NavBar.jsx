"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NavBar = () => {
  const router = useRouter();

  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const handleLogOut = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <nav className="sticky flex items-center justify-between p-4 bg-[#fff] shadow-xl">
      
     {/* logo */}
      <div
        onClick={() =>
          token ? router.push("/dashboard") : router.push("/login")
        }
        className="flex items-center justify-between cursor-pointer space-x-2 px-2"
      >
        <div className="flex text-black uppercase font-medium text-xl">
          <div className="">Ply</div>
          <div className="text-orange-400">Picker</div>
        </div>
      </div>

      <div className="">
        {token ? (
          <div className="flex space-x-2">
            <button
              className="font-semibold py-2 px-3 flex items-star text-orange-400 cursor-pointer"
              onClick={() => router.push("/profile")}
            >
              PROFILE
            </button>
            <button
              className="font-semibold py-2 px-3 text-white flex items-star bg-orange-400"
              onClick={handleLogOut}
            >
              LOGOUT
            </button>
          </div>
        ) : (
          <div className="font-semibold py-2 px-3  text-white flex items-start bg-orange-400 cursor-pointer">
            <button onClick={() => router.push("/login")}>LOGIN</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
