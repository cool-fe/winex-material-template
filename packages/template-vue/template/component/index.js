import WnExampleCompoent from "./src/index.vue";

WnExampleCompoent.install = function(Vue) {
  Vue.component(WnExampleCompoent.name, WnExampleCompoent)
}

export default WnExampleCompoent;