import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#4A9453] text-gray-300 py-10">
      <div className="container mx-auto px-8 lg:px-20">
        {/* Footer Top Section */}
        <div className="flex flex-wrap justify-between items-start gap-6">
          {/* About Section */}
          <div className="w-full sm:w-1/2 md:w-1/3">
            <h3 className="text-lg font-semibold text-white mb-4">About Us</h3>
            <p className="text-sm leading-6">
              Explore the best water adventures with our premium houseboat
              booking services. Experience luxury and comfort as you glide
              through serene backwaters.
            </p>
          </div>

          {/* Quick Links */}
          <div className="w-full sm:w-1/2 md:w-1/4">
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social Links */}
          <div className="w-full sm:w-1/2 md:w-1/4">
            <h3 className="text-lg font-semibold text-white mb-4">
              Get in Touch
            </h3>
            <p className="text-sm mb-4">Email: contact@houseboat.com</p>
            <p className="text-sm mb-4">Phone: +91 98765 43210</p>
            <div className="flex justify-center lg:justify-normal space-x-12 lg:space-x-4">
              <a
                href="#"
                className="text-gray-300 hover:text-blue-500 transition"
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12a12 12 0 1 0-13.86 11.86V15.5H7.29v-3.5h2.85v-2.63c0-2.8 1.68-4.33 4.24-4.33 1.23 0 2.52.22 2.52.22v2.78H15.7c-1.24 0-1.62.78-1.62 1.58v1.91h2.84l-.45 3.5h-2.39v8.35A12 12 0 0 0 24 12z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-blue-400 transition"
                aria-label="Twitter"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.56c-.89.39-1.83.65-2.83.77a4.92 4.92 0 0 0 2.15-2.71c-.95.56-2 .96-3.12 1.18a4.9 4.9 0 0 0-8.36 4.45c-4.08-.2-7.7-2.16-10.13-5.13a4.87 4.87 0 0 0-.66 2.47 4.9 4.9 0 0 0 2.18 4.08 4.9 4.9 0 0 1-2.22-.61v.06a4.91 4.91 0 0 0 3.93 4.8 4.93 4.93 0 0 1-2.21.08 4.92 4.92 0 0 0 4.59 3.42A9.84 9.84 0 0 1 0 20.54a13.9 13.9 0 0 0 7.55 2.21c9.05 0 14-7.5 14-14v-.64A9.94 9.94 0 0 0 24 4.56z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-pink-500 transition"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.16c3.2 0 3.584.012 4.85.07 1.17.054 1.98.248 2.44.41a4.8 4.8 0 0 1 1.7.994 4.8 4.8 0 0 1 .994 1.7c.162.46.356 1.27.41 2.44.058 1.27.07 1.66.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.248 1.98-.41 2.44a4.8 4.8 0 0 1-.994 1.7 4.8 4.8 0 0 1-1.7.994c-.46.162-1.27.356-2.44.41-1.27.058-1.66.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.98-.248-2.44-.41a4.8 4.8 0 0 1-1.7-.994 4.8 4.8 0 0 1-.994-1.7c-.162-.46-.356-1.27-.41-2.44C2.172 15.584 2.16 15.2 2.16 12s.012-3.584.07-4.85c.054-1.17.248-1.98.41-2.44a4.8 4.8 0 0 1 .994-1.7 4.8 4.8 0 0 1 1.7-.994c.46-.162 1.27-.356 2.44-.41 1.27-.058 1.66-.07 4.85-.07m0-2.16C8.74 0 8.332.012 7.053.07 5.78.128 4.792.334 3.952.68a6.956 6.956 0 0 0-2.504 1.5 6.956 6.956 0 0 0-1.5 2.504C.334 5.208.128 6.2.07 7.053.012 8.332 0 8.74 0 12c0 3.26.012 3.668.07 4.947.058 1.273.264 2.26.61 3.1a6.956 6.956 0 0 0 1.5 2.504 6.956 6.956 0 0 0 2.504 1.5c.84.346 1.828.552 3.1.61 1.273.058 1.68.07 4.947.07 3.26 0 3.668-.012 4.947-.07 1.273-.058 2.26-.264 3.1-.61a6.956 6.956 0 0 0 2.504-1.5 6.956 6.956 0 0 0 1.5-2.504c.346-.84.552-1.828.61-3.1.058-1.273.07-1.68.07-4.947 0-3.26-.012-3.668-.07-4.947-.058-1.273-.264-2.26-.61-3.1a6.956 6.956 0 0 0-1.5-2.504 6.956 6.956 0 0 0-2.504-1.5c-.84-.346-1.828-.552-3.1-.61C15.668.012 15.26 0 12 0z" />
                  <path d="M12 5.838a6.162 6.162 0 1 0 6.162 6.162A6.169 6.169 0 0 0 12 5.838zm0 10.162a4 4 0 1 1 4-4 4.006 4.006 0 0 1-4 4z" />
                  <circle cx="18.406" cy="5.594" r="1.44" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Houseboat Booking. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
