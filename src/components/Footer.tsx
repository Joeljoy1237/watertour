import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#4A9453] text-gray-300 py-10">
      <div className="container mx-auto px-6 md:px-12">
        {/* Footer Top Section */}
        <div className="flex flex-wrap justify-between gap-8">
          {/* About Section */}
          <div className="w-full md:w-1/3">
            <h3 className="text-xl font-semibold text-white mb-4">About Us</h3>
            <p className="text-sm leading-7">
              Explore the best water adventures with our premium houseboat
              booking services. Experience luxury and comfort as you glide
              through serene backwaters.
            </p>
          </div>

          {/* Quick Links */}
          <div className="w-full sm:w-1/2 md:w-1/4">
            <h3 className="text-xl font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {["Home", "About", "Services", "Contact"].map((link, index) => (
                <li key={index}>
                  <Link href={`/${link.toLowerCase()}`} passHref>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social Links */}
          <div className="w-full sm:w-1/2 md:w-1/4">
            <h3 className="text-xl font-semibold text-white mb-4">
              Get in Touch
            </h3>
            <p className="text-sm mb-2">
              Email:{" "}
              <Link href="mailto:contact@houseboat.com" passHref>
                contact@houseboat.com
              </Link>
            </p>
            <p className="text-sm mb-4">
              Phone:{" "}
              <Link
                href="tel:+919876543210"
                className="hover:text-white transition-colors"
              >
                +91 98765 43210
              </Link>
            </p>
            <div className="flex space-x-6 mt-4">
              <Link
                href="#"
                className="text-gray-300 hover:text-blue-600 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebookF size={24} />
              </Link>
              <Link
                href="#"
                className="text-gray-300 hover:text-blue-400 transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter size={24} />
              </Link>
              <Link
                href="#"
                className="text-gray-300 hover:text-pink-500 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={24} />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Houseboat Booking. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
