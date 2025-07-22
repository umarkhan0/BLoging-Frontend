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
      <meta name="google-adsense-account" content="ca-pub-2186921227701573" />
      <script src="https://alwingulla.com/88/tag.min.js" data-zone="109236" async data-cfasync="false"></script>
      <script  data-cfasync="false" src="//thubanoa.com/1?z=8277756"></script>

      {/* <script  data-cfasync="false" src="//thubanoa.com/1?z=8277789"></script> */}
       <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2186921227701573"
          crossOrigin="anonymous"
        />
        
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