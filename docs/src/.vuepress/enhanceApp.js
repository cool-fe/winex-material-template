/**
 * 扩展 VuePress 应用
 */
import Vue from "vue";
import hljs from "highlight.js";
import "./styles/hljs.css";
// import Tag from "./../../../components/tag/index"; // 手动引入组件
// import VueClipboard from "vue-clipboard2";
export default ({ Vue }) => {
  Vue.use(Tag);
  Vue.prototype.$hljs = hljs;
};
