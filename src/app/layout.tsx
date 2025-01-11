import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
export const metadata: Metadata = {
  title: "Water Tour",
  description:
    "a platform where users can discover and book exciting water-based tourism experiences, such as boat rides, water sports. The app connects travelers with service providers, making it easy to browse options, check availability, and book experiences tailored to their preferences.",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
          <main
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
