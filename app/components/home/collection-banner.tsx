import { Button } from "../ui/button";

interface CollectionBannerProps {
  collectionId: string;
  title: string;
  description: string;
  bannerImage: string;
}

export const CollectionBanner = ({
  collectionId,
  title,
  description,
  bannerImage,
}: CollectionBannerProps) => {
  console.log(collectionId);
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${bannerImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="w-full h-[50vh] object-cover bg-center bg-no-repeat"
    >
      <div className="p-8 flex flex-col items-start justify-end h-full text-white pb-12">
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="mb-6">{description}</p>
        <Button className="uppercase bg-white text-neutral-800 hover:bg-neutral-100 cursor-pointer">
          Explore
        </Button>
      </div>
    </div>
  );
};
