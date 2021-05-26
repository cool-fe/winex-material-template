import WnAvatar from "./src/avatar.vue";
WnAvatar.install = function(Vue) {
  Vue.component(WnAvatar.name, WnAvatar);
};

export default WnAvatar;
