"use client";
import Image from "next/image";
import Link from "next/link";
import BashedEye from '@/components/icons/BashedEye';
import Eye from '@/components/icons/Eye';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useClerk, useSignIn, useUser } from "@clerk/nextjs";
import LoadingFormII from "@/components/loader/loadingFormII";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const [loginError, setLoginError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const { signIn } = useSignIn();
    const { redirectToSignIn, redirectToSignUp } = useClerk();
    const { user, isSignedIn } = useUser();

    const handleGoogleSignIn = async () => {
        try {
            setLoading(true);
            const response = await signIn.create({
                strategy: 'oauth_google',
                redirect_url: window.location.href
            });
            console.log(response?.firstFactorVerification?.externalVerificationRedirectURL?.href);
            if (response?.firstFactorVerification?.externalVerificationRedirectURL) {
                if (response?.firstFactorVerification?.strategy === 'oauth_google') {
                    // Accessing redirect URL
                    const href = response?.firstFactorVerification?.externalVerificationRedirectURL?.href;
                    console.log('Redirect URL:', href);

                    // Example: Check verification status
                    if (response?.firstFactorVerification?.status === 'unverified') {
                        // Handle unverified status, maybe redirect to externalVerificationRedirectURL.href
                        // Example: Redirect user to Google OAuth URL
                        window.location.href = href;
                    } else if (response?.firstFactorVerification?.status === 'verified') {
                        // Handle verified status, proceed with your application logic
                        // console.log('OAuth Google verification successful');
                    }
                }
            }
        } catch (error) {
            // console.error("Google sign-in error:", error);
            setLoginError("Failed to sign in with Google.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setLoginError("");
        try {
            const result = await signIn.create({
                identifier: username,
                password,
            });
            if (result.status === "complete") {
                router.push("/");
            } else {
                // Handle incomplete or other statuses
                console.log("Login status:", result.status);
                setLoginError("Failed to log in. Please check your credentials.");
            }
        } catch (error) {
            setLoginError("Failed to log in. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };



    const Visible = () => {
        setVisible(!visible);
    };

    return (
        <div>
            <div className="max-w-[1440px]">
                <div className="flex m-auto h-auto">
                    <div className="sm:w-[794px] w-full px-6 flex flex-col justify-around items-center">
                        <div className="h-[85%] px-6 W-[320px] sm:w-full py-4">
                            <div className="flex flex-col gap-3 m-auto max-w-[360px]">
                                <h1 className="text-start text-[36px] font-[700] text-BlackHomz">
                                    Welcome Back
                                </h1>
                                <p className="mt-[-10px] text-[16px] font-[400] text-GrayHomz">
                                    Welcome back, please enter your details.
                                </p>
                                <form
                                    onSubmit={handleSubmit}
                                    className="flex flex-col gap-4">
                                    <div className={`flex flex-col gap-4 ${loading ? "pointer-events-none" : ""}`}>
                                        <div className="flex flex-col gap-2 items-start">
                                            <label className="text-center text-[14px] font-[500] text-BlackHomz">
                                                username or email <span className="text-error">*</span>
                                            </label>
                                            <input
                                                className="border w-full sm:w-[360px] rounded-[4px] h-[47px] px-2 placeholder:text-[14px]"
                                                type="text"
                                                value={username}
                                                onChange={(e) => {
                                                    setUsername(e.target.value);
                                                    setLoginError("");
                                                }}
                                                placeholder="Enter your username or email"
                                                autoComplete="username"
                                            />
                                        </div>
                                        <div className="relative flex flex-col gap-2 items-start">
                                            <label className="text-center text-[14px] font-[500] text-BlackHomz">
                                                Password <span className="text-error">*</span>
                                            </label>
                                            <input
                                                className="border w-full sm:w-[360px] rounded-[4px] h-[47px] px-2 placeholder:text-[14px]"
                                                type={visible ? "text" : "password"}
                                                value={password}
                                                onChange={(e) => {
                                                    setPassword(e.target.value);
                                                    setLoginError("");
                                                }}
                                                placeholder="Enter your password"
                                                autoComplete="current-password"
                                            />
                                            <div className="absolute top-11 right-4" onClick={Visible}>
                                                {visible ? (
                                                    <Eye className="w-4 h-4" />
                                                ) : (
                                                    <BashedEye className="w-4 h-4" />
                                                )}
                                            </div>
                                        </div>
                                        {loginError && (
                                            <span className="mt-[-10px] font[400] text-[13px] text-red-500">
                                                {loginError}
                                            </span>
                                        )}
                                        <Link
                                            href={"/forgetpassword"}
                                            className="font-[700] text-blue-400 text-[13px]"
                                        >
                                            Forgot Password
                                        </Link>
                                    </div>
                                    <button
                                        className={`bg-blue-400 mt-3 text-white font-[700] text-[16px] w-full sm:w-[360px] rounded-[4px] h-[47px] hover:bg-white hover:text-blue-400 hover:border hover:border-blue-400 ${loading ? "pointer-events-none w-full flex justify-center items-center" : ""
                                            }`}
                                        type="Submit"
                                    >
                                        {loading ? <LoadingFormII /> : "Log in"}
                                    </button>
                                </form>
                                <div className="">
                                    <button
                                        onClick={handleGoogleSignIn}
                                        className="border flex justify-center items-center gap-3 font-[700] text-[16px] text-blue-400 w-full sm:w-[360px] border-blue-400 hover:border-BlackHomz  rounded-[8px] h-[47px] hover:text-BlackHomz">
                                        <Image
                                            className=""
                                            src={"/Social icon.png"}
                                            alt="google"
                                            height={"20"}
                                            width={"20"}
                                        />
                                        Log In with Google
                                    </button>
                                </div>
                                <p className="text-center font-[400] text-[14px]">
                                    Don’t have an account?
                                    <Link
                                        className="text-center font-[700] text-[14px] text-blue-400 ml-1"
                                        href={"/register"}
                                    >
                                        Create Account
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
