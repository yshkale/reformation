import { Button } from "../ui/button";

export const Hero = () => {
  return (
    <div
      className="w-full h-[60vh] lg:h-[60vh] flex flex-col gap-5 items-center justify-center bg-neutral-950 text-white py-20 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url("/images/hero.jpg")` }}
    >
      <p className="uppercase tracking-widest font-light text-sm">
        Express Yourself
      </p>
      <h3 className="text-3xl lg:text-4xl font-bold tracking-wide uppercase">
        Loved For Style
      </h3>
      <p className="text-sm">
        It&apos;s hard to be nice if you don&apos;t feel comfortable.
      </p>

      <Button className="uppercase bg-transparent text-white border border-white hover:bg-white hover:text-black cursor-pointer text-sm">
        Shop collection
      </Button>
    </div>
  );
};
