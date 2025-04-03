"use client";
import Button from "@/components/Button";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

export default function RegisterForm() {
  const router = useRouter();

  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [designation, setDesignation] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirm password
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEnterPress = async (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if ("key" in event && event.key === "Enter") {
      handleSignUp(event);
    }
  };

  const handleSignUp = async (
    event:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.KeyboardEvent<HTMLDivElement>
  ) => {
    event.preventDefault();

    if (password !== confirmPassword) {
     
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          mobile,
          organisation,
          designation,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed", {
          cause: errorData.desc,
        });
      }
    } catch (error: any) {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-[100vw] md:w-[40vw] lg:w-[40vw] flex flex-col items-center lg:justify-center relative min-h-[100vh] pt-96 md:pt-0 lg:pt-0 py-[40vh] md:py-[10vh] lg:py-0 shadow-xl">
      <div className="md:w-[85%] lg:w-[85%] w-[90vw] flex flex-col gap-8 absolute">
        <div className="w-full flex items-center justify-center">
        </div>
        <div className="w-full flex items-center font-bold uppercase justify-center">
          <span className="text-xl">Sign up</span>
        </div>
        <div className="flex flex-col gap-6" onKeyDown={handleEnterPress}>
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 flex-col md:flex-row lg:flex-row">
              <div className="flex-1">
                <span className="font-light text-sm italic">First Name </span>
                <span className="text-primary-700 text-2xl mt-[15px] font-semibold">
                  *
                </span>
                <input
                  type="text"
                  className="w-full p-3 rounded-md bg-black-300 outline-none border-none"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => {
                    setFirstname(e.target.value);
                  }}
                />
              </div>
              <div className="flex-1">
                <span className="font-light text-sm italic">Last Name </span>
                <span className="text-primary-700 text-2xl mt-[15px] font-semibold">
                  *
                </span>
                <input
                  type="text"
                  className="w-full p-3 rounded-md bg-black-300 outline-none border-none"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => {
                    setLastname(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex gap-4 flex-col md:flex-row lg:flex-row">
              <div className="flex-1">
                <span className="font-light text-sm italic">Email</span>
                <span className="text-primary-700 text-2xl mt-[15px] font-semibold">
                  *
                </span>
                <input
                  type="email"
                  className="w-full p-3 rounded-md bg-black-300 outline-none border-none"
                  placeholder="johndoe@gmail.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="flex-1">
                <span className="font-light text-sm italic">Mobile Number</span>
                <span className="text-primary-700 text-2xl mt-[15px] font-semibold">
                  *
                </span>
                <input
                  type="text"
                  className="w-full p-3 rounded-md bg-black-300 outline-none border-none fontNormal"
                  placeholder="9876543210"
                  value={mobile}
                  onChange={(e) => {
                    setMobile(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex gap-4 flex-col md:flex-row lg:flex-row">
              
              
            </div>
            <div className="flex gap-4 flex-col md:flex-row lg:flex-row">
              <div className="flex-1 relative">
                <span className="font-light text-sm italic">Password</span>
                <span className="text-primary-700 text-2xl mt-[15px] font-semibold">
                  *
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full p-3 rounded-md bg-black-300 outline-none border-none"
                  placeholder="!password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-[45px] right-3 flex items-center cursor-pointer"
                >
                  {showPassword ? (
                    <IoEyeOffOutline className="text-xl"/>
                  ) : (
                    <IoEyeOutline  className="text-xl"/>
                  )}
                </div>
              </div>
              <div className="flex-1 relative">
                <span className="font-light text-sm italic">
                  Confirm Password
                </span>
                <span className="text-primary-700 text-2xl mt-[15px] font-semibold">
                  *
                </span>
                <input
                  type="password"
                  className="w-full p-3 rounded-md bg-black-300 outline-none border-none"
                  placeholder="!password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <Button
            type="submit"
            title="Signup"
            disabled={isSubmitting}
            onClick={handleSignUp}
            className="w-full bg-primary-700 text-white p-3 rounded-md"
          />
        </div>
        <div className="flex flex-col md:flex-row lg:flex-row items-center justify-between mt-4">
          <Link href="/login" className="text-sm text-primary-700">
              <span className="text-black">Already have an account?</span> Login
          </Link>
          <Link href="/support" className="text-sm text-primary-700 underline">
              Get Support
          </Link>
        </div>
      </div>
    </div>
  );
}
