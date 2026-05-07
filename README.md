# 冯克军 - 个人主页

一个基于 React + TypeScript + Aceternity UI 构建的现代个人主页网站，深色主题，丰富的动画效果。

## 在线预览

**https://fengkejun.github.io/Feng-Kejun-s-personal-homepage/**

## 技术栈

- **框架**: React 19 + TypeScript
- **构建工具**: Vite
- **样式**: Tailwind CSS v4
- **动画**: Motion (Framer Motion v12)
- **UI 组件**: Aceternity UI（Spotlight、Floating Navbar、Bento Grid、3D Card、Infinite Moving Cards、Background Beams 等）
- **图标**: React Icons + Tabler Icons

## 页面模块

| 模块 | 说明 |
|------|------|
| Hero | Spotlight 聚光灯背景 + 文字生成动画 + 翻转动效 |
| 关于我 | BentoGrid 网格布局展示个人信息 |
| 技术栈 | InfiniteMovingCards 无限滚动卡片 |
| 项目作品集 | 3D 卡片悬浮效果 + 分类筛选 |
| 工作经历 | 时间轴展示职业经历 |
| 联系方式 | BackgroundBeams 背景光线动画 |

## 本地运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 部署到 GitHub Pages
npm run deploy
```

## 自动部署

push 到 main 分支后，GitHub Actions 会自动构建并部署到 GitHub Pages。

## 项目结构

```
src/
├── components/
│   ├── ui/           # Aceternity UI 组件
│   └── sections/     # 页面区块组件
├── data/
│   └── profile.ts    # 个人数据
├── lib/
│   └── utils.ts      # 工具函数
├── App.tsx
├── index.css
└── main.tsx
```

## License

MIT
