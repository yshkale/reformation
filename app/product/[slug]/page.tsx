/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Facebook, InstagramIcon, Linkedin, Star, Twitter } from "lucide-react";
import Breadcrumb from "../../components/Breadcrumb";
import { Header } from "../../components/home/header";
import { cn } from "../../lib/utils";
import { ImageCarousel } from "../components/ImageCarousel";
import { VariantSelector } from "../components/VariantSelector";
import { QuantitySelector } from "../components/QuantitySelector";
import { Button } from "../../components/ui/button";
import { Footer } from "../../components/home/footer";
import Image from "next/image";
import { SocialFeed } from "../components/SocialFeed";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addToCart, getProductBySlug } from "../../store/App/app.slice";
import { useParams } from "next/navigation";

interface SelectedVariant {
  variantName: string;
  variantOption: string;
}

export default function Page() {
  const dispatch = useDispatch();
  const params = useParams();

  const slug: any = params.slug;

  const product = useSelector((state: any) => state.app.currentProduct);

  // Build the breadcrumb links dynamically
  const links = [
    { name: "Home", href: "/" },
    { name: product?.name || slug, href: `/product/${slug}` },
  ];

  const [selectedVariants, setSelectedVariants] = useState<SelectedVariant[]>(
    []
  );
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (slug) {
      dispatch(getProductBySlug(slug));
    }
  }, [dispatch, slug]);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: product._id,
        quantity,
        variants: selectedVariants,
        productInfo: {
          name: product.name,
          price: product.price,
          compareWithPrice: product.comparePrice,
          thumbnail: product.thumbnail,
        },
      })
    );
  };

  const handleVariantClick = (variantName: string, variantOption: string) => {
    if (!variantName || !variantOption) return;

    setSelectedVariants((prev) => {
      // Create a copy of the previous state
      const updatedVariants = [...prev];

      // Find if we already have a selection for this variant type
      const existingIndex = updatedVariants.findIndex(
        (v) => v.variantName === variantName
      );

      if (existingIndex !== -1) {
        // Update the existing selection
        updatedVariants[existingIndex] = { variantName, variantOption };
      } else {
        // Add a new selection
        updatedVariants.push({ variantName, variantOption });
      }

      return updatedVariants;
    });
  };

  return (
    <main>
      <Header />

      <div className="mx-3 mb-12">
        <Breadcrumb links={links} className="my-4" />

        <ImageCarousel images={product?.images} />
        <h2 className="font-semibold text-2xl">{product?.name}</h2>
        <div className="flex items-center space-x-2 mt-1">
          {product?.comparePrice && (
            <p className="uppercase line-through text-neutral-600">
              {product?.comparePrice}
            </p>
          )}
          <p
            className={cn(
              "uppercase font-medium",
              product?.comparePrice && "text-rose-700"
            )}
          >
            {product?.price}
          </p>

          <p className="bg-red-700 text-white text-xs px-3 py-1 rounded-full">
            Save 15%
          </p>
        </div>
        <p className="text-xs text-neutral-400 mt-2">
          Shipping calculated at checkout.
        </p>

        {product?.rating && (
          <div className="flex flex-row mt-1 space-x-0.5">
            {Array.from({ length: product.rating })?.map((_, i) => {
              return (
                <Star
                  key={i}
                  className="text-amber-500 fill-amber-500"
                  size={14}
                />
              );
            })}
            <p className="text-xs ml-2">12 Reviews</p>
          </div>
        )}

        <p className="mt-4 text-sm">{product?.description}</p>

        <div className="mt-7 space-y-5">
          <VariantSelector
            variants={product?.variants}
            handleVariantClick={handleVariantClick}
            selectedVariants={selectedVariants}
          />
        </div>

        <div className="mt-10 flex items-center space-x-2">
          <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
          <Button
            className="flex-grow uppercase text-sm tracking-widest bg-transparent text-black border py-4.5 border-neutral-900 hover:bg-black hover:text-white cursor-pointer"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>

        <Button className="w-full mt-3 py-5 cursor-pointer tracking-wider text-sm">
          BUY IT NOW
        </Button>

        <div className="flex space-x-4 mt-4">
          <Facebook className="fill-neutral-200" strokeWidth={1.5} size={18} />
          <Twitter className="fill-neutral-200" strokeWidth={1.5} size={18} />
          <InstagramIcon
            className="fill-neutral-200"
            strokeWidth={1.5}
            size={18}
          />
          <Linkedin className="fill-neutral-200" strokeWidth={1.5} size={18} />
        </div>

        <div className="mt-14">
          <div className="relative h-[30rem]">
            <Image
              src={"/images/marketing-banner-product-1.webp"}
              alt="marketing image"
              width={500}
              height={500}
              quality={100}
              className="object-cover object-center w-full h-full"
            />
          </div>

          <div className="p-6 space-y-2">
            <h3 className="text-3xl font-semibold">Elegance Redefined.</h3>
            <p className="text-sm text-neutral-800">
              Elevate your evening with the timeless elegance of the Luna Silk
              Evening Gown. Crafted from luxurious silk, this gown drapes
              beautifully, accentuating your silhouette with a sophisticated
              charm.
            </p>
          </div>
        </div>

        <SocialFeed />
      </div>

      <Footer />
    </main>
  );
}
