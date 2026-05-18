import { FloatingNav } from "@/components/ui/floating-navbar";
import { ClickSpark } from "@/components/ui/click-spark";
import { Particles } from "@/components/ui/particles";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import TechStackSection from "@/components/sections/TechStackSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ArticlesSection from "@/components/sections/ArticlesSection";
import ContactSection from "@/components/sections/ContactSection";
import FooterSection from "@/components/sections/FooterSection";
import { navItems } from "@/data/profile";

function App() {
  return (
    <ClickSpark sparkColor="#3b82f6" sparkSize={8} sparkRadius={30} sparkCount={6}>
      <Particles
        className="fixed inset-0 z-0 pointer-events-none"
        quantity={50}
        color="#3b82f6"
        staticity={50}
        size={0.5}
      />
      <div className="relative z-10 min-h-screen bg-black text-white">
        <FloatingNav navItems={navItems} />
        <HeroSection />
        <AboutSection />
        <TechStackSection />
        <ProjectsSection />
        <ArticlesSection />
        <ContactSection />
        <FooterSection />
      </div>
    </ClickSpark>
  );
}

export default App;
