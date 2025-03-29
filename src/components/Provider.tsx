"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

const Provider = ({
  children,
  session,
}: Readonly<{
  session?: Session | null | undefined;
  children?: React.ReactNode;
}>) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
