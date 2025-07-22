'use client';

import { useEffect } from 'react';
import AboutSectionTwo from '@/components/About/AboutSectionTwo';
import Blog from '@/components/Blog';
import ScrollUp from '@/components/Common/ScrollUp';
import Contact from '@/components/Contact';
import Hero from '@/components/Hero';
// import Pricing from '@/components/Pricing'; // Uncomment if needed
import Testimonials from '@/components/Testimonials';
import Script from 'next/script';



export default function Home() {
  useEffect(() => {
    try {
      // Render the ad
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        (window as any).adsbygoogle.push({});
      }
    } catch (e) {
      console.error('Adsense error:', e);
    }
  }, []);

  return (
    <>
      {/* Load Google AdSense script */}
      <Script
        id="adsbygoogle-init"
        async
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2186921227701573"
        crossOrigin="anonymous"
      />

      <ScrollUp />

      {/* Google AdSense Ad Slot */}
      <div className="my-4">
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-2186921227701573"
          data-ad-slot="2525925054"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>

      <Hero />
      <AboutSectionTwo />
      <Blog />
      <Testimonials />
      {/* <Pricing /> */}
      <Contact />
    </>
  );
}
