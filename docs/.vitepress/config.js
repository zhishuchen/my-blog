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
      { text: "博客", link: "/articles/start" },
      { text: "GuideTest", link: "/guide/test" },
      {
        text: "Drop Menu",
        items: [
          {
            items: [
              { text: "Item A1", link: "/item-A1" },
              { text: "Item A2", link: "/item-A2" },
            ],
          },
          {
            items: [
              { text: "Item B1", link: "/item-B1" },
              { text: "Item B2", link: "/item-B2" },
            ],
          },
        ],
      },
      {
        text: '联系我',
        items: [
          { text: 'zhishuchen@qq.com', link: '' },
        ]
      },
    ],
    sidebar: [
      {
        text: ' 开始',
        items: [
          { text: '起步', link: '/pages/start/' },
        ]
      },
        {
          text: "vue教程",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "pina和vuex",
              link: "/articles/pina和vuex",
            },
          ],
        },
      ],
  },
};