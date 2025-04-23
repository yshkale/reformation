"use client";

import { Heart, Plane, Shirt } from "lucide-react";
import { motion } from "framer-motion";

export const Banner = () => {
  const bannerData = [
    {
      icon: Heart,
      text: "Life-time Guarantee",
    },
    {
      icon: Plane,
      text: "Free Delivery and returns from $30",
    },
    {
      icon: Shirt,
      text: "10% off on all clothing",
    },
  ];

  const duplicatedItems = [...bannerData, ...bannerData, ...bannerData];

  return (
    <div className="bg-neutral-950 text-neutral-50 overflow-hidden">
      <motion.div
        className="flex justify-between text-xs py-3 space-x-8 w-full"
        animate={{
          x: [0, -1 * bannerData.length * 200],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "linear",
        }}
      >
        {duplicatedItems?.map((data, index) => {
          const Icon = data.icon;
          return (
            <div
              key={index}
              className="flex space-x-1.5 items-center uppercase min-w-fit"
            >
              <Icon size={14} className="mb-0.5" /> <span>{data.text}</span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};
