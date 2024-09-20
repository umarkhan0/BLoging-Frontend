import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Blog from "@/components/Blog";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NEWSPLUSE",
  // other metadata
};

export default function Home() {
  
  return (
    <>

      <ScrollUp />
      <Hero />
      <AboutSectionTwo />
      <Blog />
      <Testimonials />
      {/* <Pricing /> */}
      <Contact />
    </>
  );
}
