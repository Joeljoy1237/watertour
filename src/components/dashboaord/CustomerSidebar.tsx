import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiCalendar, FiUser, FiX } from "react-icons/fi";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomerSidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
}) => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Profile", href: "/dashboard/profile", icon: FiUser },
    { name: "My Bookings", href: "/dashboard/bookings", icon: FiCalendar },
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 bg-white border-r shadow-md transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-200 lg:static lg:translate-x-0 w-64 z-30`}
    >
      <div className="flex items-center justify-between px-4 h-16 border-b">
        <h2 className="text-xl font-semibold">Menu</h2>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden focus:outline-none"
        >
          <FiX size={24} />
        </button>
      </div>
      <nav className="flex flex-col p-4 space-y-2">
        {menuItems.map((item) => (
          <Link href={item.href} key={item.name}>
            <div
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center px-4 py-2 rounded-md cursor-pointer ${
                pathname === item.href
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              <item.icon className="mr-2" />
              {item.name}
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default CustomerSidebar;
