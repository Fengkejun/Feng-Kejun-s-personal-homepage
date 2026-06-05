import RotatingMotto from "@/components/ui/RotatingMotto";

const ABOUT_MOTTOS = [
  "Stay hungry, stay foolish.",
  "学而不思则罔，思而不学则殆。",
  "Every expert was once a beginner.",
  "The journey of a thousand miles begins with a single step.",
  "用心写好每一行代码。",
  "Growth happens outside your comfort zone.",
  "代码改变世界，学习成就未来。",
];

export default function AboutSection() {
  return (
    <section id="about" className="py-28 px-4 relative">
      <div className="max-w-3xl mx-auto relative z-10">
        <h2
          className="section-heading text-3xl md:text-4xl font-bold text-center tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          关于我
        </h2>
        <RotatingMotto mottos={ABOUT_MOTTOS} interval={5000} className="mb-12" />

        <div className="glass-card rounded-2xl p-8 md:p-10">
          <div className="space-y-5 text-white/80 text-[15px] leading-relaxed">
            <p data-card>
              我是一名充满热情的前端开发工程师，拥有 1+ 年的 Web 开发经验。
              擅长使用 Vue3、React、TypeScript 等现代化技术栈构建高性能、可扩展的应用程序。
            </p>
            <p data-card>
              在前端领域，我熟悉 Vue3 + TypeScript + Pinia 全家桶和 React + Hooks + Zustand 技术栈，
              熟悉 uni-app 跨平台开发、Tauri 桌面端方案、Flutter 和鸿蒙应用开发。
              具备从 0 到 1 构建桌面端、移动端、小程序、大屏可视化等多端应用的能力。
            </p>
            <p data-card>
              我热衷于学习新技术，善于运用 AI 编程工具提升研发效能，注重代码质量与用户体验。
              同时持有 HarmonyOS 应用开发者高级认证、计算机程序设计员三级等证书。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
