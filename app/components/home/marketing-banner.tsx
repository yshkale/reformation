interface MarketingBannerProps {
  image: string;
  text: string;
}

export const MarketingBanner = ({ image, text }: MarketingBannerProps) => {
  return (
    <div
      className="w-full h-[50vh] flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h2
        className="text-2xl lg:text-3xl font-semibold text-white p-6 text-center leading-14"
        style={{
          WebkitTextStroke: "2px white", // Outline width and color
          color: "transparent", // Transparent interior
        }}
      >
        {text}
      </h2>
    </div>
  );
};
