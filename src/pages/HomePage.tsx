import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FloatingNav } from "@/components/ui/floating-navbar";
import SectionVideoBackground from "@/components/ui/SectionVideoBackground";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import TechStackSection from "@/components/sections/TechStackSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import NotesAndBookmarksSection from "@/components/sections/NotesAndBookmarksSection";
import ContactSection from "@/components/sections/ContactSection";
import FooterSection from "@/components/sections/FooterSection";
import { navItems } from "@/data/profile";

const VIDEO_ABOUT_TECH =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4";

const VIDEO_NOTES_CONTACT =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  useEffect(() => {
    const bidir = "play reverse play reverse";

    const sections = [
      "#about",
      "#tech",
      "#projects",
      "#notes",
      "#contact",
    ];

    sections.forEach((selector, idx) => {
      const el = document.querySelector(selector);
      if (!el) return;

      // Alternate direction per section for variety
      const isEven = idx % 2 === 0;
      const headX = isEven ? -50 : 50;
      const cardX = isEven ? 50 : -50;

      // ── Headings: slide from left or right ──
      const heading = el.querySelector("h2");
      if (heading) {
        gsap.fromTo(
          heading,
          { opacity: 0, x: headX, y: 20 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "bottom 60%",
              toggleActions: bidir,
            },
          }
        );
      }

      // ── Descriptions: fade + subtle scale from center ──
      const paragraphs = el.querySelectorAll("p, [data-animate]");
      if (paragraphs.length > 0) {
        gsap.fromTo(
          paragraphs,
          { opacity: 0, scale: 0.95, y: 15 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.06,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              end: "bottom 55%",
              toggleActions: bidir,
            },
          }
        );
      }

      // ── Cards: slide from opposite side ──
      const cards = el.querySelectorAll("[data-card]");
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, x: cardX, y: 30, scale: 0.97 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "bottom 50%",
              toggleActions: bidir,
            },
          }
        );
      }

      // ── Pills / filter buttons: bounce from center ──
      const pills = el.querySelectorAll("[data-pill]");
      if (pills.length > 0) {
        gsap.fromTo(
          pills,
          { opacity: 0, scale: 0.85, y: 10 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              end: "bottom 55%",
              toggleActions: bidir,
            },
          }
        );
      }
    });

    // ── Footer ──
    const footer = document.querySelector("footer");
    if (footer) {
      gsap.fromTo(
        footer,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footer,
            start: "top 98%",
            end: "bottom bottom",
            toggleActions: bidir,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <FloatingNav navItems={navItems} />
      <HeroSection />

      {/* About + TechStack: shared video background */}
      <div className="relative overflow-hidden">
        <SectionVideoBackground src={VIDEO_ABOUT_TECH} poster="/posters/about-tech.jpg" scrollZoom />
        <div className="relative z-10">
          <AboutSection />
          <TechStackSection />
        </div>
      </div>

      <ProjectsSection />

      {/* Notes + Contact: shared video background */}
      <div className="relative overflow-hidden">
        <SectionVideoBackground src={VIDEO_NOTES_CONTACT} poster="/posters/notes-contact.jpg" scrollZoom />
        <div className="relative z-10">
          <NotesAndBookmarksSection />
          <ContactSection />
        </div>
      </div>

      <FooterSection />
    </div>
  );
}
