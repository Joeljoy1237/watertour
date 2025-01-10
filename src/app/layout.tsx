import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Water Tour",
  description:
    "a platform where users can discover and book exciting water-based tourism experiences, such as boat rides, water sports. The app connects travelers with service providers, making it easy to browse options, check availability, and book experiences tailored to their preferences.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
