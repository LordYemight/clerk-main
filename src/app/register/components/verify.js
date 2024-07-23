import LoadingFormII from "@/components/loader/loadingFormII";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

const Verify = ({ email, isLoaded, signUp }) => {
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [error2, setError2] = useState(null);
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const router = useRouter();

  const handleInputChange = (index, value) => {
    if (/^\d$/.test(value)) {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOTP(newOTP);
      setError(false); 
      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    } else if (value === "" && index >= 0) {
      const newOTP = [...otp];
      newOTP[index] = "";
      setOTP(newOTP);
      setError(false);
      if (index === 0) {
        setError(false);
      } else {
        inputRefs.current[index - 1].focus();
      }
    } else {
      setError(true);
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pastedValue = event.clipboardData.getData("text");
    if (pastedValue.length === 6 && /^\d+$/.test(pastedValue)) {
      setOTP(pastedValue.split(""));
      setError(false);
    }
  };

  const isOTPComplete = otp.every((digit) => /^\d$/.test(digit));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: otp.join(""),
      });
      if (completeSignUp?.verification?.email_address?.status === "verified") {
        console.log(JSON.stringify(completeSignUp, null, 2));
        setLoading(false);
      }

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        setLoading(false);
        router.push("/");
      }
      setLoading(false);
    } catch (error) {
      setError2(error.errors[0]?.longMessage || "An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex m-auto max-w-[1440px] h-[1024px]">
      <div className="w-[794px] flex flex-col justify-around items-center">
        <div className="h-[85%] px-6 w-[320px] sm:w-full py-4">
          {!verificationSuccess ? (
            <div className="flex flex-col gap-6 m-auto max-w-[320px] sm:max-w-[360px]">
              <h1 className="text-start text-[30px] sm:text-[36px] font-[700] text-BlackHomz">
                Check Your Email
              </h1>
              <p className="mt-[-10px] text-[16px] font-[400] text-GrayHomz">
                We sent an OTP to
                <span className="text-BlackHomz font-[500]"> {email}</span>
              </p>
              <form className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 w-360">
                  <div className="flex w-[320px] sm:w-full gap-2 h-[72px]">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        className={`border rounded-md text-[41px] font-[700] text-GrayHomz w-[60px] sm:w-[80px] p-2 text-center ${error ? "border-red-500" : ""}`}
                        ref={(el) => (inputRefs.current[index] = el)}
                        onPaste={handlePaste} // Add onPaste event handler
                      />
                    ))}
                  </div>
                  <p className="mt-[-10px] text-[14px] font-[400] text-black">
                    Enter OTP sent to {email}
                  </p>
                  {error2 && <span className="text-red-500">{error2}</span>}
                  {isOTPComplete ? (
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className={`mt-4 bg-blue-400 text-white font-[700] text-[16px] w-full rounded-[4px] h-[47px] hover:bg-white hover:text-blue-400 hover:border hover:border-blue-400 ${loading ? "pointer-events-none w-full flex justify-center items-center" : ""}`}
                    >
                      {loading ? <LoadingFormII /> : "Verify Email"}
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="mt-4 bg-gray-400 text-gray-200 font-[700] text-[16px] w-full rounded-[4px] h-[47px] opacity-50 "
                    >
                      Verify Email
                    </button>
                  )}
                </div>
                <div className="flex gap-2 items-center">
                  <p className={`${timer ? "pointer-events-none" : ""} text-center font-[400] text-[14px]`}>
                    Didn&apos;t receive the email?
                  </p>
                  {timer ? (
                    <div className="text-gray-400 pointer-events-none text-center font-[700] text-[14px] ml-1">
                      Click to resend
                    </div>
                  ) : (
                    <button className="text-blue-400 text-center font-[700] text-[14px] ml-1">
                      Click to resend
                    </button>
                  )}
                  {timer && (
                    <div className="flex justify-center items-center">
                      <p className="text-[12px] text-blue-400 font-[400]">{seconds} Seconds</p>
                    </div>
                  )}
                </div>
                <div className="flex justify-center gap-1">
                  <Link href="/register" className="text-center text-[14px] font-[700]">
                    Go back to sign Up
                  </Link>
                </div>
              </form>
            </div>
          ) : (
            <div className="flex flex-col m-auto max-w-[360px] mt-2 items-center">
              <h1 className="text-[36px] font-[700] text-BlackHomz">Email Verified</h1>
              <p className="mt-4 text-[16px] font-[400] text-GrayHomz">
                Your email has successfully been verified. Click below to continue with your account setup.
              </p>
              <button className="mt-4 bg-blue-400 text-white font-[700] text-[16px] w-full rounded-[4px] h-[47px] hover:bg-white hover:text-blue-400 hover:border hover:border-blue-400">
                Continue
              </button>
              <div className="mt-4 flex justify-center gap-1">
                <Image src="/arrow-left.png" height={17} width={16} alt="img" />
                <Link href="/login" className="text-center text-[14px] font-[700]">
                  Go back to Log In
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Verify;
