import { AnimeHome } from "@/components/AnimeHome";
import { Footer } from "@/components/Footer";
import { LocationSection } from "@/components/LocationSection";
import { Navbar } from "@/components/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <AnimeHome />
        <LocationSection />
      </main>
      <Footer />
    </>
  );
}
