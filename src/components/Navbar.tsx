import Link from "next/link";
import { navLinks } from "@/constants";
import Image from "next/image";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-20 relative z-30 py-4 bg-white">
      <Link href="/" className="inline-block">
        <Image
          src="/logo.png"
          alt="Logo"
          width={60}
          height={60}
          className="rounded-full object-cover"
        />
      </Link>

      <ul className="hidden gap-24 items-center lg:flex">
        {navLinks.map((link) => (
          <Link
            key={link.key}
            href={link.href}
            className="text-primary text-lg transition-color  hover:text-[#499954] hover:font-medium hover:underline"
          >
            {link.label}
          </Link>
        ))}
        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton>
              <button className="bg-primary text-white px-5 py-2 rounded-lg shadow-md hover:bg-[#499954] transition duration-200">
                Login
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 border-2 border-[#5EBC67] rounded-full",
                },
              }}
            />
          </SignedIn>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
