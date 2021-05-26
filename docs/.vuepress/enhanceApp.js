/**
 * 扩展 VuePress 应用
 */
import Vue from "vue";
import hljs from "highlight.js";
import VueClipboard from "vue-clipboard2";
import Element from "element-ui";
import WinningWebBlockCommon from "../../local/index";
import "./styles/hljs.css";
import "element-ui/lib/theme-chalk/index.css";
export default ({ Vue }) => {
  Vue.use(WinningWebBlockCommon);
  Vue.use(Element);
  Vue.use(VueClipboard);
  Vue.prototype.$hljs = hljs;
};
