import HeroScene from "@/components/HeroScene";
import OverlayUI from "@/components/OverlayUI";
import { AirportConveyorSection } from "@/components/airport/AirportConveyorSection";
import { FeatureArchiveSection } from "@/components/archive/FeatureArchiveSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative w-full">
      {/* 
        Section 1: Hero Cinematic 3D Scene 
        This section takes full height and acts as the entry point
      */}
      <section className="relative w-full h-screen overflow-hidden">
        <HeroScene />
        <OverlayUI />
      </section>

      {/* 
        Section 2: Airport Security Conveyor Belt 
      */}
      <AirportConveyorSection />

      {/* 
        Section 3: Feature Archive Stacked Folders
      */}
      <FeatureArchiveSection />

      {/* 
        Footer: Scrapbook Ending
      */}
      <Footer />
    </main>
  );
}
