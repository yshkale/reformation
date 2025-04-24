import Image from "next/image";
import { cn } from "../../lib/utils";
import { Star } from "lucide-react";

interface ProductOverviewProps {
  productId: string;
}

export const ProductOverview = ({ productId }: ProductOverviewProps) => {
  const tempData = {
    productId,
    productName: "Rib Aine LS Top",
    productPrice: "$37.20",
    productComparePrice: "46.00",
    reviewStars: 4,
  };

  return (
    <div className="grid grid-cols-2 mt-4">
      <div className="space-y-2">
        <Image
          src={"/images/products/Rib Aine LS Top/thumbnail-1.webp"}
          alt="product thumbnail image"
          width={1000}
          height={1000}
          quality={100}
          className="w-full h-auto"
        />
        <div className="my-3">
          <h3 className="uppercase text-sm">{tempData.productName}</h3>

          <div className="flex items-center space-x-2">
            {tempData.productComparePrice && (
              <p className="uppercase text-sm line-through">
                {tempData.productComparePrice}
              </p>
            )}
            <p
              className={cn(
                "uppercase text-sm font-medium",
                tempData.productComparePrice && "text-rose-700"
              )}
            >
              {tempData.productPrice}
            </p>
          </div>

          {tempData.reviewStars > 0 && (
            <div className="flex flex-row mt-1 space-x-0.5">
              {Array.from({ length: tempData.reviewStars })?.map((_, i) => {
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
      </div>
    </div>
  );
};
