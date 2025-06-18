"use client";

import { Geist_Mono } from "next/font/google";
import Image from "next/image";

// Initialize font at module scope
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const SocialFeed = () => {
  const socialFeedData = [
    {
      image: "/images/social-feed-1.webp",
      tag: "@jenna_fashion",
    },
    {
      image: "/images/social-feed-2.webp",
      tag: "@mcaffrey",
    },
    {
      image: "/images/social-feed-3.webp",
      tag: "@future_d",
    },
    {
      image: "/images/social-feed-4.webp",
      tag: "@vusiliana",
    },
  ];
  return (
    <section>
      <style jsx>{`
        .hide-scrollbar {
          overflow: auto;
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari and Opera */
        }
      `}</style>

      <div className="my-8 lg:mt-16">
        <h3 className="text-lg font-semibold">#reformationfeed</h3>
        <p className="text-sm">send your photos now</p>
      </div>

      <div className="flex flex-nowrap md:flex-wrap overflow-x-auto md:overflow-visible w-full gap-2 hide-scrollbar">
        {socialFeedData?.map((social) => {
          return (
            <div
              key={social.tag}
              className="flex-none w-64 md:w-1/4 md:mb-4 space-y-2"
            >
              <Image
                src={social.image}
                alt="social feed image"
                width={500}
                height={500}
                className="w-full h-64 object-cover"
              />
              <p
                className={`mt-1 text-neutral-800 text-sm border-b border-neutral-400 inline tracking-tight ${geistMono.className}`}
              >
                {social.tag}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
