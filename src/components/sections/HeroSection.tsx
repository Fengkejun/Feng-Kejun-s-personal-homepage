import { AuroraBackground } from "@/components/ui/aurora-background";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { FlipWords } from "@/components/ui/flip-words";
import { SplitText } from "@/components/ui/split-text";
import { GradientText } from "@/components/ui/gradient-text";
import { profile } from "@/data/profile";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

const iconMap: Record<string, React.ReactNode> = {
  github: <FaGithub />,
  linkedin: <FaLinkedin />,
  twitter: <FaTwitter />,
  email: <FaEnvelope />,
};

export default function HeroSection() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <AuroraBackground
        className="absolute inset-0"
        showRadialGradient={true}
      >
        <div />
      </AuroraBackground>

      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex flex-col items-center justify-center px-4">
        <img
          src={profile.avatar}
          alt={profile.name}
          className="w-28 h-28 md:w-36 md:h-36 rounded-full border-2 border-white/20 mb-8 shadow-lg shadow-blue-500/20"
        />

        <h2 className="text-xs md:text-sm uppercase tracking-[0.2em] text-blue-400 mb-4">
          {profile.role}
        </h2>

        <SplitText
          text="你好，我是"
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-center text-white mb-6"
          delay={50}
        />

        <GradientText
          colors={["#3b82f6", "#8b5cf6", "#06b6d4", "#3b82f6"]}
          animationSpeed={6}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
        >
          {profile.name}
        </GradientText>

        <div className="text-xl md:text-2xl text-neutral-300 mb-4 h-10 flex items-center">
          <span>一名 </span>
          <FlipWords
            words={profile.roles}
            className="text-blue-400 font-semibold"
          />
        </div>

        <TextGenerateEffect
          words={profile.tagline}
          className="text-sm md:text-lg text-neutral-400 max-w-xl text-center mb-10"
        />

        <div className="flex gap-4">
          {profile.socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/50 hover:bg-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20"
              title={social.name}
            >
              <span className="text-xl text-neutral-400 group-hover:text-blue-400 transition-colors">
                {iconMap[social.icon]}
              </span>
            </a>
          ))}
        </div>

        <a
          href="#about"
          className="absolute bottom-10 animate-bounce text-neutral-500 hover:text-white transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
