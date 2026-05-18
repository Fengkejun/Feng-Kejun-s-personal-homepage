import { profile } from "@/data/profile";
import { Dock } from "@/components/ui/dock";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

const iconMap: Record<string, React.ReactNode> = {
  github: <FaGithub />,
  linkedin: <FaLinkedin />,
  twitter: <FaTwitter />,
  email: <FaEnvelope />,
};

export default function FooterSection() {
  const dockItems = profile.socials.map((social) => ({
    icon: iconMap[social.icon],
    label: social.name,
    href: social.url,
  }));

  return (
    <footer className="border-t border-neutral-800 py-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
        <Dock items={dockItems} />

        <div className="text-center">
          <p className="text-white font-semibold">{profile.name}</p>
          <p className="text-neutral-500 text-sm">{profile.role}</p>
        </div>

        <div className="text-neutral-500 text-sm text-center">
          &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
        </div>

        <div className="text-neutral-500 text-sm">
          Built with React + TypeScript + Aceternity UI
        </div>
      </div>
    </footer>
  );
}
