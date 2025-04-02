"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { IoMdListBox } from "react-icons/io";
import { usePathname } from "next/navigation";
import { HiUserAdd } from "react-icons/hi";
import { FiLogOut, FiMenu } from "react-icons/fi";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import { FaMoneyBillWave } from "react-icons/fa";
import { useSession } from "next-auth/react";

export default function DashboardSidebar() {
  const {data:session}=useSession()
  const location = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [revenue, setRevenue] = useState<string>("0"); // State to store revenue value

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        event.target instanceof HTMLElement &&
        !event.target.closest(".sidebar") &&
        !event.target.closest(".menu-button")
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // You might want to fetch the actual revenue from an API here
  useEffect(() => {
    if (!session?.user) return;
    // Example: Fetch revenue from an API
      const fetchRevenue = async () => {
        const response = await fetch('/api/owner/revenue', {
          method: 'POST',
          body: JSON.stringify({
            userId: session?.user.id,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        
     
        const data = await response.json();
        console.log(data.revenue);
       setRevenue(data.revenue+"");
     };
    fetchRevenue();
    console.log(session.user);
  }, [session]);

  const menuItems = [
    { title: "Profile", link: "/dashboard/profile", icon: <CgProfile /> },
    {
      title: "Bookings",
      link: "/dashboard/bookings",
      icon: <IoCheckmarkCircleSharp />,
    },
    /* {
      title: "Revenue",
      link: "/dashboard/owner/revenue",
      icon: <FaMoneyBillWave />,
    }, */
  ];

  const ownerMenuItem = [{
    title: "My Houseboats",
    link: "/dashboard/owner/houseboats",
    icon: <BiSolidMessageSquareAdd />,
  },
  {
    title: "Add Houseboat",
    link: "/dashboard/owner/add-houseboat/basic-details",
    icon: <HiUserAdd />,
  },
  {
    title: "Manage Bookings",
    link: "/dashboard/owner/bookings",
    icon: <IoMdListBox />,
  }];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="menu-button md:hidden fixed top-4 left-4 p-3 z-50 bg-gray-200 rounded-md"
        onClick={() => setIsOpen(true)}
      >
        <FiMenu className="text-2xl" />
      </button>

      {/* Sidebar & Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } md:hidden`}
        onClick={() => setIsOpen(false)}
      ></div>

      <aside
        className={`sidebar fixed top-0 left-0 h-screen w-[70vw] md:w-[18vw] bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="mt-[15vh] w-full flex flex-col gap-1">
          {menuItems.map((menuItem, index) => (
            <Link
              key={index}
              onClick={() => setIsOpen(false)}
              href={menuItem.link}
              className={`flex text-gray-700 flex-row items-center gap-2 text-2xl py-2 relative w-full px-[2vw] ${
                location === menuItem.link && "text-primary bg-green-50"
              }`}
            >
              {location === menuItem.link && (
                <div className="h-full w-2 rounded-r-[20px] absolute left-0 top-0 bg-primary"></div>
              )}
              {menuItem.icon}
              <span className="text-[1.1rem]">{menuItem.title}</span>
            </Link>
          ))}


{session && session.user.isOwner && ownerMenuItem.map((menuItem, index) => (
    <Link
        key={index}
        onClick={() => setIsOpen(false)}
        href={menuItem.link}
        className={`flex text-gray-700 flex-row items-center gap-2 text-2xl py-2 relative w-full px-[2vw] ${
            location === menuItem.link ? "text-primary bg-green-50" : ""
        }`}
    >
        {location === menuItem.link && (
            <div className="h-full w-2 rounded-r-[20px] absolute left-0 top-0 bg-primary"></div>
        )}
        {menuItem.icon}
        <span className="text-[1.1rem]">{menuItem.title}</span>
    </Link>
))}
          
          {/* Revenue Display Box */}
            {session?.user?.isOwner && (
            <div className="mt-4 px-[2vw]">
            
              <div className="flex items-center gap-2 text-gray-700 mb-1">
              <FaMoneyBillWave className="text-xl" />
              <span className="text-[1.rem] font-medium">Total Revenue</span>
              </div>
             
            <input
              type="text"
              value={`₹${revenue}`}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 font-medium"
            />
            </div>
            )}
        </div>
      
        {/* Logout Button */}
        <div className="absolute bottom-20 lg:bottom-2 w-full p-[2vw]">
          <button className="bg-red-100 flex items-center justify-center gap-2 py-2 font-semibold text-red-600 rounded-lg outline-none border-none w-full">
            <FiLogOut className="text-xl" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}