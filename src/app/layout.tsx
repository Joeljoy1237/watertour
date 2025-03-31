
import "./globals.css";
import { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Toaster } from 'react-hot-toast';
import  Provider  from "@/components/Provider";

import "@fortawesome/fontawesome-svg-core/styles.css";


export const metadata: Metadata = {
  title: "Water Tour",
  description:
    "A platform where users can discover and book exciting water-based tourism experiences, such as boat rides, and water sports. The app connects travelers with service providers, making it easy to browse options, check availability, and book experiences tailored to their preferences.",
};

// Import Roboto font
const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} font-sans bg-[#F9F9F9]`}>
        <Provider>
          {children}
          <Toaster />
        </Provider>
      </body>
      </html>
   
  );
}
