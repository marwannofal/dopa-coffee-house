import { BackToFirstSection } from "@/components/BackToFirstSection";
import { DopaScrollStory } from "@/components/DopaScrollStory";
import { Footer } from "@/components/Footer";
import { LocationSection } from "@/components/LocationSection";
import { Navbar } from "@/components/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <BackToFirstSection />
      <main id="home-story">
        <DopaScrollStory />
        <LocationSection />
      </main>
      <Footer />
    </>
  );
}
