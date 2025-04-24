import { Header } from "./components/home/header";
import { Banner } from "./components/home/banner";
import { Hero } from "./components/home/hero";
import { IntroText } from "./components/home/intro-text";
import { CollectionOverview } from "./components/home/collection-overview";
import { CollectionBanner } from "./components/home/collection-banner";

export default function Home() {
  return (
    <main className="">
      <Banner />
      <Header />
      <Hero />
      <section className="mx-3">
        <IntroText
          title="New Arrivals"
          description="Discover the latest ready-to-wear dresses."
        />
        <CollectionOverview collectionId={"274"} />
        <div className="space-y-8 my-10">
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
    </main>
  );
}
