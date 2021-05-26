module.exports = {
  base: "/", //部署站点基础路径
  title: "组件物料文档", // 网站标题
  description: "组件使用方法以及描述",
  head: [
    // 额外需要被注入到当前页面的HTML<head>中的标签
    // ['link', {rel: 'icon', href: '/logo.png'}]
  ],
  themeConfig: {
    logo: "", // 导航栏logo
    nav: [
      // 导航栏链接
      // {text: 'Home', link: '/'}
    ],
    sidebar: {
      "/views/": [
        {
          title: "开始",
          collapsable: false,
          children: ["", "quick-start"]
        },
        {
          title: "组件",
          collapsable: false,
          children: ["demo-title", "demo-tag", "patient-card"]
        }
      ]
    }
  }
};
