"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import LoadingFormII from "@/components/loader/loadingFormII";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [sentEmail, setSentMail] = useState(false);
  const [emailError, setEmailError] = useState("");
  const { signIn, setActive } = useSignIn();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setLoading(true);
    try {
      const result = await signIn?.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });
      if (result.status === "complete") {
        setEmailError("");
      } else {
        setLoading(false);
      }
    } catch (err) {
      console.error("error", err.errors[0].longMessage);
      setEmailError(err.errors[0].longMessage);
    } finally {
      setSentMail(true);
      setLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setEmailError("");
    setLoading(true);
    try {
      const result = await signIn?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: code,
        password: password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/");
        setEmailError("");
      } else {
        setLoading(false);
        setEmailError("Attempt to change password failed");
      }
    } catch (err) {
      console.error("error", err.errors[0].longMessage);
      setEmailError(err.errors[0].longMessage);
      setLoading(false);
    } finally {
      setLoading(false);
      router.push("/");
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
                  <form className="mt-6" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2 items-start">
                      <label className="text-center text-[14px] font-[500] text-BlackHomz">
                        Email*
                      </label>
                      <input
                        className={`border w-full sm:w-[360px] rounded-[4px] h-[47px] px-2 placeholder:text-[14px] ${emailError ? "border-red-500" : ""
                          }`}
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setEmailError(""); // Reset the error when the user types
                        }}
                        placeholder="Enter your email"
                      />
                      {emailError && (
                        <p className="mt-1 text-[14px] font-[400] text-red-500">
                          {emailError}
                        </p>
                      )}
                    </div>
                    <button
                      type="submit"
                      className={`mt-7 bg-blue-400 text-white font-[700] text-[16px] w-full rounded-[4px] h-[47px] hover:bg-white hover:text-blue-400 hover:border hover:border-blue-400 ${loading ? "pointer-events-none flex justify-center items-center" : ""}`}
                    >
                      {loading ? <LoadingFormII /> : "Send Reset Link"}
                    </button>
                  </form>
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
                    We have sent a reset password link to <br /> {email}
                  </p>
                  <form className="mt-6" onSubmit={handleReset}>
                    <div className="flex flex-col gap-2 items-start">
                      <label className="text-center text-[14px] font-[500] text-BlackHomz">
                        Code*
                      </label>
                      <input
                        className="border w-full sm:w-[360px] rounded-[4px] h-[47px] px-2 placeholder:text-[14px]"
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Enter the code"
                      />
                      <label className="text-center text-[14px] font-[500] text-BlackHomz">
                        New Password*
                      </label>
                      <input
                        className="border w-full sm:w-[360px] rounded-[4px] h-[47px] px-2 placeholder:text-[14px]"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your new password"
                      />
                      {emailError && (
                        <p className="mt-1 text-[14px] font-[400] text-red-500">
                          {emailError}
                        </p>
                      )}
                    </div>
                    <button
                      type="submit"
                      className={`mt-7 bg-blue-400 text-white font-[700] text-[16px] w-full rounded-[4px] h-[47px] hover:bg-white hover:text-blue-400 hover:border hover:border-blue-400 ${loading ? "pointer-events-none flex justify-center items-center" : ""}`}
                    >
                      {loading ? <LoadingFormII /> : "Reset Password"}
                    </button>
                  </form>
                  <p className="mt-5 text-center font-[400] text-[14px]">
                    Didn't receive the email?
                    <button
                      className="text-center font-[700] text-[14px] text-blue-400  ml-1"
                      onClick={handleSubmit}
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
