"use client";
import CTA from "@/features/landingPage/components/CTA";
import Features from "@/features/landingPage/components/Features";
import Footer from "@/features/landingPage/components/Footer";
import Header from "@/features/landingPage/components/Header";
import Hero from "@/features/landingPage/components/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="pt-[80px]">
        <Hero />
        <Features />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
