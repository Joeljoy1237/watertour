"use client";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const SessionWrapper = ({
  admin,
  children,
}: {
  admin?: boolean;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const { data: session, status } = useSession() as {
    data: { user: { isAdmin: boolean } } | null;
    status: string;
  };
  const router = useRouter();

  useEffect(() => {
    const handleRedirect = () => {
      if (status === "loading") {
        return; // Do nothing while loading
      }
      if (status == "authenticated" && session && !session.user.isAdmin) {
        router.push("/login");
      }
    };
    handleRedirect();
  }, [status, session, admin, router, pathname]);

  if (status === "loading") {
    return <div>Loading...</div>; // Show loading state
  }

  // If authenticated and no redirects are needed, render children
  return <>{children}</>;
};

export default SessionWrapper;
