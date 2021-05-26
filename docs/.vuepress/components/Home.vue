<template>
  <div class="home-page">
    <a href="/views" class="home-page-link">快速上手 →</a>
  </div>
</template>
<script>
export default {
  name: "Home"
};
</script>
<style lang="scss" scoped>
.home-page {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .home-page-link {
    display: inline-block;
    font-size: 1.2rem;
    color: #fff;
    background-color: #3eaf7c;
    padding: 0.8rem 1.6rem;
    border-radius: 4px;
    transition: background-color 0.1s ease;
    box-sizing: border-box;
    border-bottom: 1px solid #389d70;
  }
}
</style>
