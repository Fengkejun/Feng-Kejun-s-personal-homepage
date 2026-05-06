import { BackgroundBeams } from "@/components/ui/background-beams";
import { profile } from "@/data/profile";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-20 px-4 overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-4">
          联系我
        </h2>
        <p className="text-neutral-400 text-center max-w-2xl mx-auto mb-16 text-sm md:text-base">
          期待与你交流合作，一起创造更优秀的技术产品
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="flex flex-col items-center p-6 rounded-xl border border-neutral-800 bg-black/60 backdrop-blur-sm">
            <FaEnvelope className="text-2xl text-blue-400 mb-3" />
            <h3 className="text-white font-medium mb-1">邮箱</h3>
            <p className="text-neutral-400 text-sm">{profile.contact.email}</p>
          </div>

          <div className="flex flex-col items-center p-6 rounded-xl border border-neutral-800 bg-black/60 backdrop-blur-sm">
            <FaPhone className="text-2xl text-green-400 mb-3" />
            <h3 className="text-white font-medium mb-1">电话</h3>
            <p className="text-neutral-400 text-sm">{profile.contact.phone}</p>
          </div>

          <div className="flex flex-col items-center p-6 rounded-xl border border-neutral-800 bg-black/60 backdrop-blur-sm">
            <FaMapMarkerAlt className="text-2xl text-purple-400 mb-3" />
            <h3 className="text-white font-medium mb-1">期望城市</h3>
            <p className="text-neutral-400 text-sm">{profile.contact.location}</p>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          {profile.socials.map((social) => {
            const iconMap: Record<string, React.ReactNode> = {
              github: <FaGithub className="w-5 h-5" />,
              linkedin: <FaLinkedin className="w-5 h-5" />,
              twitter: <FaTwitter className="w-5 h-5" />,
              email: <FaEnvelope className="w-5 h-5" />,
            };
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-full border border-neutral-700 bg-neutral-900 transition-all duration-300 hover:border-blue-500/50 hover:bg-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20"
                title={social.name}
              >
                <span className="text-neutral-400 group-hover:text-blue-400 transition-colors">
                  {iconMap[social.icon]}
                </span>
              </a>
            );
          })}
        </div>
      </div>

      <BackgroundBeams className="opacity-30" />
    </section>
  );
}
