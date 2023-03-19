export default {
  title: "植树chen", //标题
  titleTemplate: "植树chen的博客", //标题模板
  description: "zhishuchen-BLOG", //描述
  base: '/my-blog/',
  lastUpdated: true, //开启上次更新时间
  lastUpdatedText: '最近更新时间',
  markdown: {
    theme: "nord",
  },
  head: [
    ["link", { rel: "icon", href: "/tree.ico" }],
    ["meta", { property: "og:title", content: "植树chen" }],
    ["meta", { property: "og:site_name", content: "植树chen" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:description", content: "植树chen" }],
    ["meta", { property: "og:url", content: "https://zhishuchen.github.io/" }],
    [
      "script",
      {
        "data-ad-client": "ca-pub-7650804804345609",
        async: true,
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
      },
    ],
    // 添加百度统计
    [
      "script",
      {},
      `
            var _hmt = _hmt || [];
            (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?bc1fc3ec2768667d3746b56f7d411ddd";
                var s = document.getElementsByTagName("script")[0]; 
                s.parentNode.insertBefore(hm, s);
            })();
            `,
    ],
    // 添加谷歌统计
    [
      "script",
      {
        src: "https://www.googletagmanager.com/gtag/js?id=G-ZLSGRZRXCN",
        async: true,
      },
    ],
    [
      "script",
      {},
      `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-ZLSGRZRXCN');
            `,
    ],
  ],
  // Theme related configurations.[自定义主题]
  themeConfig: {
    logo: "/code.png",
    siteTitle: "植树chen的博客",
    //outlineTitle: '🔴🟠🟡🟢🔵🟣🟤⚫⚪',
    outline:[2,6],
    //导航栏
    nav: [
      {
        text: "C++",
        items: [
          { text: "C++入门", link: "../C++/c++" },
          { text: "QT", link: "../C++/c++" },
          { text: "桌面应用开发", link: "../C++/c++" },
          { text: "C++高级", link: "../C++/c++" },
          { text: "算法", link: "../C++/c++" },
          { text: "踩坑", link: "../C++/c++" },
          {
            items: [
              { text: "踩坑2", link: "../C++/c++" },
            ],
          },
          {
            items: [{ text: "BUG笔记", link: "../C++/c++" }],
          },
          {
            items: [{ text: "项目笔记", link: "../C++/c++" }],
          },
        ],
      },
      {
        text: "微信小程序",
        items: [
          { text: "网站制作入门", link: "../WeChatMiniProgram/note" },
          { text: "HTML", link: "../WeChatMiniProgram/note" },
          { text: "CSS", link: "../WeChatMiniProgram/note" },
          { text: "JavaScript", link: "../WeChatMiniProgram/note" },
          { text: "TypeScript", link: "../WeChatMiniProgram/note" },
          { text: "Vue", link: "../WeChatMiniProgram/note" },
          { text: "Nuxt", link: "../WeChatMiniProgram/note" },
          { text: "Vue全家桶", link: "../WeChatMiniProgram/note" },
          { text: "PWA", link: "../WeChatMiniProgram/note" },
          { text: "浏览器扩展", link: "../WeChatMiniProgram/note" },
        ],
      },
      {
        text: "C#",
        items: [
          { text: "入门", link: "../C#/note" },
          { text: "游戏开发", link: "../C#/note" },
        ],
      },
      {
        text: "数据库",
        items: [
          { text: "SQL", link: "../Database/SQL/SQL" },
          { text: "MySQL", link: "../Database/MySQL/MySQL" },
          { text: "SQLite", link: "../Database/SQLite/SQLite" },
          { text: "indexedDB", link: "../Database/indexedDB/indexedDB" },
        ],
      },
      {
        text: "读书笔记",
        items: [
          { text: "程序员的自我修养", link: "../Note/note" }
        ],
      },
      {
        text: "自媒体",
        items: [
          { text: "PR", link: "../Self-media/note" },
          { text: "PS", link: "../Self-media/note" },
          { text: "鬼畜", link: "../Self-media/note" },
          { text: "AE", link: "../Self-media/note" },
          { text: "AI", link: "../Self-media/note" },
          { text: "脚本", link: "../Self-media/note" },
        ],
      },
      {
        text: "关于",
        items: [
          { text: "关于我", link: "../About/AboutMe" },
        ],
      },
    ],
    //侧边栏
    sidebar: {
      "/C++": [
        {
          text: "探索2022",
          collapsible: true,
          items: [
            { text: "探索2022", link: "/Explore/2022/" },
            { text: "自己写npm包", link: "/Explore/2022/create_npm" },
            {
              text: "H5【拖拽】实现列表排序",
              link: "/Explore/2022/Drag_Drop",
            },
            {
              text: "canvas 获取图片主体颜色",
              link: "/Explore/2022/GetMainColor",
            },
            {
              text: "JS 鼠标抓取元素移动",
              link: "/Explore/2022/FollowMouseMove",
            },
          ],
        },
      ],
      "/WeChatMiniProgram": [
        {
          text: "BUG笔记",
          collapsible: true,
          items: [{ text: "BUG笔记", link: "/BUG/index" }],
        },
        {
          text: "BUG-Vue ",
          collapsible: true,
          items: [
            {
              text: "Nuxt3 路由跳转 页面空白",
              link: "/BUG/VueBUG/Bug01-Nuxt3.md",
            },
          ],
        },
      ],
      "/C#": [
        {
          text: "项目笔记",
          collapsible: true,
          items: [
            { text: "PROJECT", link: "../Project/index" },
            { text: "XGNavigation", link: "../Project/XGNavigation" },
            {
              text: "XGGame-Minesweeper",
              link: "../Project/XGGame-Minesweeper",
            },
          ],
        },
      ],
      "/Note": [
        {
          text: "〖编程〗",
          collapsible: true,
          items: [
            { text: "Git", link: "/Note/Git" },
            { text: "Git 绑定多个远程库", link: "/Note/Git_remote" },
            { text: "Yarn", link: "/Note/Yarn" },
            { text: "npm、nrm、nvm、npx", link: "/Note/npm" },
            { text: "pnpm", link: "/Note/pnpm" },
          ],
        },
        {
          text: "〖编程工具〗",
          collapsible: true,
          items: [
            { text: "VSCode 插件推荐", link: "/Note/VSCode_plug" },
            { text: "VSCode 添加代码片段", link: "/Note/VSCode" },
            { text: "ApiFox", link: "/Note/ApiFox" },
            { text: "Navicat", link: "/Note/Navicat" },
          ],
        },
        {
          text: "〖小笔记〗",
          collapsible: false,
          items: [
            { text: "ESLint", link: "/Note/ESLint" },
            { text: "SVG的使用方式", link: "/Note/SVG" },
            { text: "SSH - 公钥 私钥", link: "/Note/SSH" },
            { text: "Shell查询本地ip", link: "/Note/Shell_ip" },
            {
              text: "Github pages 自定义域名",
              link: "/Note/GithubPagesName",
            },
            { text: "判断系统暗黑模式", link: "/Note/Judge_Dark" },
            { text: "JS判断手机还是PC端 💻", link: "/Note/PCorMoblie" },
            { text: "Iconfont", link: "/Note/Iconfont" },
            { text: "Vue 销毁监听", link: "/Note/Vue_removeEventListener" },
            {
              text: "JS监听节点 ResizeObserver",
              link: "/Note/ResizeObserver",
            },
          ],
        },
      ],
      "/Database": [
        {
          text: "〖零基础〗",
          collapsible: true,
          items: [
            { text: "如何制作网站?", link: "/FrontEnd/FrontEnd/tutorial" },
            { text: "Hello World", link: "/FrontEnd/FrontEnd/HelloWorld" },
            { text: "趁手兵器", link: "/FrontEnd/FrontEnd/Weapons" },
            { text: "介绍前端三剑客", link: "/FrontEnd/FrontEnd/intro" },
            {
              text: "前端学习路径",
              link: "/FrontEnd/FrontEnd/LearningPath",
            },
          ],
        },
      ],
      "/Self-media": [
        {
          text: "HTML",
          collapsible: true,
          items: [
            { text: "HTML 学习路径", link: "/FrontEnd/HTML/HTML" },
            { text: "HTML 零碎笔记", link: "/FrontEnd/HTML/HTML_Note" },
          ],
        },
        {
          text: "HTML5",
          collapsible: true,
          items: [
            {
              text: "HTML5 Web存储",
              link: "/FrontEnd/HTML/HTML5_webstorage",
            },
          ],
        },
      ],
      "/About/": [
        {
          text: "关于",
          collapsible: true,
          items: [
            { text: "关于我", link: "/About/AboutMe" }, // /config/index
          ],
        },
        {
          text: "程序员故事",
          collapsible: true,
          items: [
            {
              text: "小黄鸭调试法",
              link: "/About/Tale/RubberDuckDebugging",
            },
            { text: "HelloWorld", link: "/About/Tale/HelloWorld" },
            { text: "master和main", link: "/About/Tale/masterANDmain" },
            { text: "重复造轮子", link: "/About/Tale/RepeatTheWheel" },
          ],
        },
      ],
    },
    //社交链接
    socialLinks: [
      { icon: "github", link: "https://github.com/zhishuchen" },
    ],
    //页脚
    footer: {
      copyright: "Copyright © 2023-present 植树chen",
    },
    //碳广告
    // carbonAds: {
    //   code: "your-carbon-code",
    //   placement: "your-carbon-placement",
    // },
  },
};
