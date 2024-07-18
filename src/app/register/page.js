"use client";
import BashedEye from "@/components/icons/BashedEye";
import Eye from "@/components/icons/Eye";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import Verify from "./components/verify";
import LoadingFormII from "@/components/loader/loadingFormII";
import GoogleOAuth from "@/components/api/googleOAuth";

const Register = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    firstname: "",
    lastname: "",
    agreedToTerms: false,
  });
  const [pendingVerification, setPendingVerification] = useState(false);

  const [passwordError, setPasswordError] = useState(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const Visible = () => {
    setVisible(!visible);
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPasswordError(null);
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {
      const response = await signUp.create({
        first_name: formData.firstname,
        last_name: formData.lastname,
        email_address: formData.email,
        password: formData.password,
        username: formData.username
      });
      if (response?.unverifiedFields?.[0] === "email_address") {
        // send email
        await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
        setPendingVerification(true);
        if (pendingVerification === true) {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      if (error?.errors[0]?.message) {
        const errorMessage = error?.errors[0]?.message
        setPasswordError(errorMessage)
      }
    }
  };
  const handleGoogleSignUp = async () => {
    try {
      const redirectUrl = await signUp.create({
        strategy: 'oauth_google',
        redirect_url: window.location.href
      });
      console.log(redirectUrl);
    } catch (error) {
      console.error('Error creating redirect URL for Google Sign Up:', error);
    }
  };

  return (
    <div className="max-w-[1440px]">
      {!pendingVerification ? (
        <div className="flex m-auto h-auto">
          <div className="sm:w-[794px] w-full flex flex-col justify-around items-center">
            <div className="h-[85%] px-6 w-[320px] sm:w-full py-4">
              <div className="flex flex-col gap-6 m-auto  max-w-[380px]">
                <h1 className="text-start  text-[36px] font-[700] text-BlackHomz">
                  Create Account
                </h1>
                <p className="mt-[-10px] text-[16px] font-[400] text-GrayHomz">
                  Your All-In-One property portal in just one click!
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className={`flex flex-col gap-4 ${loading ? "pointer-events-none" : ""}`}>
                    <div className="flex flex-col gap-2 items-start">
                      <label className="text-center text-[14px] font-[500] text-BlackHomz">
                        First Name <span className="text-error">*</span>
                      </label>
                      <input
                        className={`border w-full sm:w-[360px] rounded-[4px] h-[47px] px-2 placeholder:text-[14px] `}
                        type="text"
                        value={formData.firstname}
                        onChange={(e) => {
                          setPasswordError("");
                          handleInputChange("firstname", e.target.value);
                        }}
                        placeholder="Enter your first name"
                        autoComplete="firstname"
                      />
                    </div>
                    <div className="flex flex-col gap-2 items-start">
                      <label className="text-center text-[14px] font-[500] text-BlackHomz">
                        Last Name <span className="text-error">*</span>
                      </label>
                      <input
                        className={`border w-full sm:w-[360px] rounded-[4px] h-[47px] px-2 placeholder:text-[14px] `}
                        type="text"
                        value={formData.lastname}
                        onChange={(e) => {
                          setPasswordError("");
                          handleInputChange("lastname", e.target.value);
                        }}
                        placeholder="Enter your last name"
                        autoComplete="lastname"
                      />
                    </div>
                    <div className="flex flex-col gap-2 items-start">
                      <label className="text-center text-[14px] font-[500] text-BlackHomz">
                        User Name <span className="text-error">*</span>
                      </label>
                      <input
                        className={`border w-full sm:w-[360px] rounded-[4px] h-[47px] px-2 placeholder:text-[14px] `}
                        type="text"
                        value={formData.username}
                        onChange={(e) => {
                          setPasswordError("");
                          handleInputChange("username", e.target.value);
                        }}
                        placeholder="Enter your user name"
                        autoComplete="username"
                      />
                    </div>
                    <div className="flex flex-col gap-2 items-start">
                      <label className="text-center text-[14px] font-[500] text-BlackHomz">
                        Email <span className="text-error">*</span>
                      </label>
                      <input
                        className={`border w-full sm:w-[360px] rounded-[4px] h-[47px] px-2 placeholder:text-[14px] `}
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setPasswordError("");
                          handleInputChange("email", e.target.value);
                        }}
                        placeholder="Enter your email"
                        autoComplete="email"
                      />
                    </div>
                    <div className="relative flex flex-col gap-2 items-start">
                      <label className="text-center text-[14px] font-[500] text-BlackHomz">
                        Password <span className="text-error">*</span>
                      </label>
                      <input
                        className={`border w-full sm:w-[360px] rounded-[4px] h-[47px] px-2 placeholder:text-[14px] `}
                        type={visible ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => {
                          setPasswordError("");
                          handleInputChange("password", e.target.value);
                        }}
                        placeholder="Create a password"
                        autoComplete="new-password"
                      />
                      <div className="absolute top-11 right-8" onClick={Visible}>
                        {visible ? <Eye className="w-4 h-4" /> : <BashedEye className="w-4 h-4" />}
                      </div>
                    </div>
                    {passwordError && (
                      <span className="mt-[-10px] font[400] text-[13px] text-red-500">
                        {passwordError}
                      </span>
                    )}
                  </div>
                  <button
                    className={`bg-blue-400 mt-3 text-white font-[700] text-[16px] w-full sm:w-[360px] rounded-[4px] h-[47px] hover:bg-white hover:text-blue-400 hover:border hover:border-blue-400 ${loading ? "pointer-events-none w-full flex justify-center items-center" : ""
                      }`}
                    type="Submit"
                  >
                    {loading ? <LoadingFormII /> : "Get Started"}
                  </button>
                  <div className="">
                    <div onClick={handleGoogleSignUp} className="cursor-pointer border flex justify-center items-center gap-3 font-[700] text-[16px] text-blue-400 w-full sm:w-[360px] border-blue-400 hover:border-BlackHomz  rounded-[8px] h-[47px] hover:text-BlackHomz">
                      <Image
                        className=""
                        src={"/Social icon.png"}
                        alt="google"
                        height={"20"}
                        width={"20"}
                      />
                      Sign Up with Google
                    </div>
                  </div>
                  <p className="text-c enter font-[400] text-[14px]">
                    Already have an account?
                    <Link
                      className="text-center font-[700] text-[14px] text-blue-400  ml-1"
                      href={"/login"}
                    >
                      Login
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Verify email={formData.email} isLoaded={isLoaded} signUp={signUp} />
      )}
    </div>
  );
};

export default Register;
