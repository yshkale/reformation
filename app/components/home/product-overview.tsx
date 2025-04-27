import Image from "next/image";
import { cn } from "../../lib/utils";
import { Star } from "lucide-react";
import Link from "next/link";

interface ProductOverviewProps {
  thumbnail?: string;
  name?: string;
  price?: string;
  comparePrice?: string;
  rating?: number;
  slug?: string;
}

export const ProductOverview = ({
  name,
  price,
  comparePrice,
  rating,
  thumbnail,
  slug,
}: ProductOverviewProps) => {
  return (
    <Link href={`/product/${slug}`} className="space-y-2 cursor-pointer">
      <Image
        src={thumbnail || ""}
        alt="product thumbnail image"
        width={1000}
        height={1000}
        quality={100}
        className="w-full h-auto"
      />
      <div className="my-3">
        <h3 className="uppercase text-sm">{name}</h3>

        <div className="flex items-center space-x-2">
          {comparePrice && (
            <p className="uppercase text-sm line-through">{comparePrice}</p>
          )}
          <p
            className={cn(
              "uppercase text-sm font-medium",
              comparePrice && "text-rose-700"
            )}
          >
            {price}
          </p>
        </div>

        {rating && (
          <div className="flex flex-row mt-1 space-x-0.5">
            {Array.from({ length: rating })?.map((_, i) => {
              return (
                <Star
                  key={i}
                  className="text-amber-500 fill-amber-500"
                  size={14}
                />
              );
            })}
          </div>
        )}
      </div>
    </Link>
  );
};
