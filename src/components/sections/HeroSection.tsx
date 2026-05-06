import { Spotlight } from "@/components/ui/spotlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { FlipWords } from "@/components/ui/flip-words";
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
      <div>
        <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />
      </div>

      <div className="absolute inset-0 bg-black [background:radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-black to-black" />

      <div className="relative z-10 flex flex-col items-center justify-center px-4">
        <img
          src={profile.avatar}
          alt={profile.name}
          className="w-28 h-28 md:w-36 md:h-36 rounded-full border-2 border-white/20 mb-8 shadow-lg shadow-blue-500/20"
        />

        <h2 className="text-xs md:text-sm uppercase tracking-[0.2em] text-blue-400 mb-4">
          {profile.role}
        </h2>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center text-white mb-6">
          你好，我是{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            {profile.name}
          </span>
        </h1>

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
