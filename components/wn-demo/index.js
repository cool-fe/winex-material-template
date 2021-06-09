import Demo from "./src/demo";

Demo.install = function(Vue) {
  Vue.component(Demo.name, Demo);
};

console.log(78877);

export default Demo;
