export default {
  title: '植树chen的博客',
  description: 'Just playing around.',
  base: '/my-blog/',
 head: [
    [
      'link',
      { rel: 'icon', href: '/image/tree.png' },
      //浏览器的标签栏的网页图标，第一个'/'会遍历public文件夹的文件
    ],
  ],
 themeConfig: {
  siteTitle: "首页",
   logo: '/image/code.png',
  docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    markdown: {
      theme: 'material-palenight',
      lineNumbers: true
    },
    socialLinks: [	
      { icon: "github", link: "https://github.com/zhishuchen" },
     
    ],
    nav: [
      { text: "Java", link: "../articles/Java/java" },
      {
        text: "数据库",
        items: [
          { text: "MySQL", link: "../articles/Database/java" },
          { text: "事务", link: "../articles/Database/java" },
        ],
      },
      {
        text: "Spring",
        items: [
          { text: "Spring5", link: "../articles/Tool/java" },
          { text: "SpringMVC", link: "../articles/Tool/java" },
          { text: "SpringBoot", link: "../articles/Tool/java" },
          { text: "Mybatis", link: "../articles/Tool/java" },
          { text: "MybatisPlus", link: "../articles/Tool/java" },
        ],
      },
      {
        text: "工具",
        items: [
          { text: "Git", link: "../articles/Tool/java" },
          { text: "Maven", link: "../articles/Tool/java" },
        ],
      },
      {
        text: "Linux",
        items: [
          { text: "基本命令", link: "../articles/Linux/java" },
          { text: "运维", link: "../articles/Linux/java" },
        ],
      },
      {
        text: "读书笔记",
        items: [
          { text: "计算机网络", link: "../articles/NoteBook/java" },
          { text: "操作系统", link: "../articles/NoteBook/java" },
          { text: "数据结构", link: "../articles/NoteBook/java" },
          { text: "算法", link: "../articles/NoteBook/java" },
        ],
      },
      {
        text: '联系我',
        items: [
          { text: 'zhishuchen@qq.com', link: '' },
        ]
      },
    ],
    sidebar: {
      "/Start": [
        {
          text: "开始",
          items: [
            { text: "起步", link: "/articles/Start" },
          ],
        },
      ],
      "/Java/Java基础": [
        {
          text: "java",
          items: [
            { text: "起步", link: "/articles/Java/Java基础/java" },
          ],
        },
      ],
      "/Java": [
        {
          text: "java",
          items: [
            { text: "起步", link: "/articles/Java" },
          ],
        },
      ],
      "/Database": [
        {
          text: "java",
          items: [
            { text: "起步", link: "/articles/Database/java" },
          ],
        },
      ],
      "/Linux": [
        {
          text: "java",
          items: [
            { text: "起步", link: "/articles/Linux/java" },
          ],
        },
      ],
      "/NoteBook": [
        {
          text: "开始",
          items: [
            { text: "起步", link: "/articles/NoteBook/java" },
          ],
        },
      ],
      "/Spring": [
        {
          text: "开始",
          items: [
            { text: "起步", link: "/articles/Spring/java" },
          ],
        },
      ],
      "/Tool": [
        {
          text: "开始",
          items: [
            { text: "起步", link: "/articles/Tool/java" },
          ],
        },
      ],
      "/About": [
        {
          text: "开始",
          items: [
            { text: "起步", link: "/articles/About/about" },
          ],
        },
      ],
    },
  },
};