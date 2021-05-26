<template>
  <container :code="code">
    <wn-demo-tag></wn-demo-tag>
  </container>
</template>
<script>
export default {
  data() {
    return {
      code: `<template>
    <wn-demo-tag></wn-demo-tag>
</template>
<script>
export default {
  data() {
    return {};
  }
};
<\/script>`
    };
  }
};
</script>
