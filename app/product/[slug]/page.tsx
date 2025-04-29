import { Facebook, InstagramIcon, Linkedin, Star, Twitter } from "lucide-react";
import Breadcrumb from "../../components/Breadcrumb";
import { Header } from "../../components/home/header";
import { getProductBySlug } from "../../lib/queries/products";
import { cn } from "../../lib/utils";
import { ImageCarousel } from "../components/ImageCarousel";
import { VariantSelector } from "../components/VariantSelector";
import { QuantitySelector } from "../components/QuantitySelector";
import { Button } from "../../components/ui/button";
import { Footer } from "../../components/home/footer";
import Image from "next/image";
import { SocialFeed } from "../components/SocialFeed";

export default async function Page({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);

  // Build the breadcrumb links dynamically
  const links = [
    { name: "Home", href: "/" },
    { name: product?.name || params.slug, href: `/product/${params.slug}` },
  ];

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
          <VariantSelector variants={product?.variants} />
        </div>

        <div className="mt-10 flex items-center space-x-2">
          <QuantitySelector />
          <Button className="flex-grow uppercase text-sm tracking-widest bg-transparent text-black border py-4.5 border-neutral-900 hover:bg-black hover:text-white cursor-pointer">
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
