import { FloatingNav } from "@/components/ui/floating-navbar";
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
    <div className="min-h-screen bg-black text-white">
      <FloatingNav navItems={navItems} />
      <HeroSection />
      <AboutSection />
      <TechStackSection />
      <ProjectsSection />
      <ArticlesSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
}

export default App;
