<template>
  <div class="win-avatar"></div>
</template>
<script>
import DocMan from "./docMan.vue";
import DocWoman from "./docWoman.vue";
import DocDefault from "./docDefault.vue";
export default {
  name: "WnAvatar",
  props: {
    avatar: {
      type: String,
      default: "default"
    },
    width: {
      type: [String, Number],
      default: "100"
    },
    height: {
      type: [String, Number],
      default: "100"
    }
  },
  components: {
    DocMan,
    DocWoman,
    DocDefault
  }
};
</script>
