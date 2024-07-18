"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sentEmail, setSentMail] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const response = await api.post(
      //   "/auth/forgotpassword",
      //   { email }
      // );

      if (response.data.statuscode === 200 || 201) {
        setSentMail(true);
      } else {
        setEmailError(response.data.message);
      }
    } catch (error) {
      setEmailError(error.response?.data?.message);
    }
  };

  const handleSubmitT = async (e) => {
    e.preventDefault();

    try {
      // const response = await api.post(
      //   "/auth/forgotpassword",
      //   { email }
      // );

      if (response.data.statuscode === 200 || 201) {
        setSentMail(true);
        // toast.success("reset password link sent to your mail.");
      } else {
        // toast.error(response.data.message);
      }
    } catch (error) {
      // setEmailError(error.response?.data?.message);
    }
  };


  return (
    <div className="">
      <div className="flex m-auto max-w-[1440px] h-[1024px]">
        <div className="sm:w-[794px] w-full flex flex-col ">
          <div className="m-auto mt-32">
            <div className="h-[85%] px-6 w-320px sm:w-full">
              {!sentEmail ? (
                <div className="flex flex-col max-w-[360px] mt-1">
                  <h1 className="text-[30px] sm:text-[36px] text-start font-[700] text-BlackHomz">
                    Forgot Password?
                  </h1>
                  <p className="mt-1 text-[16px] text-start font-[400] text-GrayHomz">
                    Enter your email and we’ll send you a reset link.
                  </p>
                  <form className="mt-6">
                    <div className="flex flex-col gap-2 items-start">
                      <label className="text-center text-[14px] font-[500] text-BlackHomz">
                        Email*
                      </label>
                      <input
                        className={`border w-full sm:w-[360px] rounded-[4px] h-[47px] px-2 placeholder:text-[14px] ${
                          emailError ? "border-red-500" : ""
                        }`}
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setEmailError(false); // Reset the error when the user types
                        }}
                        placeholder="Enter your email"
                      />
                      {emailError && (
                        <p className="mt-1 text-[14px] font-[400] text-red-500">
                          {emailError}
                        </p>
                      )}
                    </div>
                  </form>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="mt-7 bg-blue-400 text-white font-[700] text-[16px] w-full rounded-[4px] h-[47px] hover:bg-white hover:text-blue-400 hover:border hover:border-blue-400"
                  >
                    Send Reset Link
                  </button>
                  <p className="mt-6 text-center font-[400] text-[14px]">
                    Don’t have an account?
                    <Link
                      className="text-center font-[700] text-[14px] text-blue-400  ml-1"
                      href={"/register"}
                    >
                      Create Account
                    </Link>
                  </p>
                  <div className="mt-4 flex justify-center gap-1">
                    <Image
                      src={"/arrow-left.png"}
                      className=""
                      height={17}
                      width={16}
                      alt="img"
                    />
                    <Link
                      href={"/login"}
                      className="text-center text-[14px] font-[700]"
                    >
                      Go back to Log In
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col max-w-[320px] sm:max-w-[360px] mt-2 items-center">
                  <h1 className="text-[36px] font-[700] text-BlackHomz">
                    Reset Password
                  </h1>
                  <p className="mt-1 text-[16px] font-[400] text-center text-GrayHomz">
                    We have sent a reset password to <br /> {email}
                  </p>
                  <Link
                    href={"/"}
                    className="mt-5 bg-blue-400 text-white font-[700] text-[16px] w-full rounded-[4px] h-[48px] text-center py-[10px] hover:bg-white hover:text-blue-400 hover:border hover:border-blue-400"
                  >
                    Continue
                  </Link>
                  <p className="mt-5 text-center font-[400] text-[14px]">
                    Didn't receive the email?
                    <button
                      className="text-center font-[700] text-[14px] text-blue-400  ml-1"
                      onClick={handleSubmitT}
                    >
                      Click to resend
                    </button>
                  </p>
                  <div className="mt-4 flex justify-center gap-1">
                    <Image
                      src={"/arrow-left.png"}
                      className=""
                      height={17}
                      width={16}
                      alt="img"
                    />
                    <Link
                      href={"/login"}
                      className="text-center text-[14px] font-[700]"
                    >
                      Go back to Log In
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
