module.exports = {
  base: "/", //部署站点基础路径
  title: "物料文档", // 网站标题
  description: "介绍物料使用方法",
  head: [],
  themeConfig: {
    logo: "", // 导航栏logo
    nav: [],
    sidebar: {
      "/": [
        {
          title: "业务组件",
          collapsable: false,
          children: [""],
        },
        {
          title: "模板",
          collapsable: false,
          children: ["ExampleComp"],
        },
      ],
    },
  },
};
