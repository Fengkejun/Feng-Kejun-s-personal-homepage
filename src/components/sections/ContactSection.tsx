import { BackgroundBeams } from "@/components/ui/background-beams";
import { GlareHover } from "@/components/ui/glare-hover";
import { GradientText } from "@/components/ui/gradient-text";
import { profile } from "@/data/profile";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-20 px-4 overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
          <GradientText colors={["#3b82f6", "#8b5cf6", "#06b6d4", "#3b82f6"]} animationSpeed={6}>
            联系我
          </GradientText>
        </h2>
        <p className="text-neutral-400 text-center max-w-2xl mx-auto mb-16 text-sm md:text-base">
          期待与你交流合作，一起创造更优秀的技术产品
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <GlareHover
            background="#0a0a0a"
            borderColor="rgba(59, 130, 246, 0.15)"
            glareColor="rgba(59, 130, 246, 0.08)"
            className="p-6"
          >
            <div className="flex flex-col items-center">
              <FaEnvelope className="text-2xl text-blue-400 mb-3" />
              <h3 className="text-white font-medium mb-1">邮箱</h3>
              <p className="text-neutral-400 text-sm">{profile.contact.email}</p>
            </div>
          </GlareHover>

          <GlareHover
            background="#0a0a0a"
            borderColor="rgba(34, 197, 94, 0.15)"
            glareColor="rgba(34, 197, 94, 0.08)"
            className="p-6"
          >
            <div className="flex flex-col items-center">
              <FaPhone className="text-2xl text-green-400 mb-3" />
              <h3 className="text-white font-medium mb-1">电话</h3>
              <p className="text-neutral-400 text-sm">{profile.contact.phone}</p>
            </div>
          </GlareHover>

          <GlareHover
            background="#0a0a0a"
            borderColor="rgba(168, 85, 247, 0.15)"
            glareColor="rgba(168, 85, 247, 0.08)"
            className="p-6"
          >
            <div className="flex flex-col items-center">
              <FaMapMarkerAlt className="text-2xl text-purple-400 mb-3" />
              <h3 className="text-white font-medium mb-1">期望城市</h3>
              <p className="text-neutral-400 text-sm">{profile.contact.location}</p>
            </div>
          </GlareHover>
        </div>
      </div>

      <BackgroundBeams className="opacity-30" />
    </section>
  );
}
