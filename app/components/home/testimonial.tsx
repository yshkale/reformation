"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Geist_Mono } from "next/font/google";
import Image from "next/image";

// Initialize font at module scope
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const Testimonial = () => {
  const testimonials = [
    "The dress must follow the body of a woman, not the body following the shape of the dress.",
    "Think big and start small. Ignore the naysayers and don’t ever settle at any level.",
    "Fashion is what you're offered four times a year by designers. And style is what you choose.",
  ];

  const testimonialLogos = [
    "/images/testimonial-logo-1.avif",
    "/images/testimonial-logo-2.avif",
    "/images/testimonial-logo-3.avif",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate testimonials every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  if (!testimonials.length) return null;

  return (
    <section className="my-10 space-y-3 overflow-hidden px-2">
      <p className="uppercase tracking-widest text-center">In the press</p>

      <div className="relative h-fit pt-4 pb-2">
        <AnimatePresence mode="wait">
          <motion.h3
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7 }}
            className={`text-center text-xl lg:text-2xl ${geistMono.className}`}
          >
            &apos;{testimonials[currentIndex]}&apos;
          </motion.h3>
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-3 gap-2 w-full ml-2 place-items-center">
        {testimonialLogos?.length > 0 &&
          testimonialLogos.map((logo, index) => {
            return (
              <Image
                key={index}
                src={logo}
                width={100}
                height={100}
                quality={100}
                alt="testimonial logo"
              />
            );
          })}
      </div>
    </section>
  );
};
