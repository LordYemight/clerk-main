"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useUser, useClerk, UserButton } from "@clerk/nextjs";

const Header = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  // useEffect(() => {
  //   window.location.reload();
  // }, [user])

  return (
    <div className="text-white bg-[#313a36] px-6 font-normal w-full flex justify-between text-[16px] max-w-[1160px] items-center  m-auto py-3 shadow-m">
      <nav
        className={`flex gap-14 items-center flex-row ${open ? "block" : "flex"
          }`}
      >
        <div className="text-[12px] flex gap-5 flex-row">
          <Link href={"/"} className={`hover:text-blue-400 ${pathname === "/" ? "text-blue-500" : ""}`}>
            Home
          </Link>
          <Link
            className={`hover:text-blue-400   ${pathname === "/about" ? "text-blue-500" : ""}`}
            href={"/about"}
            onClick={() => setOpen(false)}
          >
            About
          </Link>
        </div>
      </nav>
      <div
        className={` text-[12px] lg:text-[16px]  flex justify-center items-center   ${open ? "block" : "flex"
          } `}
      >
        {!isLoaded
          ? (
            <p>Loading...</p>
          ) : isSignedIn
            ? (
              <div className={`flex items-center ${open ? "flex  flex-col gap-4 items-start" : "gap-2"}`}>
                <div>
                  <p className={`w-full ${open ? "text-[12px] " : ""}`}>Hi, {user?.lastName}!</p>
                </div>
                <UserButton afterSignOutUrl="/" />
                <button
                  onClick={signOut}
                  className={`w-[110px] rounded-[4px] px-2 text-white bg-blue-500 h-[48px] py-1 hover:bg-blue-400 ${open ? "text-[12px]" : ""}`}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-2 items-center">
                <Link
                  href="/sign-in"
                  className={`hover:text-blue-400 ${open ? "text-[12px]" : ""}`}>
                  Sign in

                </Link>
                <Link
                  href="/sign-up"
                  className={`px-4 rounded-[4px]  text-white bg-blue-500 items-center flex justify-center py-2 hover:bg-blue-400 ${open ? "text-[12px] " : ""}`}
                >
                  Create Account
                </Link>
              </div>
            )}
      </div>
    </div>
  );
};

export default Header;
