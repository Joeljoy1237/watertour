"use client";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import Button from "@/components/Button";

export default function RegisterForm() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, session, router]);

  const handleEnterPress = async (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if ("key" in event && event.key === "Enter") {
      handleSignIn(event);
    }
  };

  const handleSignIn = async (
    event:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.KeyboardEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      if (!email && !password) {
        throw new Error(
          JSON.stringify({
            message: "Please fill the required fields",
            desc: "Email and password are required",
          })
        );
      }

      if (!email) {
        throw new Error(
          JSON.stringify({
            message: "Email is required",
          })
        );
      } else if (!password) {
        throw new Error(
          JSON.stringify({
            message: "Password is required",
          })
        );
      }

      const response = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });

      if (response?.ok) {
        const data = response?.error
          ? JSON.parse(response.error)
          : { message: "Login Successfully", desc: "Redirecting to home page" };

       

        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        throw new Error(
          JSON.stringify({
            message: "Login Failed",
            desc: "Please check your email and password",
          })
        );
      }
    } catch (err: any) {
      const error = JSON.parse(err.message || "{}");

      setIsSubmitting(false);
    }
  };

  return (
    <div className="md:w-[40vw] lg:w-[40vw] w-[90vw] flex flex-col items-center justify-center relative h-screen">
      <div className="md:w-[70%] lg:w-[70%] w-[100%] flex flex-col gap-8 absolute">
        <div className="w-full flex items-center justify-center">
          
        </div>
        <div className="w-full flex font-bold items-center justify-center">
          <span className="text-xl">LOGIN</span>
        </div>
        <div className="flex flex-col gap-6" onKeyDown={handleEnterPress}>
          <div className="flex flex-col gap-2">
            <div className="flex gap-4">
              <div className="flex-1">
                <span className="font-light text-sm italic">Email</span>
                <span className="text-primary-700 text-2xl mt-[15px] font-semibold">
                  *
                </span>
                <input
                  type="text"
                  className=" w-full p-3 rounded-md bg-black-300 outline-none border-none"
                  placeholder="johndoe@gmail.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex gap-4 relative">
              <div className="flex-1">
                <span className="font-light text-sm italic">Password</span>
                <span className="text-primary-700 text-2xl mt-[15px] font-semibold">
                  *
                </span>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full p-3 pr-10 rounded-md bg-black-300 outline-none border-none"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <div
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <IoEyeOffOutline size={20} className="text-xl"/>
                    ) : (
                      <IoEyeOutline size={20} className="text-xl"/>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Button
            title={isSubmitting ? "Please wait ..." : "Login"}
            disabled={isSubmitting}
            onClick={handleSignIn}
            className="w-full py-3 font-semibold bg-primary-700 text-white rounded-md outline-none border-none"
          ></Button>
          <div className="flex gap-4 items-end justify-between">
            <div className="flex items-center justify-start">
              <span className="text-xs md:text-sm lg:text-sm">
                New to WaterTour?{" "}
                <Link
                  className="font-semibold text-primary-700"
                  href={"/register"}
                >
                  Signup
                </Link>
              </span>
            </div>
            <div className="flex items-center justify-end">
              <span className="text-xs md:text-sm lg:text-sm">
                <Link
                  className="font-semibold text-primary-700 cursor-pointer"
                  href={"/forgot-password"}
                >
                  Forgot password?
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
      <span className=" absolute text-sm bottom-4">
        For technical assistance.{" "}
        <Link
          href={"/support"}
          className="font-semibold text-primary-700"
        >
          Get Support
        </Link>{" "}
      </span>
    </div>
  );
}
