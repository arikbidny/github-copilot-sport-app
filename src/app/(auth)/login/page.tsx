"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AuthForm } from "@/components/auth-form";
import { useAuth } from "@/hooks/use-auth";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const router = useRouter();
  const { loginWithGithub, loginWithGoogle, loading } = useAuth();

  const switchMode = () => {
    setIsLogin(!isLogin);
  };

  const handleGithubLogin = async () => {
    const success = await loginWithGithub();
    if (success) {
      router.push("/");
    }
  };

  const handleGoogleLogin = async () => {
    const success = await loginWithGoogle();
    if (success) {
      router.push("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md p-8 space-y-8 bg-black rounded-lg shadow-lg border border-gray-800">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">
            {isLogin ? "Sign in" : "Create an account"}
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            {isLogin
              ? "Enter your email below to sign in to your account"
              : "Enter your email below to create your account"}
          </p>
        </div>

        <div className="flex flex-col space-y-4">
          <button
            onClick={handleGithubLogin}
            disabled={loading}
            className="flex items-center justify-center w-full px-4 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <FaGithub className="w-5 h-5 mr-2" />
            <span>Continue with GitHub</span>
          </button>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="flex items-center justify-center w-full px-4 py-2 text-gray-800 bg-white rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <FcGoogle className="w-5 h-5 mr-2" />
            <span>Continue with Google</span>
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-gray-400 bg-black">
              OR CONTINUE WITH
            </span>
          </div>
        </div>

        <AuthForm isLogin={isLogin} />

        <div className="text-center mt-6">
          <button
            onClick={switchMode}
            className="text-sm text-blue-400 hover:text-blue-500"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}