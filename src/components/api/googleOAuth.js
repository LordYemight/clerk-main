import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSignUp } from '@clerk/nextjs';

const GoogleOAuth = () => {
  const router = useRouter();
  const { signUp } = useSignUp();


  const handleGoogleSignUp = async () => {
    try {
      const redirectUrl = await signUp.create({
        strategy: 'oauth_google',
        redirect_url: `${window.location.origin}/register`,
      });
    //   window.location.href = redirectUrl.url;
    } catch (error) {
      console.error('Error creating redirect URL for Google Sign Up:', error);
    }
  };

  return (
    <button >
      Sign Up with Google
    </button>
  );
};

export default GoogleOAuth;
