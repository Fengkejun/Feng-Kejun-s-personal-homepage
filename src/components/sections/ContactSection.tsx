import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { profile } from "@/data/profile";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaWeixin,
} from "react-icons/fa";

const WECHAT_QR = "/Feng-Kejun-s-personal-homepage/wechat-qr.png";

interface ContactCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
  isImage?: boolean;
}

function ContactCard({ icon, label, value, color, isImage }: ContactCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    if (isOpen) {
      gsap.fromTo(
        contentRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.5, ease: "power3.out" }
      );
      if (valueRef.current) {
        gsap.fromTo(
          valueRef.current,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, delay: 0.15, ease: "power2.out" }
        );
      }
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="video-card p-6 cursor-pointer group"
    >
      <div className="flex flex-col items-center">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
          style={{ background: `${color}15`, border: `1px solid ${color}30` }}
        >
          <span className="text-2xl" style={{ color }}>
            {icon}
          </span>
        </div>
        <h3 className="text-white font-medium text-sm mb-1">{label}</h3>
        <span className="text-white/40 text-xs">
          {isOpen ? "点击收起" : "点击查看详情"}
        </span>
      </div>

      {/* Revealed content */}
      <div
        ref={contentRef}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <div ref={valueRef} className="pt-4 mt-4 border-t border-white/[0.06]">
          {isImage ? (
            <img
              src={value}
              alt="微信二维码"
              className="w-40 h-40 mx-auto rounded-xl object-cover border border-white/10"
            />
          ) : (
            <p className="text-white/80 text-sm text-center break-all">
              {value}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ContactSection() {
  const cards: ContactCardProps[] = [
    {
      icon: <FaEnvelope />,
      label: "邮箱",
      value: profile.contact.email,
      color: "#60a5fa",
    },
    {
      icon: <FaPhone />,
      label: "电话",
      value: profile.contact.phone,
      color: "#4ade80",
    },
    {
      icon: <FaWeixin />,
      label: "微信",
      value: WECHAT_QR,
      color: "#22c55e",
      isImage: true,
    },
    {
      icon: <FaMapMarkerAlt />,
      label: "期望城市",
      value: profile.contact.location,
      color: "#a78bfa",
    },
  ];

  return (
    <section id="contact" className="relative py-20 px-4">
      <div className="max-w-5xl mx-auto relative z-10">
      <h2
          className="section-heading text-5xl md:text-5xl font-bold text-center mb-12 tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
            联系我
         
        </h2>
        <p className="text-white/60 text-center max-w-2xl mx-auto mb-16 text-lg md:text-xl">
          期待与你交流合作，一起创造更优秀的技术产品
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cards.map((card) => (
            <ContactCard key={card.label} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
