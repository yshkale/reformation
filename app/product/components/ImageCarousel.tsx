"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "../../components/ui/carousel";

interface ImageCarouselProps {
  images: string[];
}

export const ImageCarousel = ({ images }: ImageCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const totalSlides = images?.length || 0;

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", handleSelect);

    // Cleanup
    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  return (
    <div className="flex flex-col gap-2 mt-5">
      <Carousel setApi={setApi}>
        <CarouselContent>
          {images?.length > 0 &&
            images.map((image: string, index) => (
              <CarouselItem key={index}>
                <div className="flex justify-center">
                  <Image
                    src={image}
                    alt="product image"
                    width={500}
                    height={500}
                    className="object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>

        <div className="flex justify-center items-center gap-2">
          <CarouselPrevious className="static transform-none border-none bg-none mt-8" />
          <div className="text-sm text-gray-500">
            {totalSlides > 0
              ? `${current + 1}${" "}/${" "}${totalSlides}`
              : "0/0"}
          </div>
          <CarouselNext className="static transform-none border-none bg-none mt-8" />
        </div>
      </Carousel>
    </div>
  );
};
