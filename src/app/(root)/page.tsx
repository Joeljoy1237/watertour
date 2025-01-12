"use client";
import GetStarted from "@/components/GetStarted";
import Card from "@/components/Card";
import Search from "@/components/Search";
export default function Home() {
  return (
    <>
      <GetStarted />
      <Search onSearch={() => 1} />
      <Card />
    </>
  );
}
