import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Metadata } from "next";
import { Roboto } from "next/font/google";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

import "tailwindcss";
import "uploadthing/tw/v4";
config.autoAddCss = false;

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
    <ClerkProvider appearance={{ variables: { colorPrimary: "#5EBC67" } }}>
      <html lang="en">
        <body>
          <main className={`${roboto.variable} antialiased`}>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
