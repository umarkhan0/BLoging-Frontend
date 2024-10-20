"use client";
import { Provider } from "react-redux"; // Redux Provider
import { store } from "./redux/Store/store" // Correct path for your Redux store
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { Inter } from "next/font/google";
import "node_modules/react-modal-video/css/modal-video.css";
import "../styles/index.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <meta name="monetag" content="71dd813c1ac21dbb26b22c1eed374731"></meta>
      <head />

      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <Providers>
          <Provider store={store}>
            <Header />
            {children}
            <Footer />
            <ScrollToTop />
          </Provider>
        </Providers>
      </body>
    </html>
  );
}

import { Providers } from "./providers";