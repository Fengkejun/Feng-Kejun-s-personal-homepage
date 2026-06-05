import { profile } from "@/data/profile";
import SectionVideoBackground from "@/components/ui/SectionVideoBackground";

const HERO_VIDEO = "/Feng-Kejun-s-personal-homepage/hero-bg.mp4";

const NAV_LINKS = [
  { label: "首页", href: "#", active: true },
  { label: "项目", href: "#projects" },
  { label: "关于", href: "#about" },
  { label: "笔记", href: "#notes" },
  { label: "联系", href: "#contact" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* ── Background Video (HLS stream) ── */}
      <SectionVideoBackground src={HERO_VIDEO} className="z-0" autoPlay />

      {/* ── Navigation ── */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <a
          href="#"
          className="text-3xl tracking-tight text-foreground"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {profile.name}
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-sm transition-colors duration-200 ${
                link.active
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#projects"
          className="liquid-glass rounded-full px-6 py-2.5 text-sm text-foreground hover:scale-[1.03] transition-transform duration-200"
        >
          查看项目
        </a>
      </nav>

      {/* ── Hero Content ── */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-32 pb-40 py-[90px]">
        {/* Avatar */}
        <img
          src={profile.avatar}
          alt={profile.name}
          className="w-24 h-24 md:w-28 md:h-28 rounded-full border border-white/10 shadow-2xl mb-8 animate-fade-rise"
        />

        {/* Role badge */}
        <span className="text-muted-foreground text-sm tracking-wider uppercase mb-6 animate-fade-rise">
          {profile.role}
        </span>

        {/* Headline */}
        <h1
          className="text-5xl sm:text-7xl md:text-8xl font-normal leading-[0.95] tracking-[-2.46px] max-w-7xl animate-fade-rise"
          style={{ fontFamily: "var(--font-display)" }}
        >
          用心写好
          <em className="not-italic text-muted-foreground">每一行代码</em>
          <br className="hidden sm:block" />
          用技术
          <em className="not-italic text-muted-foreground">创造价值</em>
        </h1>

        {/* Bio */}
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed animate-fade-rise-delay">
          {profile.bio}
        </p>

        {/* Roles */}
        <div className="flex flex-wrap justify-center gap-3 mt-8 animate-fade-rise-delay">
          {profile.roles.map((role) => (
            <span
              key={role}
              className="liquid-glass rounded-full px-5 py-1.5 text-sm text-muted-foreground"
            >
              {role}
            </span>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#projects"
          className="liquid-glass rounded-full px-14 py-5 text-base text-foreground mt-12 hover:scale-[1.03] cursor-pointer transition-transform duration-200 animate-fade-rise-delay-2"
        >
          查看我的项目
        </a>

        {/* Social links */}
        <div className="flex items-center gap-5 mt-8 animate-fade-rise-delay-2">
          {profile.socials.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground text-sm hover:text-foreground transition-colors duration-200"
            >
              {s.name}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 z-[5] bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
