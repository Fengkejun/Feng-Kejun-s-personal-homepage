export const profile = {
  name: "冯克军",
  role: "全栈开发工程师 / 计算机硕士",
  avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=FengKejun&backgroundColor=0ea5e9",
  tagline: "用代码构建未来，用技术改变世界",
  roles: ["全栈工程师", "开源爱好者", "技术博主", "区块链研究者"],
  bio: "合肥工业大学计算机技术专业硕士，本科就读于安徽文达信息工程学院软件工程专业。硕士期间 GPA 3.64/4.0，专业排名 4/35。专注全栈开发与区块链技术研究，曾主持省级研究生创新项目《基于区块链的可搜索加密技术研究》，并在 JCR 一区期刊发表论文。技术热情饱满，善于沟通协作，荣获多项学科竞赛与开源社区奖项。",
  socials: [
    { name: "GitHub", url: "https://github.com/Fengkejun", icon: "github" },
    { name: "Email", url: "mailto:fengkejun@example.com", icon: "email" },
    { name: "LinkedIn", url: "https://linkedin.com/in/fengkejun", icon: "linkedin" },
    { name: "Twitter", url: "https://twitter.com/fengkejun", icon: "twitter" },
  ],
  contact: {
    email: "fengkejun@example.com",
    location: "安徽·合肥",
    github: "github.com/Fengkejun",
  },
};

export const techStack = [
  { quote: "React / Vue / TypeScript", name: "前端技术", title: "React 18 + Ant Design Pro / Vue3 + Element Plus" },
  { quote: "Spring Boot / Express.js", name: "后端框架", title: "Java 与 Node.js 双栈后端开发" },
  { quote: "MySQL / Redis / SQL", name: "数据存储", title: "关系型与缓存数据库熟练运用" },
  { quote: "C/C++ / Python / Java", name: "编程语言", title: "扎实的多语言编程基础" },
  { quote: "Docker / Linux / Git", name: "开发运维", title: "容器化部署与版本管理" },
  { quote: "Alibaba Cloud / Tencent Cloud", name: "云服务", title: "云服务器与 CDN 管理经验" },
  { quote: "RocketMQ / Dubbo / Zookeeper", name: "分布式技术", title: "中间件与微服务架构" },
  { quote: "区块链 / 可搜索加密", name: "研究方向", title: "硕士课题：基于区块链的可搜索加密技术" },
];

export const projects = [
  {
    id: 1,
    title: "在线教育平台",
    description: "基于 Vue3 + Spring Boot 的在线教学网站，包含刷题、聊天室等功能模块，实现完整的前后端分离架构。",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&h=400&fit=crop",
    category: "全栈",
    tags: ["Vue3", "Spring Boot", "MySQL", "Redis"],
    link: "#",
  },
  {
    id: 2,
    title: "社区后台管理系统",
    description: "基于 React 18 + Ant Design Pro 的管理后台，包含用户权限、数据可视化、社区论坛管理等核心模块。",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    category: "前端",
    tags: ["React 18", "TypeScript", "Ant Design Pro", "ECharts"],
    link: "#",
  },
  {
    id: 3,
    title: "区块链可搜索加密系统",
    description: "硕士课题项目，基于区块链的可搜索加密技术研究，实现高效、安全、可验证的数据共享方案。",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop",
    category: "研究",
    tags: ["区块链", "加密算法", "智能合约", "Python"],
    link: "#",
  },
  {
    id: 4,
    title: "在线评测系统 (OJ)",
    description: "基于 Vue + Express.js 开发的在线编程评测系统，支持多语言代码提交与自动判题。",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&h=400&fit=crop",
    category: "全栈",
    tags: ["Vue", "Express.js", "Docker", "Linux"],
    link: "#",
  },
  {
    id: 5,
    title: "停车场管理系统",
    description: "基于 Qt C++ 开发的停车场管理软件，负责需求分析、文档撰写和核心模块编码，获省级计算机能力大赛二等奖。",
    image: "https://images.unsplash.com/photo-1573950940624-c8c72786252a?w=600&h=400&fit=crop",
    category: "后端",
    tags: ["Qt", "C++", "SQLite", "GUI"],
    link: "#",
  },
  {
    id: 6,
    title: "阿里巴巴开源之夏项目",
    description: "参与 Nacos 社区治理数据源 Contributor Guide 编写，负责文档整理与贡献，提升开源协作能力。",
    image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=600&h=400&fit=crop",
    category: "开源",
    tags: ["Nacos", "开源协作", "文档写作", "社区"],
    link: "#",
  },
];

export const articles = [
  {
    id: 1,
    title: "基于区块链的可搜索加密技术研究",
    excerpt: "JCR 一区 SCI 期刊论文（第一作者），探讨区块链环境下可搜索加密的高效实现方案。",
    date: "2025-03-15",
    category: "学术论文",
    readTime: "30 min",
    type: "article",
  },
  {
    id: 2,
    title: "基于多区块链的动态可搜索对称加密方案",
    excerpt: "JCR 一区 SCI 期刊论文（第三作者），研究多链架构下的动态可搜索加密技术。",
    date: "2025-01-10",
    category: "学术论文",
    readTime: "25 min",
    type: "article",
  },
  {
    id: 3,
    title: "Java 设计模式在 Spring Boot 中的实践",
    excerpt: "分享常用设计模式在 Spring Boot 项目中的实际应用，提升代码可维护性和扩展性。",
    date: "2024-12-20",
    category: "Java",
    readTime: "15 min",
    type: "article",
  },
  {
    id: 4,
    title: "React 18 + TypeScript 项目实战指南",
    excerpt: "从零搭建 React 18 + TypeScript 项目，涵盖状态管理、路由、UI 组件库集成等核心内容。",
    date: "2024-11-15",
    category: "前端",
    readTime: "20 min",
    type: "video",
  },
  {
    id: 5,
    title: "LeetCode 算法题解系列",
    excerpt: "LeetCode 600+ 题解分享，涵盖数组、链表、树、图、动态规划等常见算法类型。",
    date: "2024-10-05",
    category: "算法",
    readTime: "持续更新",
    type: "article",
  },
  {
    id: 6,
    title: "Docker 容器化部署全流程",
    excerpt: "从开发到生产的 Docker 容器化部署实践，包含 Dockerfile 编写、镜像管理和 CI/CD 集成。",
    date: "2024-09-20",
    category: "DevOps",
    readTime: "18 min",
    type: "video",
  },
];

export const aboutItems = [
  {
    title: "合工大计算机硕士",
    description: "GPA 3.64/4.0，专业排名 4/35。主持省级研究生创新项目，发表 JCR 一区 SCI 论文。",
    className: "md:col-span-2",
  },
  {
    title: "技术热情",
    description: "LeetCode 600+ 题解，参与阿里巴巴开源之夏，持续深耕全栈开发与区块链技术。",
    className: "md:col-span-1",
  },
  {
    title: "团队协作",
    description: "开源社区 Contributor，研究生实践基地负责人，善于沟通和推动团队协作。",
    className: "md:col-span-1",
  },
  {
    title: "荣誉与奖项",
    description: "蓝桥杯 Java/C++ 省一等奖、中国高校计算机能力大赛二等奖、多项省级学科竞赛获奖。",
    className: "md:col-span-2",
  },
];

export const navItems = [
  { name: "关于", link: "#about" },
  { name: "技术栈", link: "#tech" },
  { name: "项目", link: "#projects" },
  { name: "动态", link: "#articles" },
  { name: "联系", link: "#contact" },
];
