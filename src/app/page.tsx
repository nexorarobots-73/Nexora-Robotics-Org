import { Header } from '@/components/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { VisionSection } from '@/components/sections/VisionSection';
import { MissionSection } from '@/components/sections/MissionSection';
import { GrowthSection } from '@/components/sections/GrowthSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <VisionSection />
        <MissionSection />
        <GrowthSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
