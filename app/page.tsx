import { Header } from "./components/home/header";
import { Banner } from "./components/home/banner";
import { Hero } from "./components/home/hero";
import { IntroText } from "./components/home/intro-text";
import { CollectionOverview } from "./components/home/collection-overview";
import { CollectionBanner } from "./components/home/collection-banner";
import { MarketingBanner } from "./components/home/marketing-banner";
import { Testimonial } from "./components/home/testimonial";
import { FeatureIcons } from "./components/home/feature-icons";
import { Footer } from "./components/home/footer";
import { getAllProducts } from "./lib/queries/products";

const products = await getAllProducts();

export default function Home() {
  return (
    <main className="">
      <Banner />
      <Header />
      <Hero />

      <section className="mx-3 lg:mx-8">
        <IntroText
          title="New Arrivals"
          description="Discover the latest ready-to-wear dresses."
        />

        <CollectionOverview products={products} />

        <div className="space-y-8 my-10 lg:mt-10 lg:mb-4 lg:grid lg:grid-cols-2 lg:gap-2">
          <CollectionBanner
            collectionId={"234"}
            title={"BUY NOW OR CRY LATER"}
            description={"These stocks won't last forever."}
            bannerImage="/images/collection-banner-1.webp"
          />
          <CollectionBanner
            collectionId={"234"}
            title={"BE FREE. BE BEAUTIFUL."}
            description={"Express your wild side with these shirts."}
            bannerImage="/images/collection-banner-2.webp"
          />
        </div>
      </section>

      <MarketingBanner
        image={"/images/marketing-banner-1.webp"}
        text={"HAUTE COUTURE READY TO WEAR ICONIC SUMMER READY"}
      />

      <section className="mx-3">
        <Testimonial />
      </section>

      <section className="border-t border-neutral-300">
        <FeatureIcons />
      </section>

      <Footer />
    </main>
  );
}
