"use client";

import { GiftIcon, PackageCheckIcon, Phone, ShieldCheck } from "lucide-react";

export const FeatureIcons = () => {
  const featureData = [
    {
      icon: <Phone />,
      title: "Customer Support",
      description: "Mon - Sat, 10am - 9pm",
    },
    {
      icon: <PackageCheckIcon />,
      title: "Easy Returns",
      description: "Returns extended to 60 days",
    },
    {
      icon: <GiftIcon />,
      title: "Gift Package",
      description: "Free packaging over $100",
    },
    {
      icon: <ShieldCheck />,
      title: "One-year Warranty",
      description: "No questions asked",
    },
  ];

  return (
    <>
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
      <div className="mx-3 my-8 flex space-x-8 hide-scrollbar">
        {featureData?.length > 0 &&
          featureData.map((feature, index) => {
            return (
              <div className="flex space-x-4 items-center" key={index}>
                <div className="border border-neutral-300 rounded-full p-4 w-fit">
                  {feature.icon}
                </div>
                <div>
                  <p className="font-semibold text-nowrap">{feature.title}</p>
                  <p className="text-sm text-nowrap">{feature.description}</p>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
