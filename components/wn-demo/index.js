import Demo from "./src/demo";

Demo.install = function(Vue) {
  Vue.component(Demo.name, Demo);
};

export default Demo;
