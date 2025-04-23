import { Header } from "./components/home/header";
import { Banner } from "./components/home/banner";
import { Hero } from "./components/home/hero";

export default function Home() {
  return (
    <main className="">
      <Banner />
      <Header />
      <Hero />
    </main>
  );
}
